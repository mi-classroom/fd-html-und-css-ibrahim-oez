let burger = document.querySelector('[data-js-main-menu]')
const sidebar = document.querySelector('[data-js-sidebar]')
burger.addEventListener('click',()=>{
    sidebar.classList.toggle('is-active');
});

//test
let body = document.querySelector('body')
if(body.style.width <= 500){
    console.log('nooooooooo');
}


    