import Vue from 'vue'
import VueRouter from 'vue-router'
import MainWrapper from '../components/MainWrapper.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'MainWrapper',
        component: MainWrapper
    },

]

const router = new VueRouter({

    // mode: 'history',
    // base: process.env.BASE_URL,
    // мод хистори убирает хэш, он нужен для продакшен версии для роутов
    routes

})

export default router