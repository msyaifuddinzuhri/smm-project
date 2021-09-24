export default function admin({ next, router }) {
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'));
    if (isAdmin == false) {
        return router.push({ name: 'home' });
    }
    return next();
}
