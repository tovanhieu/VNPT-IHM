
/*
  localstrage を使ったDB実装例 -> JavaScript コードレシピ:244　参照
  SUBJECT：Indexeddbを使った方が、データベース操作が早いかも。。
*/
// const section = document.querySelector('.localStrage');
// const btn_register_gw = section.querySelector(".btn_Register_gw");
// const btn_register_iot = section.querySelector(".btn_Register_iot");
const lstorage = window.localStorage;
lstorage.clear();
// document.write("<script type='text/javascript' src='js/sample/json.js'></script>");

$(function registerDatabase(){

    // GW listの登録
    var st_gw1 = JSON.stringify(sample_gw1);
    var st_gw2 = JSON.stringify(sample_gw2);
    var active_gw1 = JSON.stringify(sample_active_gw1);

    //  Deivce listの登録 →　ACTION：MAPのエレメントの追加が必要。
    var st_gw1_dev1 = JSON.stringify(sample_gw1_device1);
    var st_gw1_dev2 = JSON.stringify(sample_gw1_device2);
    var st_gw1_dev3 = JSON.stringify(sample_gw1_device3);
    var st_gw1_dev4 = JSON.stringify(sample_gw1_device4);
    var st_gw1_dev5 = JSON.stringify(sample_gw1_device5);
    var st_gw1_dev6 = JSON.stringify(sample_gw1_device6);
    var st_gw1_dev7 = JSON.stringify(sample_gw1_device7);
    var st_gw1_dev8 = JSON.stringify(sample_gw1_device8);
    var st_gw1_dev9 = JSON.stringify(sample_gw1_device9);

    // 事前CandidateListの登録
    // var preRegCandiDev = JSON.stringify(preRegisteredCandidateList);

    // GW listの登録
    lstorage.setItem("gwlist1", st_gw1);
    lstorage.setItem("gwlist2", st_gw2);
    lstorage.setItem("demoGwlist1",active_gw1);
    // Deivce listの登録 →　ACTION：MAPのエレメントの追加が必要。
    lstorage.setItem("devlist1", st_gw1_dev1);
    lstorage.setItem("devlist2", st_gw1_dev2);
    lstorage.setItem("devlist3", st_gw1_dev3);
    lstorage.setItem("devlist4", st_gw1_dev4);
    lstorage.setItem("devlist5", st_gw1_dev5);
    lstorage.setItem("devlist6", st_gw1_dev6);
    lstorage.setItem("devlist7", st_gw1_dev7);
    lstorage.setItem("devlist8", st_gw1_dev8);
    lstorage.setItem("devlist9", st_gw1_dev9);
    // lstorage.setItem("candiDev", preRegCandiDev);
});

// btn_register_gw.addEventListener('.click', () =>{
//     console.log("PUSH : btn_register_gw");
// }) 

