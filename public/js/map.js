/*

*/
window.addEventListener('load', function() {
    // 適当な位置のポイント ジオメトリを作成
    const point = {
      type: "point",
      x: 0,
      y: 0,
      spatialReferences: {wkid: 4326}
    };
  
    // 画像表示用のマーカー シンボルを作成
    const markerSymbol = {
      type: "picture-marker",
      url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
      width: "64px",
      height: "64px"
    };

});