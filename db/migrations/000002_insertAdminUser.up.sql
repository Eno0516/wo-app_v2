INSERT INTO users (username, password_hash)
VALUES ('admin', crypt('password', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;
