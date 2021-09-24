export default function auth({ next, router }) {
    if (localStorage.getItem('token') == null) {
        return router.push({ name: 'auth-member', query: {is_login: false} });
    }
    return next();
}

