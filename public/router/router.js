export const routes = [
    { path: '/', component: '<h1>Home Page</h1>' },
    { path: '/login', component: '<h1>About Page</h1>' },
    { path: '/authorization', component: '<h1>Contact Page</h1>' },
];

const router = () => {
    const currentPath = window.location.pathname;
    const route = routes.find(route => route.path === currentPath);
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = route.component;
};

document.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    router();
});

const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.history.pushState({}, href, window.location.origin + href);
        router();
    });
});