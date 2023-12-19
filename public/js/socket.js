/*
  Socket処理用のプログラム
  2019/05/29
*/

window.onload = function () {
    const sock = WebScoket('ws://127.0.0.1:7777');

    sock.addEventListner('open', function(e)){
        try{
            console.log('socket connects to %s ',sock.log);
        }(e){
            console.log('socket fails to %s', sock.e);
        }
    }

    // 一分ごとにデバイスの最新情報を更新
    // setInterval(device, 60000);
}
