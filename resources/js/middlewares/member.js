export default function member({ next, router }) {
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'));
    if (isAdmin == true) {
        return router.push({ name: 'home' });
    }
    return next();
}
