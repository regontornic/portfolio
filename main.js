// 미친짓 못하도록 미연에 방지
'use strict';


// Make navbar transparent when it its on the top
// 제일 top에 있으면 navbar 투명화
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
// navbar menu 탭 시 스크롤
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if(link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle button for small screen
// 작은 화면에서 Navbar toggle
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
// 
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

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  // 클릭된 것이 Button이면 e.target을 쓰고 아니면 parentNode를 쓴다.
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

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

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds = ["#home", "#about", "#skill", "#work", "#testimonials", "#contact"];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if(window.scrollY == 0) {
    selectedNavIndex = 0;
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});