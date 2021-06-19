import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        items: [
            { name: "Марина", tel: "8 901 111 22 11", arrayChildUser: [{ name: "Андрей", tel: "8 333 222 11 11" }] },
            { name: "Петр", tel: "8 901 111 33 11", arrayChildUser: [{ name: "Слава", tel: "8 331 222 11 11" }] },
            { name: "Иван", tel: "8 901 111 44 11", arrayChildUser: [] },
            { name: "Евгений", tel: "8 901 111 11 11", arrayChildUser: [] },
        ],

        select: "",


    },

    mutations: {
    },

    actions: {
    },

    getters: {

    },

})