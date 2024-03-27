// projects arr
const projectsArr = [];

// dialog box manipulation
const projectModal = document.querySelector('#project-modal');
const closeButton = document.querySelector('[data-close-modal]');
const modalName = document.querySelector("#modal-name");
const modalDesc = document.querySelector("#modal-desc");
const modalTechStack = document.querySelector('#modal-tech-stack');
const carousel = document.querySelector('#carousel-main');
const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');


// modal selectors
const modalTitle = document.querySelector(`#modal-title`);
const modalLink = document.querySelector(`#modal-live-link`);
const modalGit = document.querySelector('#modal-github-link');



let index = 0

function populateAndShowModal(event) {

  // get the event listener data
  const { index } = event.target.dataset;
  const project = projectsArr[index];

  const techStack = project.tech
  techStack.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.innerHTML = item
    modalTechStack.appendChild(listItem);
  })

  // populate the modal
  modalTitle.innerText = project.title;
  modalLink.setAttribute('href', project.link);

  modalGit.setAttribute('href', project.github);

  modalDesc.innerText = project.desc;
  modalName.innerText = project.title;
  const images = project.images
  images.forEach((imageSrc) => {
    const img = document.createElement('img');
    img.src = imageSrc
    img.classList.add('carousel-img');

    carousel.appendChild(img);
    slides.push(img);
  })



  // show the dialog
  showSlide(0);
  projectModal.showModal();
}

// modal change slide
leftArrow.addEventListener('click', function () {
  index -= 1
  showSlide(index);
})

rightArrow.addEventListener('click', function () {
  index += 1
  showSlide(index);
})


// modal close.
closeButton.addEventListener('click', function (event) {
  carousel.innerHTML = ""
  modalTechStack.innerHTML = ""
  index = 0
  slides = []
  projectModal.close();
})


// blob animation
const blob = document.getElementById("blob");

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 200, fill: "forwards" }
  );
};

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

      // let card = `<div class="col-md-6 col-xxl-4 my-3">
      //           <div class="img-container">
      //           <img src="${project.img}" alt="" loading="lazy" onclick="(e) => console.log(e)"/></div>
      //           <div class="project-info">
      //           <p class="project-title"><a href="${project.link}" target="blank_">${project.title}</a></p>
      //           <div class="project-link"><a href="${project.github}" target="blank_">Github <i class="fa-brands fa-github fa-sm" style="color: #f9f9f9;"></i></a></div></div>
      //           </div>`;

      projectsArr.push(project);

      const card = document.createElement('div');
      card.classList.add('col-md-6', 'col-xxl-4', 'my-3');

      const imgContainer = document.createElement('div');
      const img = document.createElement('img');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('src', project.img);
      img.dataset.index = i;
      img.onclick = (e) => populateAndShowModal(e);
      imgContainer.classList.add('img-container');
      imgContainer.appendChild(img);
      card.appendChild(imgContainer);

      const projectInfo = document.createElement('div');
      projectInfo.classList.add('project-info');
      card.appendChild(projectInfo);

      const projectTitle = document.createElement('p');
      projectTitle.classList.add('project-title');


      const projectLive = document.createElement('a');
      projectLive.innerText = project.title;
      projectLive.setAttribute('target', 'blank_');
      projectLive.href = project.link;

      projectTitle.appendChild(projectLive);
      projectInfo.appendChild(projectTitle);

      projects.appendChild(card);
    });
  });


let slides = []

function showSlide(x) {
  if (x >= slides.length) {
    index = 0;
  } if (x < 0) {
    index = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    if (i === index) {
      slides[i].style.visibility = "unset";
    } else {
      slides[i].style.visibility = "hidden";
    }
  }
}

// tab-switching
const onTabClick = (event) => {
  let activeTabs = document.querySelectorAll(".active");

  activeTabs.forEach((activeTab) => {
    activeTab.classList.remove("active");
  });
  event.target.parentElement.className += " active";
  document.getElementById(event.target.dataset["tab"]).classList +=
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


gsap.from("#social-icons", {
  opacity: 0,
  scrollTrigger: {
    scrub: 1
  }
})


const timeline = gsap.timeline();


timeline.from("#hello", {
  x: -50,
  duration: 0.5,
  opacity: 0,
});

timeline.from(".jobTitle", {
  x: 50,
  opacity: 0,
  duration: 0.6,
});

timeline.from(".salute-desc", {
  opacity: 0,
  duration: 0.6
})

timeline.from(".hire-button", {
  opacity: 0
})
