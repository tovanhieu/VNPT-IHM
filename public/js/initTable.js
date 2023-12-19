
$(function initTable() {
    /*
    <Gateway Table の追加>

    */
    let g = document.getElementById('gw_table');
    let dataGw1 = JSON.parse(window.localStorage.getItem('gwlist1'));
    let dataGw2 = JSON.parse(window.localStorage.getItem('gwlist2'));
    let demoGw = JSON.parse(window.localStorage.getItem('demoGwlist1')); //->エラーが出るので、以下に直接打ち込み


    // モードの切替
    // currnet_demo_modeはtable.jsで定義
    if (currnet_demo_mode === DEMO_MODE.offline) {

        /*
         @gwlist1
        */
        const parent = document.createElement('tr');
        // parent.id = "gw1"

        // 追加(2019/05/29)
        const icon1 = document.createElement('td');
        icon1.style = "width:48px";
        icon1.innerHTML = '<img class="ui  image" src="./img/hdd_black_32.png">';
        icon1.draggable = true;
        icon1.class = "icon_drop_action";
        parent.appendChild(icon1);

        const child1 = document.createElement('td');
        child1.innerHTML = dataGw1.mxId;
        parent.appendChild(child1);

        const child2 = document.createElement('td');
        child2.innerHTML = 'Yet';
        parent.appendChild(child2);

        const child3 = document.createElement('td');
        child3.innerHTML = dataGw1.connection;
        parent.appendChild(child3);

        console.log(parent.innerHTML);

        g.innerHTML += parent.innerHTML;

        /*
         @gwlist2
        */
        const parent1 = document.createElement('tr');
        // parent1.id = "gw2"

        // 追加(2019/05/29)
        const icon11 = document.createElement('td');
        icon11.style = "width:48px";
        icon11.draggable = true;
        icon11.class = "icon_drop_action";
        icon11.innerHTML = '<img class="ui  image" src="./img/hdd_black_32.png">';
        parent1.appendChild(icon11);


        const child11 = document.createElement('td');
        child11.innerHTML = dataGw2.mxId;
        parent1.appendChild(child11);

        const child12 = document.createElement('td');
        child12.innerHTML = 'Yet';
        parent1.appendChild(child12);

        const child13 = document.createElement('td');
        child13.innerHTML = dataGw2.connection;
        parent1.appendChild(child13);

        console.log(parent1.innerHTML);

        g.innerHTML += parent1.innerHTML;

        console.log(g.innerHTML);

        /*
        <Device Table の追加>
   
        */
        var d = document.getElementById('device_table');
        var dataDev1 = JSON.parse(window.localStorage.getItem('devlist1'));
        var dataDev2 = JSON.parse(window.localStorage.getItem('devlist2'));
        var dataDev3 = JSON.parse(window.localStorage.getItem('devlist3'));

        // Devlist1
        const parent2 = document.createElement('tr');
        // parent2.id = "dev1"

        // 追加(2019/05/29)
        const icon21 = document.createElement('td');
        icon21.style = "width:48px";
        icon21.draggable = true;
        icon21.class = "icon_drop_action";
        icon21.innerHTML = '<img class="ui small image" src="./img/rss_black_48.png">';
        parent2.appendChild(icon21);


        const child21 = document.createElement('td');
        child21.innerHTML = dataDev1.id;
        parent2.appendChild(child21);

        const child22 = document.createElement('td');
        child22.innerHTML = 'Yet';
        parent2.appendChild(child22);

        const child23 = document.createElement('td');
        child23.innerHTML = dataDev1.state;
        parent2.appendChild(child23);

        console.log(parent2.innerHTML);

        d.innerHTML += parent2.innerHTML;

        // Devlist2
        const parent3 = document.createElement('tr');
        // parent3.id = "dev2"

        // 追加(2019/05/29)
        const icon31 = document.createElement('td');
        icon31.style = "width:48px";
        icon31.draggable = true;
        icon31.class = "icon_drop_action";
        icon31.innerHTML = '<img class="ui small image" src="./img/rss_black_48.png">';
        parent3.appendChild(icon31);


        const child31 = document.createElement('td');
        child31.innerHTML = dataDev2.id;
        parent3.appendChild(child31);

        const child32 = document.createElement('td');
        child32.innerHTML = 'Yet';
        parent3.appendChild(child32);

        const child33 = document.createElement('td');
        child33.innerHTML = dataDev2.state;
        parent3.appendChild(child33);

        d.innerHTML += parent3.innerHTML;

        // Devlist3
        const parent4 = document.createElement('tr');
        // parent4.id = "dev3"

        // 追加(2019/06/26)
        const icon41 = document.createElement('td');
        icon41.style = "width:48px";
        icon41.draggable = true;
        icon41.class = "icon_drop_action";
        icon41.innerHTML = '<img class="ui small image" src="./img/sun_black_48.png">';
        parent4.appendChild(icon41);

        const child41 = document.createElement('td');
        child41.innerHTML = dataDev3.id;
        parent4.appendChild(child41);

        const child42 = document.createElement('td');
        child42.innerHTML = 'Yet';
        parent4.appendChild(child42);

        const child43 = document.createElement('td');
        child43.innerHTML = dataDev3.state;
        parent4.appendChild(child43);

        d.innerHTML += parent4.innerHTML;
        console.log(d.innerHTML);

        /*
        var p = document.getElementById('prop_table');
        var dataDev1 = JSON.parse(window.localStorage.getItem('candiDev'));
        
        // candiDev -1
        const parent5 = document.createElement('tr');

        const child51 = document.createElement('td');
        child51.innerHTML = dataDev1[0];
        parent5.appendChild(child51);

        p.innerHTML += parent5.innerHTML;

        // candiDev -1
        const parent6 = document.createElement('tr');

        const child61 = document.createElement('td');
        child61.innerHTML = dataDev1[1];
        parent6.appendChild(child61);

        p.innerHTML += parent6.innerHTML;*/
    }

    if (currnet_demo_mode === DEMO_MODE.online) {
        /*
         @gwlist1
        */
        const parent = document.createElement('tr');
        parent.id = "gw1"

        // 追加(2019/05/29)
        const icon1 = document.createElement('td');
        icon1.style = "width:48px";
        icon1.innerHTML = '<img class="ui small image" src="./img/hdd_black_48.png">';
        icon1.draggable = true;
        icon1.class = "icon_drop_action";
        parent.appendChild(icon1);

        const child1 = document.createElement('td');
        child1.innerHTML = "mx-gw-001";
        parent.appendChild(child1);

        const child2 = document.createElement('td');
        child2.innerHTML = 'Yet';
        parent.appendChild(child2);

        const child3 = document.createElement('td');
        child3.innerHTML = "active";
        parent.appendChild(child3);

        console.log(parent.innerHTML);
    }
});