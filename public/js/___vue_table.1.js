
window.onload = function () {
  var vm = new Vue({
    el: '#example-1',
    data: {
        items : []
      },
      methods: {
        initDeviceTable: function() {
          var dataDev1 = localStorage.getItem('devlist1');
          var dataDev2 = localStorage.getItem('devlist2');
        },
        click_gw_table: function(event) {
          $tag_td = $(this)[0];
          $tag_tr = $(this).parent()[0];
          console.log("%s列, %s行", $tag_td.cellIndex, $tag_tr.rowIndex);

          var p = document.getElementById('gw_table');
        }
      }
  });
}