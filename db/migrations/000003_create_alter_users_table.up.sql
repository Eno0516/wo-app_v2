-- 既存テーブル削除
DROP TABLE IF EXISTS users;

-- 新しいテーブル作成
CREATE TABLE users (
  user_id TEXT NOT NULL,
  group_id TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  user_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4() UNIQUE,
  group_uuid UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),     -- 作成日時
  updated_at TIMESTAMP DEFAULT NOW()      -- 更新日時
);

-- 初期ユーザー追加
INSERT INTO users (user_id, group_id, password, group_uuid)
VALUES (
  'admin',
  'agriculture-wo',
  crypt('password',gen_salt('bf')), -- 実際はハッシュ化された値を入れる
  gen_random_uuid()
);