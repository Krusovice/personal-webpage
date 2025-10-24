CREATE TABLE literature.items (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    keywords TEXT NOT NULL,
    timestamp_upload TIMESTAMPTZ DEFAULT NOW(),
    timestamp_modified TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (title, author)
);
