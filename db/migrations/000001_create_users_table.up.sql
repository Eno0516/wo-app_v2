CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,                  -- 内部用の連番ID
    uuid UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE, -- 内部用の一意なUUID
    username VARCHAR(50) UNIQUE NOT NULL,   -- ユーザー名（ユニーク制約）
    password_hash VARCHAR(255) NOT NULL,    -- ハッシュ化したパスワード
    created_at TIMESTAMP DEFAULT NOW(),     -- 作成日時
    updated_at TIMESTAMP DEFAULT NOW()      -- 更新日時
);