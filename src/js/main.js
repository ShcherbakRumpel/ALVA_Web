const onToggleMenuPressed = () => {
    const menu = document.querySelector('.header-menu');
    document.querySelector('body').classList.toggle('no-scroll')
    return menu.classList.toggle('active')
};