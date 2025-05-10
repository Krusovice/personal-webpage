from airflow.decorators import dag, task
from airflow.providers.postgres.hooks.postgres import PostgresHook
import yfinance as yf
from datetime import datetime
import pandas as pd

"""
This dag fetches stockprices from yfinance and stores them in the postgres database.
"""

@dag(
    schedule="@daily",
    start_date=datetime(2025, 1, 1),
    catchup=False,
    tags=["stock_market"],
)

def fetch_and_store_stock_data():

    @task()
    def fetch_data():
        ticker = "^OMXC25"
        stock = yf.Ticker(ticker)
        hist = stock.history(start="2025-05-01", end=datetime.today())
        if hist.empty:
            return [] 

        hist.reset_index(inplace=True)
        hist = hist[['Date', 'Close']]
        hist['symbol'] = ticker
        hist['Date'] = hist['Date'].dt.strftime('%Y-%m-%d')

        # lowering all first letters in columns.
        hist.columns = hist.columns.str.lower()

        # Reanming the column close to close_price to make it more descriptive
        hist.rename(columns={'close': 'close_price'}, inplace=True)
        
        return hist.to_dict(orient="records")

    @task()
    def store_data(stock_data):
        if not stock_data:
            return "No stockdata returned"

        hook = PostgresHook(postgres_conn_id="webpage_postgres_db")
        conn = hook.get_conn()
        cursor = conn.cursor()

        insert_query = """
        insert into stocks.stock_prices (date, symbol, close_price)
        VALUES (%s, %s, %s)
        ON CONFLICT (date,symbol) DO UPDATE
        SET close_price = EXCLUDED.close_price
        """

        for row in stock_data:
            cursor.execute(insert_query, (row['date'], row['symbol'], row['close_price']))

        
        conn.commit()
        cursor.close()
        conn.close()

    stock_data = fetch_data()
    store_data(stock_data)

fetch_and_store_stock_data()