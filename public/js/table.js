/*
 @table.js
   tableのDOMの操作
    + 
   socket通信
*/

/*
  既知のバグ：
   offlineボタン -> icon drop -> offlineボタンでバグる
   ⇒ Chromeであれば、WEB画面上でF12を押して、リロードボタンを長押し
   ⇒ 「キャッシュの消去と、ハード再読込み」を実行
*/

// import init from 'initTable.js';

// WoTGWのあて先を指定
const target_node = "http://192.168.11.10:8080/Things";


// basic認証用の設定
const username = 'wot';
const password = 'plugfest';

//PalsurGum/Lora用の文字列
const PulsarGum = "PulsarGum";
const PulsarGumIconHTML = '<img class="ui  image" src="./img/rss_black_48.png">';
const PulsarGum_alldata = "/bluetoothle/beacon/allData";
const Lora = "lora";
const LoraIconHTML = '<img class="ui  image" src="./img/sun_black_48.png">';
const Lora_alldata = "/sensor/all_sensor";
const None = "No target type";
const DEL_ID = "Del-Device-";
const REG_ID = "Reg-Device-";
const AnyHTML = '<img class="ui  image" src="./img/tag_black_48.png">';


// Demoモード管理用
const DEMO_MODE = { online: "ONLINE", offline: "OFFLINE" };
var currnet_demo_mode = "OFFLINE";

// localStrageIndex Array
var lstorageArray = new Array();

// SetInterval Registered Device監視用
var timerToRegisteredDevice = "";
const IntervalTime = 3000; // とりあえず3秒に一回


//特殊文字
const SPECIAL_WORD_P = "%3A"; // PulsarGum用

// offlineDebug用　Json -> prop_table
const offlineDebugJsonPropList = [
  "PulsarGum-f8%3A69%3A26%3A7f%3Aab%3A70",
  "PulsarGum-c8%3A56%3A49%3Aaf%3A4f%3Aaa",
  "PulsarGum-c5%3A7e%3Ae3%3A9c%3Afa%3Ad1",
  "PulsarGum-f4%3Af6%3A0a%3A65%3Add%3A04",
  "usb-FTDI_FT232R_USB_UART_AL2W4DFZ-if00-port0",
  "PulsarGum-fd%3A2c%3A04%3A85%3A18%3Af1"
];

const offlineDebugDeviceJson =
{
  "rssi": -69,
  "uCode": "00001C0000000000002402F0000008F5",
  "address": "c5:7e:e3:9c:fa:d1",
  "connectable": false,
  "uCodeVersion": 4,
  "addressType": "random",
  "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
  "serviceUuids": ["fe8c"],
  "state": "disconnected",
  "EvType": "Bt:Dev:alive"
};


window.addEventListener('load', function () {

  /*
    tableの初期化処理
  */
  // top bar offline_demo click時の挙動
  $("#offline_demo").on('click', function () {
    // table の情報をリフレッシュ
    clearAllTable();

    // table の情報をリフレッシュ
    clearPropLabelandBox();

    // Demoモードを切替
    switchMode(DEMO_MODE.offline);

    // table の情報をロード
    loadInitTable();
  });

  // top bar offline_demo click時の挙動
  $("#online_demo").on('click', function () {
    // table の情報をリフレッシュ
    clearAllTable();
    // table の情報をリフレッシュ
    clearPropLabelandBox();
    // Demoモードを切替
    switchMode(DEMO_MODE.online);

    // table の情報をリフレッシュ
    loadInitTable();

    //fetch -> socket 通信
    // fetchToWoTGW();
  });

  function clearAllTable() {
    let gw_table = document.getElementById('gw_table');
    let device_table = document.getElementById('device_table');
    let prop_table = document.getElementById('prop_table');

    clearTable(gw_table);
    clearTable(device_table);
    clearTable(prop_table); // TODO: Buttonオブジェクトを生成しているため、特別処理有り
  }

  // テーブルを削除する処理
  function clearTable(table) {
    // テーブルのリフレッシュ(初期化)
    try {
      while (table.rows.length > 0) {
        table.deleteRow(0);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function clearPropLabelandBox() {
    let plabel = document.getElementById('prop_label');
    plabel.innerHTML = "JSON Message:";
    document.getElementById('prop_result').textContent = "";
  }

  // Top barの表示切替
  function switchMode(mode) {
    let offline = document.getElementById('offline_demo');
    let online = document.getElementById('online_demo');

    if (mode === DEMO_MODE.offline) {
      offline.className = "active red right item";
      online.className = "active item";
      currnet_demo_mode = mode;
    } else {
      offline.className = "active right item";
      online.className = "active red item";
      currnet_demo_mode = mode;
    }
  }

  // initTable処理用
  function loadInitTable() {
    let initDOM = document.getElementById('initTable');
    initDOM.remove();

    let parent = document.createElement("div");
    parent.id = "initTable";

    let initOfflineScript = document.createElement("script");
    initOfflineScript.type = "text/javascript";
    initOfflineScript.id = "initTable";
    initOfflineScript.src = "js/initTable.js";
    parent.appendChild(initOfflineScript)

    document.body.appendChild(parent);

    // timerToRegisteredDevice = setInterval(manageDevice, IntervalTime);

    if (currnet_demo_mode === DEMO_MODE.offline) {
      success_fetch(offlineDebugJsonPropList);
    }
  }

  // Fetch処理
  function fetchToWoTGW() {
    var url = target_node;
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'X-MyRequest': 'this-is-cors-test',
        'X-MyOption': 'my-option',
      },
      keepalive: false,
    })
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        success_fetch(json);
        put_prop("mx-gw-01", json, "fetch", true); // TODO: 打ち込みなので、後ほど修正
      });
  }


  // 初期fetchが施一考した際の処理
  function success_fetch(json) {

    var table = document.getElementById('prop_table');

    // テーブルのリフレッシュ(初期化)
    /*while (table.rows.length > 0) {
      table.deleteRow(0);
    }*/

    addedJsonNumber = new Array();
    for (var i = 0; i < json.length; i++) {
      let flag = false;
      let compId = json[i].split(SPECIAL_WORD_P).join(':');
      for (var j = 0; j < table.rows.length; j++) {
        let propId = table.rows[j].cells[0]; // prop_table内の情報取得
        if (propId == compId) {
          flag = true;
          break;
        }
      }

      if (!flag) {
        // テーブル内に存在しないidなので、追加処理
        // テーブルの列に一列加える
        let num = table.rows.length;
        registerRowsInPropTable(table, json, compId, num);
        addedJsonNumber.push(num);
      }
    }

    for (i = 0; i < addedJsonNumber.length; i++) {
      registerEventInPropTable(addedJsonNumber[i]);
    }
  }

  function registerRowsInPropTable(table, json, id, num) {
    var parent = document.createElement('tr');
    var child1 = document.createElement('td');
    child1.innerHTML = id;
    parent.appendChild(child1);

    // Semantic UI - Conditionals Button処理の追加
    var child2 = document.createElement('td');

    var buttonGroup = document.createElement('div');
    buttonGroup.id = "DrButton-" + num;

    var delButton = document.createElement('button');
    //初期状態はDELがすべてDisable　-> 登録済みテーブルと比較し状態を変化させること。
    delButton.className = "ui button disabled";
    delButton.id = DEL_ID + num;
    delButton.innerHTML = "DEL";
    delButton.name = json[num];  // セル検索を無くすため。
    buttonGroup.appendChild(delButton);

    var orButton = document.createElement('div');
    orButton.className = "or";
    buttonGroup.appendChild(orButton);

    var regButton = document.createElement('button');
    regButton.className = "ui positive button";
    regButton.id = REG_ID + num;
    regButton.innerHTML = "REG";
    regButton.name = json[num];  // セル検索を無くすため。
    buttonGroup.appendChild(regButton);

    buttonGroup.className = "ui buttons";
    child2.appendChild(buttonGroup);

    console.log("child2 Txt: %s", child2.innerHTML);
    parent.appendChild(child2);

    table.innerHTML += parent.innerHTML;

  };

  function registerEventInPropTable(num) {

    // DELおよびREGボタンのイベントリスナーの実装
    let delbuttonTxt = DEL_ID + num;
    let regbuttonTxt = REG_ID + num;

    document.getElementById(delbuttonTxt).addEventListener('click', deleteRowsInDeviceTable, true);
    document.getElementById(regbuttonTxt).addEventListener('click', registerRowsInDeviceTable, true);
  }

  /*
    @deleteRowsInDeviceTable()
     Candidate Device Table内のDeleteボタンがクリックされた際に実行されるテーブル
  */
  function deleteRowsInDeviceTable(e) {
    try {
      let targetRows = document.getElementById("device_table");
      let tName = e.target.name;
      let taregetDeivceName = tName.split(SPECIAL_WORD_P).join(':');

      for (i = 0; i < targetRows.rows.length; i++) {
        let rowTargetHTML = targetRows.children[i].innerText;
        if (~rowTargetHTML.indexOf(taregetDeivceName)) {
          targetRows.deleteRow(i);
          break;
        }
      }
      switchButtonGroup(e.target.id);
    } catch (e) {
      console.log(e);
    }
  }

  /*
    @registerRowsInDeviceTabl() : EvenetListener 
    　Candidate List内のRegisterボタンがクリックされた際に実行される
  */
  function registerRowsInDeviceTable(e) {
    // e.targetはイベントが実行されている対象
    console.log("Button click name : %s", e.target.name);
    console.log("Button click id : %s", e.target.id);

    try {
      if (currnet_demo_mode === DEMO_MODE.offline) {
        register_Device(e.target.name);
      } else {
        basicAuth_Fetch(e.target.name);
        register_Device(e.target.name);
      }
      switchButtonGroup(e.target.id);
    } catch (e) {
      console.log(e);
    }
  }

  /*
   @switchBUttonGroup(targetButtonId)
    Candidate Device List内のボタンスイッチを切り替える 
  */
  function switchButtonGroup(targetButtonId) {
    let targetButtonIdName = targetButtonId.toString();
    let oppButtonIdName = "";

    if (~targetButtonIdName.indexOf(DEL_ID)) {
      oppButtonIdName = targetButtonIdName.replace(DEL_ID, REG_ID);
    } else if (~targetButtonIdName.indexOf(REG_ID)) {
      oppButtonIdName = targetButtonIdName.replace(REG_ID, DEL_ID);
    }

    //buttonGroupのDOM操作
    let targetButton = document.getElementById(targetButtonIdName);
    let oppButton = document.getElementById(oppButtonIdName);

    if (~targetButton.innerText.indexOf("REG")) {
      targetButton.className = "ui button disabled";
      oppButton.className = "ui button red";
    } else {
      targetButton.className = "ui button disabled";
      oppButton.className = "ui button positive";
    }

  }

  function basicAuth_Fetch(target) {
    // target_typeの設定。Iconの設定利用
    var target_type = "";

    // PulsarGumかLoraか
    if (~target.indexOf(PulsarGum)) {
      var url = target_node + "/" + target + PulsarGum_alldata;
      target_type = PulsarGum;
    }
    else if (~target.indexOf(Lora)) {
      var url = target_node + "/" + target + Lora_alldata;
      target_type = Lora;
    } else {
      target_type = None;
    }

    if (target_type === None) {
      console.log("basicAuth Fetch : %s is No target type -> break", target);
      return 0;
    }

    //headers.set('Authorization', 'Basic' + base64.encode(username + ":" + password));
    var auth = 'Basic ' + window.btoa(username + ':' + password);
    var targetDevice = target; // TODO: Global関数を使って、ずるい。。 -> Fetchurlを解析する方法がベスト

    fetch(url, {
      method: 'GET',
      headers: new Headers({
        "Authorization": auth
      }),

      keepalive: false,
      //credentials: 'user:passwd'
    })
      .then(response => response.json())
      .then(function (json) {
        // console.log("fetch success : %s", response.headers);
        let aTargetDevice = targetDevice.split(SPECIAL_WORD_P).join(":");
        put_prop(aTargetDevice, json, "fetch", true);
        change_status(targetDevice, "active");
      }).catch(function () {
        console.log("fetch failed...: %s");

        let aTargetDevice = targetDevice.split(SPECIAL_WORD_P).join(":");
        put_prop(targetDevice, '{Status : "Inactive"}', "fetch", false);
        change_status(targetDevice, "inactive");
      });
  }

  /*
   @change_status(targetDevice, status)
     Device table内のStatusを変更する
   */
  function change_status(targetDevice, status) {
    let deviceTable = document.getElementById('device_table');

    for (i = 0; i < deviceTable.rows.length; i++) {
      let aTargetDevice = targetDevice.split(SPECIAL_WORD_P).join(':');
      if (~deviceTable.rows[i].innerText.indexOf(aTargetDevice)) {
        deviceTable.rows[i].cells[3].innerHTML = status;
        console.log("change status :%s -> %s", deviceTable.rows[i].innerText, status);
      }
    }
  }

  function register_Device(target, responseStatus) {
    let deviceTable = document.getElementById('device_table');

    let parent = document.createElement('tr');
    let child1 = document.createElement('td');
    child1.innerHTML = icon_select(target);
    child1.draggable = true;
    child1.style = "width:48px";
    parent.appendChild(child1);

    let child2 = document.createElement('td');
    child2.innerHTML = target.split(SPECIAL_WORD_P).join(':');
    parent.appendChild(child2);

    let child3 = document.createElement('td');
    child3.innerHTML = 'Yet';
    parent.appendChild(child3);

    let child4 = document.createElement('td');
    child4.innerHTML = 'active';
    parent.appendChild(child4);

    deviceTable.appendChild(parent);
  }

  function icon_select(target) {

    if (~target.indexOf(Lora)) {
      return LoraIconHTML;
    } else if (~target.indexOf(PulsarGum)) {
      return PulsarGumIconHTML
    }
    return AnyHTML;

  }


  /* Event 処理
  // table click時の挙動
  */
  $(document).on('click', '#gw_table tr', function (event) {
    // いらない → $tag_td = $(this)[0];
    // いらない → $idx = $(this).children('td').index(this);

    // MXidの取得
    $targethCntxt = $(this).children().eq(1);
    let targetNode = $targethCntxt.get(0).innerText;
    //let targetNode = $(this).children().eq(0).get(0).cells[1].innerText;

    //オンラインモードの際に通信
    if (currnet_demo_mode === DEMO_MODE.online) {
      fetchToWoTGW();
    } else {
      offlineFetchToWoTGW(targetNode);
    }
  });

  // offline用の処理
  function offlineFetchToWoTGW(targetNode) {
    // console.log("%s行 - %s", $idx, $tdStr);
    // DBからプロパティ情報を取得する
    if (~targetNode.indexOf(SPECIAL_WORD_P)) {
      targetNode = targetNode.split(SPECIAL_WORD_P).join(':');
    }

    for (var i = 0; i < localStorage.length; i++) {
      var k = window.localStorage.key(i);
      var n_obj = window.localStorage.getItem(k)
      const obj = JSON.parse(n_obj);
      let compObj = "";

      // Object比較　⇒　対象テーブルのキー値判断
      if ('mxId' in obj) {
        compObj = obj.mxId;
      } else if ('id' in obj) {
        compObj = obj.id;
      } else {
        return false;
      }

      try {
        if (typeof compObj === 'undefined') {  // 処理が気持ち悪いので後ほど変更
          continue;
        }
        console.log("target Node %s , compObj %s", targetNode, compObj);
        if (targetNode == compObj) {
          // JSON内に表示
          put_prop(targetNode, n_obj, "lstorage_read", true);
          return true;
        }
      } catch (e) {
        console.log("catch : %s : %s", obj, e.message);
        return false;
      }
    }
  }

  /* 
    @ device-table click時の挙動
  */
  $(document).on('click', '#device_table tr', function (event) {
    // 要素が存在するか否かのフラッグ
    let flag = false;

    // DeviceIDの取得
    $targethCntxt = $(this).children().eq(1);
    let targetNode = $targethCntxt.get(0).innerText.split(":").join(SPECIAL_WORD_P);

    //オンラインモードの際に通信
    if (currnet_demo_mode === DEMO_MODE.online) {
      basicAuth_Fetch(targetNode);
    } else {
      flag = offlineFetchToWoTGW(targetNode);
    }

    if (!flag) {
      put_prop(targetNode, "{}", "lstorage_read", false);
    }
  });


  /* 
    @ Propへの書き込み
  */
  function put_prop(target, n_obj, prevflow, flag) {
    // targetの変更
    var plabel = document.getElementById('prop_label');

    try {
      plabel.innerHTML = "JSON Message:" + target;
      if (flag) {
        let date = new Date();
        let txt = "Recevied Date: " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
          date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + ":" +
          date.getSeconds() + "\n";
        if (prevflow === "fetch") {
          txt += JSON.stringify(n_obj, null, "    ");
        } else {
          txt += JSON.stringify(JSON.parse(n_obj), null, "    ");
        }
        document.getElementById('prop_result').textContent = txt.toString();
      } else {
        let txt = "NO DATA";
        document.getElementById('prop_result').textContent = txt.toString();
      }

    } catch (e) {
      document.getElementById('prop_result').textContent = "Parse Error";
    }
  };

});