-- Waitlist signups (homepage / marketing). Ignore duplicates; reject temp emails at app layer.
CREATE TABLE IF NOT EXISTS waitlist (
    email TEXT PRIMARY KEY,
    use_case TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL DEFAULT 'homepage',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
