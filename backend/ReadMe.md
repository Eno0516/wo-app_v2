# backendの説明
  
## リポジトリー構成
### internal ディレクトリ
* **initialize**
  * DB,APIなどの初期化処理
* **controller**
  * フロントエンドからのAPIリクエストを受ける部分
     * openapi-code-genで自動生成された関数名と同じものを定義し、interfaceを上書きする。
     * この関数内で行うのは以下の3つ
        * 受け取ったrequest bodyをJSONパースする
        * serviceに定義した単一の関数にそのbodyを渡し、responseを返却させる
        * フロントエンドにresponseを返す
* **service**
  * ロジックの実装部分
  * contoroller層から呼ばれる関数については、
    * 引数にrequest body
    * 戻り値にresponse body
  を実装
* **repositry**
  * 外部サービスとの接続部分
    * DBなど
  
### generated ディレクトリ
* **api** ※編集不可
  * openapi-code-genによって生成されたcontroller層で上書きするための関数が用意
* **sql** ※編集不可
  * go-sqlcによって自動生成されたDB通信のための関数が用意