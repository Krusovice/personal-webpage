CREATE TABLE stockmarket.stock_prices (
    id SERIAL PRIMARY KEY,
    ticker TEXT NOT NULL,
    date DATE NOT NULL,
    closing_price NUMERIC NOT NULL,
    UNIQUE (ticker, date)
);

CREATE TABLE stockmarket.stock_metadata (
    ticker TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    currency TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);