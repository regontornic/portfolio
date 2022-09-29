// 미친짓 못하도록 미연에 방지
'use strict';


// Make navbar transparent when it its on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if(link == null) {
    return;
  }
  scrollIntoView(link);
});

// Handle click on "contact me" button on home
const hoemContactBtn = document.querySelector('.home__contact');
hoemContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight/2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const proejctContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener('click', (e) => {
  // 숫자 버튼 누르면 filter 값이 undefined이기 때문에...
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  proejctContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      const type = project.dataset.type;
      if(filter === '*' || filter === type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    proejctContainer.classList.remove('anim-out');
  }, 300);

});



function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}