CREATE TABLE stocks.stock_prices (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    date DATE NOT NULL,
    close_price NUMERIC NOT NULL,
    UNIQUE (symbol, date)
);

CREATE TABLE stocks.stock_metadata (
    symbol TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT,
    currency TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);