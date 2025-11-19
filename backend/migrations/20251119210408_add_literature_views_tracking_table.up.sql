-- Add up migration script here
CREATE TABLE literature_item_views (
    id BIGSERIAL PRIMARY KEY,
    literature_item_id BIGINT NOT NULL REFERENCES literature_items(id),
    user_id BIGINT NOT NULL REFERENCES users(id),
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX ON literature_item_views (user_id, literature_item_id);