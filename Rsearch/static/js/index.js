// Geolocation APIに対応している
if (navigator.geolocation) {
    alert("この端末では位置情報が取得できます");
// Geolocation APIに対応していない
} else {
    alert("この端末では位置情報が取得できません");
}

// レストラン検索API関連コード


// 位置情報関連コード
function gnaviFreewordSearch(range, offset, hit_per_page){

    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        function(position) {
            
            var req = new XMLHttpRequest();
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // var lat = 180.00;
            // var lon = 180.00;

            // apikeyの指定
            // var keyid = "APIkeyをここに代入";
            var keyid = "a2160037e19a0dc9baceeff0154a698d";

            url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${keyid}&latitude=${lat}&longitude=${lon}&range=${range}&offset_page=${offset}&hit_per_page=${hit_per_page}`
        
            url = encodeURI(url); //参考： https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
            
            req.responseType = 'json'
            
            req.open('GET', url, true)
        
            req.onload = function(){

                //
                var code;
                var length;

                if (typeof req.response.error.code === 'undefined'){
                    alert("該当する店舗がありません");
                }
                else 
                {

                // if (typeof req.response.rest.length !== 'undefined'){
                for (l = 0; l < 16; l++) {
                    document.getElementById("shops").children[l].innerHTML = '';
                };
                for (i = 0; i < req.response.rest.length; i++) {
                    //APIで取得した店の名前とアクセス、画像を表示
                    //それぞれをぐるなびのサイトにリンクしている
                    var imageSource = req.response.rest[i].image_url.shop_image1
                    // 店舗画像がなかった場合
                    if (imageSource == "") {
                        imageSource = "../../static/img/noimage1.png"
                    };
                    var detailUrl = `/detail/${req.response.rest[i].id}/`;

                    document.getElementById("shops").children[i].innerHTML
                        = `<div class="card" style="width: 18rem;">
                <a href ="${detailUrl}">
                <img class="card-img-top" src=${imageSource}>
                <div class="card-body">
                    <h5 class="card-title">${req.response.rest[i].name}</h5>
                    <p class="card-text">${req.response.rest[i].access.walk}</p>
                </div>
                </a>
                </div>`
                }
                
                var total_hit_count = req.response.total_hit_count;
                if (total_hit_count >=1000){var offsetNum = 63}
                else {var offsetNum = Math.ceil(total_hit_count/hit_per_page)};
            document.getElementById("offsetNum").innerHTML = `<li class="page-item${ offset == 1 ? ' disabled' : '' }">
                <a class="page-link" href="#" onclick="gnaviFreewordSearch(range, offset-=1, hit_per_page);"${ offset == 1 ? ' tabindex="-1" aria-disabled="true"' : ''}>Previous</a>
            </li>`;
            // [1, offset-1, offset, offset+1, offsetNum]
            for (i = 1; i<=offsetNum; i++) {
                if (offset == i){
                    document.getElementById("offsetNum").innerHTML += `<li class="page-item active" aria-current="page">
                    <a class="page-link" href="#"> ${i} <span class="sr-only">(current)</span></a>
                </li>`
                } else {
                    if(i==1 || i==offsetNum || i == offset-1 || i == offset+1){
                        document.getElementById("offsetNum").innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="gnaviFreewordSearch(range, offset=${i}, hit_per_page);">${i}</a></li>`
                    } else {
                        document.getElementById("offsetNum").innerHTML += ``
                    }

                    // document.getElementById("offsetNum").innerHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
                };
            }
            // こここここ
        }
        // kokokoko2
        // }else{
        //     alert("該当する店舗がありません");
        // };
            document.getElementById("offsetNum").innerHTML += `<li class="page-item${ offset == offsetNum ? ' disabled' : '' }">
                <a class="page-link" href="#" onclick="gnaviFreewordSearch(range, offset+=1, hit_per_page);"${ offset == offsetNum ? ' tabindex="-1" aria-disabled="true"' : ''}>Next</a>
            </li>`
            };

            req.send();

            return{latitude:position.coords.latitude, longitude:position.coords.longitude}
        },
        // 取得失敗した場合
        function(error) {
            switch(error.code) {
                case 1: //PERMISSION_DENIED
                    alert("位置情報の利用が許可されていません");
                    break;
                case 2: //POSITION_UNAVAILABLE
                    alert("現在位置が取得できませんでした");
                    break;
                case 3: //TIMEOUT
                    alert("タイムアウトになりました");
                    break;
                default:
                    alert("その他のエラー(エラーコード:"+error.code+")");
                    break;
        }
        }
    );

}