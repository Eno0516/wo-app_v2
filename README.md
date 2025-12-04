# プロジェクト概要
## 目的
* 小規模兼業農家に向けた作物管理Webアプリの作成
    * 現状は自分の立ち上げた学生団体の作業を効率化することをゴールとしています。[Instagram]()
# ディレクトリ構成
* **モノレポ構成**
```text
.
├── .devcontainer/
├── .github/
│   └── workflows/
├── api-specs/
├── backend/
│   ├── src/
│   ├── tests/
│   └── package.json
├── db/
│   └── migrations/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── scripts/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yaml
├── openapitools.json
├── package-lock.json
├── package.json
├── README.md

```
## 詳細
### backend
### frontend
### db
#### migrationファイルを格納するディレクトリ
### api-specs
#### apiの各パス・スキーマを定義するディレクトリ
* 一つのopenapi.yamlファイルに各々のパスを書き込むことでファイル内容が肥大化することを回避するため、各apiごとにファイルを作成する方針です。
### scripts
#### 以下のスクリプトを格納するディレクトリ
* 
## 技術スタック
### フロントエンド
* Vite React
### バックエンド
* Go
### DB
* Postgres
# 開発環境セットアップ
## 前提
* vs code devcontainerを使用
  ```bash
  git clone https://github.com/Eno0516/wo-app_v2.git
  ```
* Docker使用可能環境
## 1.リポジトリのクローン
## 2.開発コンテナでvs codeを開き直す
### フロントエンドサーバー起動
### バックエンドサーバー起動
* go airを使用しているため常時起動
* logはdockerに吐かれている
# 共通開発手順
## API作成・更新
* **openaAPIからの自動生成*を用いています。APIを作成・更新する場合は、以下の手順でapiパスをyamlファイルに書き込み、自動生成を行ってください。
## DB作成・更新
* DBを作成・更新する場合は、以下の手順でmigration fileを作成し、dev containerを開き直してください。
## DBデータの取り扱い
* 型安全な**sqlc**を用いています。DBのデータを取り扱う際には以下の手順でGo用の関数を自動生成し、それを使用してください。
# ツール
### API生成
* API仕様書からの自動生成
* **フロントエンド**
* **バックエンド**
### sqlc生成
### migrationファイル生成
# スクリプト
# CI/CD 概要
## フロントエンド
*
## バックエンド
*
## DB
*
    * マイグレーション実行はバックエンドのデプロイと同時に行っています。
