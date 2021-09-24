import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Member from '../pages/Member.vue'
import Order from '../pages/Order.vue'
import Produk from '../pages/Produk.vue'
import MemberProduk from '../pages/member/MemberProduk.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import LoginMember from '../pages/auth/Member.vue'
import Admin from '../pages/auth/Admin.vue'
import Middleware from '../middlewares/index'

Vue.use(VueRouter)

const routes = [
    {
        name: 'auth-member',
        path: '/auth/member',
        component: LoginMember,
        meta: {
            middleware: [Middleware.guest],
            loginLayout: true,
        }
    },
    {
        name: 'auth-admin',
        path: '/auth/admin',
        component: Admin,
        meta: {
            middleware: [Middleware.guest, Middleware.admin],
            loginLayout: true,
        },
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            middleware: [Middleware.auth],
        }
    },
    {
        name: 'member-produk',
        path: '/member/produk',
        component: MemberProduk,
        meta: {
            middleware: [Middleware.auth, Middleware.member],
        }
    },
    {
        name: 'member',
        path: '/member',
        component: Member,
        meta: {
            middleware: [Middleware.auth, Middleware.admin],
        }
    },
    {
        name: 'produk',
        path: '/produk',
        component: Produk,
        meta: {
            middleware: [Middleware.auth, Middleware.admin],
        }
    },
    {
        name: 'riwayat-order',
        path: '/riwayat-order',
        component: Order,
        meta: {
            middleware: [Middleware.auth, Middleware.admin],
        }
    },
    {
        path: "*",
        component: PageNotFound,
        meta: {
            Error404: true,
        },
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index];
    if (!nextMiddleware) return context.next;

    return (...parameters) => {
        context.next(parameters);
        const nextMidd = nextCheck(context, middleware, index + 1)
        nextMiddleware({ ...context, next: nextMidd })
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
        const ctx = { from, next, router, to }
        const nextMiddleware = nextCheck(ctx, middleware, 1);
        return middleware[0]({ ...ctx, next: nextMiddleware })
    }
    return next();
});

export default router
