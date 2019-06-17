import Router from 'vue-router'
import Vue from 'vue'
import MyList from './views/MyList.vue'
import Stat from './views/Stat.vue'


Vue.use(Router)

const router = new Router({
    routes:[{
        path: '',
        redirect: { name: 'my-list' }
    },{
        path: '/list',
        name: 'my-list',
        component: MyList
    },{
        path: '/stat',
        name: 'stat',
        component: Stat
    }
    ]
})

export default router