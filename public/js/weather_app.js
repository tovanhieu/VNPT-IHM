$(document).ready(function() {
    $.simpleWeather({
      //初期設定
      location: 'Tokyo, JP',
      unit: 'c',
  
      //正常に実行された時の処理
      success: function(weather) {
          //地名の表示
          html = '<p>'+weather.city+'</p>';
  
          //気温の表示
          html += '<p>'+weather.temp+'℃'+'</p>';
   
          //画面に表示
          $("#weather").html(html);
      }
    });
  });