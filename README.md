# プロジェクト概要
## 目的
* 小規模兼業農家に向けた作物管理Webアプリの作成
    * 現状は自分の立ち上げた学生団体の作業を効率化することをゴールとしています。[Instagram]()
## デプロイ先
* にアクセスすると、アプリを使用できます。
### フロントエンド
### バックエンド
### DB
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
* Docker使用可能環境
## 1.リポジトリのクローン
  ```bash
  git clone https://github.com/Eno0516/wo-app_v2.git
  ```
## 2.開発コンテナでvs codeを開き直す（推奨）
* docker-composeと各dockerファイルにより環境が構築されます。
* 主にdockerによって行われるのは以下の通りです。
### フロントエンドサーバー起動
### バックエンドサーバー起動
* go airを使用しているため常時起動
* logはdockerに吐かれている
# 実際の画面での動作
## ログイン画面
* 開発環境では{グループID: agriculture-wo,ユーザー名: admin, パスワード: password}でログインできます。
## メンバー画面
* 現在以下の機能が実装されています。
    * 新規畑登録
      * 「畑を追加」ボタンから項目を入力して任意名の畑を登録できます。
      * 登録された畑名は一覧表示され、各畑名をクリックすることで各畑の**作物管理画面**に遷移します。
## 作物管理画面
* 登録された内容に基づき、畑の情報を管理する画面です。
* 現在以下の機能が実装されています。
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
# CI
### GitHub Actions を用いています。
## フロントエンド
* 実行トリガー：mainブランチへのpush時
* このジョブでは Node.js を使ったフロントエンドを対象に以下の処理を行います。
   * 1.ソースコードのチェックアウト
      - actions/checkout@v4 を使用してリポジトリのコードを取得します。
   * 2.Node.js のセットアップ
      - actions/setup-node@v4 を利用し、Node.js バージョン 20 をインストールします。
   * 3.依存関係のインストール
      - npm ci を実行し、./frontend ディレクトリ配下の依存関係をクリーンインストールします。
   * 4.ビルド
      - npm run build を実行し、フロントエンドのプロジェクトをビルドします。

## Firebase Preview
* Pull Request作成時Firebase Preview環境に自動デプロイ
* PRごとに付与されるURLを確認すると、変更後のUIをチェックできる
   * 本番環境と合計した容量で課金されるため、現状は動かしていない

## バックエンド
* 実行トリガー：mainブランチへのpush時
* このジョブではGo言語のバックエンドを対象に以下の処理を実行します。
   * 1.ソースコードのチェックアウト
      - actions/checkout@v4 を使用してリポジトリのコードを取得します。
   * 2.Go のセットアップ
      - actions/setup-go@v5 を利用し、Go バージョン 1.22 をインストールします。
   * 3.ビルド
      - go build ./... を実行し、./backend ディレクトリ配下のコードをビルドします。
   * 4.テスト
      - go test -race ./... を実行し、レースコンディション検出付きでユニットテストを実行します。
   * 5.Lint
      - golangci/golangci-lint-action@v6 を利用し、golangci-lint による静的解析を行います。
# CD
### GitHub Actions を用いています。
## フロントエンド
* 実行トリガー：手動（Actionsタブ内のRun Actionボタン押下）
   * **注：手動実行としているため、デプロイ前には直前のCIが通っていることを確認のうえ、実行してください。**
* このジョブでは以下の流れでフロントエンドをビルドし、Firabase Hosting にデプロイします。
   * 1.ソースコードのチェックアウト
      - actions/checkout@v4 を使用してリポジトリのコードを取得します。
   * 2.Node.js のセットアップ
      - actions/setup-node@v4 を利用し、Node.js バージョン 20 をインストールします。
   * 3.依存関係のインストール
      - npm ci を実行し、./frontend ディレクトリ配下の依存関係をクリーンインストールします。
   * 4.ビルド
      - npm run build を実行し、フロントエンドをビルドします。
   * 5.Firebase Hosting へのデプロイ
      - FirebaseExtended/action-hosting-deploy@v0 を利用して Firebase Hosting にデプロイします。
  * 使用するシークレット:
      - GITHUB_TOKEN（リポジトリ連携用）
      - FIREBASE_SERVICE_ACCOUNT_AGRICULTURE_WO（Firebase サービスアカウント）
   * デプロイ先:
      - プロジェクト ID: agriculture-wo
      - チャネル ID: live
      - エントリーポイント: ./frontend

## バックエンド
* 実行トリガー：手動（Actionsタブ内のRun Actionボタン押下）
   * **注：手動実行としているため、デプロイ前には直前のCIが通っていることを確認のうえ、実行してください。**
* このCDではバックエンドのデプロイとDBのデプロイの二つを実行します。
#### ジョブ１：backend-deploy
* バックエンドを Docker イメージ化し、GitHub Container Registry (GHCR) に push した後、Render にデプロイをトリガーします。
  - ソースコードのチェックアウト
- actions/checkout@v4 を使用してリポジトリのコードを取得。
- GHCR ログイン
- docker/login-action@v3 を利用し、ghcr.io にログイン。
- 認証には github.actor と secrets.GITHUB_TOKEN を使用。
- Docker イメージのビルド & Push
- backend/Dockerfile.prod を利用して Docker イメージをビルド。
- イメージ名は ghcr.io/<owner>/<repo>-app:latest。
- GHCR に push。
- Render デプロイのトリガー
- curl を使って Render API に POST リクエストを送り、デプロイを開始。
- 認証には secrets.RENDER_API_KEY を使用。
- 対象サービスは secrets.RENDER_SERVICE_ID。

#### ジョブ２：backend-deploy
Render デプロイ完了後に Neon データベースのマイグレーションを実行します。
- ソースコードのチェックアウト
- actions/checkout@v4 を使用。
- migrate ツールのインストール
- golang-migrate のバイナリをダウンロードして /usr/local/bin に展開。
- マイグレーション実行
- 環境変数 DATABASE_URL（Secrets から取得）を利用。
- migrate -path ./db/migrations -database "$DATABASE_URL" up を実行し、最新のマイグレーションを適用。

