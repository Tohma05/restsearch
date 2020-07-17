# アプリ名：Restsearch

## 作者
村上透真

## コンセプト
現在地から近いお店がボタン一つで簡単に見つかる

## こだわったポイント
画面幅に合わせて最適な配置、デザインになるようにしました。<br>
また、詳細画面に遷移する際、JavaScriptではなくPythonでAPIを扱うようにし、処理を軽くしました。<br>
Geolocationを使うことにより、GPSの搭載されていない端末でも検索できるようにしました。

## 該当プロジェクトのリポジトリURL
https://github.com/Tohma05/restsearch.git

## 開発環境
### 開発環境
Visual Studio Code 1.43.0

### 開発言語
Python 3.6.9

## 動作対象端末
ブラウザ

## アプリケーション機能

## 注意点
APIキーを伏せているため、お手数ですが以下の変数keyidに各自ご用意いただいたAPIキーを代入してください。
- `\Rsearch\views.py`の13行目の`apikey`
- `\Rsearch\static\js\index.js`の22行目の`apikey`

### 機能一覧
- レストラン検索：ぐるなびAPIを使用して、現在地周辺の飲食店を検索する。
- レストラン情報取得：ぐるなびAPIを使用して、飲食店の詳細情報を取得する。 

### 画面一覧
- 検索&一覧画面 : 半径を指定してレストランを検索し、その一覧を表示
- 詳細画面 : 選択したレストランの詳細情報を表示

### 使用しているAPI,ライブラリなど
- Django 3.0.3
- ぐるなびレストラン検索API
- Geolocation API

## 使い方
```
python3 manage.py collectstatic
python3 manage.py runserver
```

## 今後
- `index.js`の`navigator.geolocation.getCurrentPosition`の関数が複数の処理を含んでおり読みにくいコードになっているため、今後そこをそれぞれ、リクエスト処理、各アイテム描画処理、カウント処理、ページング処理などの関数にわけていこうと思っています。
- 検索結果が0件の時の挙動を改善し、よりユーザー目線に立った開発をしていきます。
