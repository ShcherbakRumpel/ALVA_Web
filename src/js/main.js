const hamburger = document.querySelector('.header-menu-toggle');
const menu = document.querySelector('.header-menu');

const toggleMenu = function toggleMenu() {
    menu.classList.toggle('active');
};

hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', function (e) {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('active');
    if (!its_menu && !its_hamburger && menu_is_active) {
        toggleMenu();
    }
});

const onShowPagePressed = (e) => {
    let activePage = e.target.innerHTML;
    if (activePage) {
        const home = document.querySelector('.home');
        const partners = document.querySelector('.partners');
        const news = document.querySelector('.news');
        const cooperation = document.querySelector('.cooperation');
        const contacts = document.querySelector('.contacts');
        let currentPage = document.querySelector('.active-page');
        currentPage.classList.remove('active-page');

        switch (activePage) {
            case 'Главная':
                home.classList.add('active-page');
                break;
            case 'Новости':
                news.classList.add('active-page');
                break;
            case 'Контакты':
                contacts.classList.add('active-page');
                break;
            case 'Партнеры':
                partners.classList.add('active-page');
                break;
            case 'Сотрудничество':
                cooperation.classList.add('active-page');
                break;
            default:
                home.classList.add('active-page');
        }

    }

};