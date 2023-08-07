// nav-bar
(function () {
  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.getElementById("site-header");

  var checkScroll = function () {
    /*
     ** Find the direction of scroll
     ** 0 - initial, 1 - up, 2 - down
     */

    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    } else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 52) {
      //replace 52 with the height of your header in px

      header.classList.add("hide");
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove("hide");
      prevDirection = direction;
    }
  };

  window.addEventListener("scroll", checkScroll);
})();

const projects = document.getElementById("project-grid");

fetch("./static/data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((project, i) => {
      let card = `<div class="card">
                <div class="img-container">
                <img src="${project.img}" alt="" loading="lazy"/></div>
                <div class="project-info">
                <p class="project-title"><a href="${project.link}" target="blank_">${project.title}</a></p>
                <div class="project-link"><a href="${project.github}" target="blank_">Github <i class="fa-brands fa-github fa-sm" style="color: #f9f9f9;"></i></a></div></div>
                </div>`;

      projects.innerHTML += card;
    });
  });

// tab-switching

const onTabClick = (event) => {
  let activeTabs = document.querySelectorAll(".active");

  activeTabs.forEach((activeTab) => {
    activeTab.classList.remove("active");
  });

  event.target.parentElement.className += " active";
  document.getElementById(event.target.href.split("#")[1]).classList +=
    " active";
};

const navTab = document.getElementById("nav-tab");

navTab.addEventListener("click", (e) => onTabClick(e), false);

// contact link animation
const contactLink = document.querySelector("#contact-link");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;
contactLink.addEventListener("mouseover", (event) => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 2;
  }, 30);
});

gsap.from("#hello", {
  x: "-100vw",
  duration: 1.3,
  scale : 0
});


gsap.from(".jobTitle", {
  x: "100vw",
  scale : 0,
  duration: 1.3,
});


gsap.from("#scroll-down", {
  x: "-100vw",
  duration: 2,
});



gsap.to("#scroll-down", {
  delay: 3.7,
  duration: 1.2,
  fontSize: "0.5em",
  y : "14em"
});
