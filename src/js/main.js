const hamburger = document.querySelector('.header-menu-toggle');
const menu = document.querySelector('.header-menu');

const toggleMenu = function toggleMenu() {
    menu.classList.toggle('active');
};

hamburger.addEventListener('click', function(e) {
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