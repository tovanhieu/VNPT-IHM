import Vue from 'vue'
import VueIdb from 'vue-idb'

Vue.use(VueIdb)

var db = new vue({
    el: '#db',
    data:{
        data
    },

})
var indexedDB = window.indexedDb || window.mozIndexedDB;
var IDBTransaction = window.IDBTransaction || window.mozIDBTransaction;
var db = null;

if (indexedDB) {

}