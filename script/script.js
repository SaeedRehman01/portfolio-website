const header = document.querySelector(".navbar");
console.log(header);
window.onscroll = function () {
  const top = window.scrollY;
  if (top >= 100) {
    header.classList.add("navbarDark");
  } else {
    header.classList.remove("navbarDark");
  }
};

// collapse navbar after click on small devices
const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");

navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    new bootstrap.Collapse(menuToggle).toggle();
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
  var currentIndex = 0;

  var aboutmeSections = [
    {
      icon: "fa-thin fa-graduation-cap",
      title: "Education & Experience",
      description: `BSc Computer Science (Hons)
      - 1st Class Honours

      Graduate Engineer, HSBC (Current)
      - Working on various projects to improve banking services.

      Software Engineering Intern, Bosch Rexroth (1 year)
      - Developed multiple software applications, enhancing business processes.`,
    },
    {
      icon: "fa-solid fa-code",
      title: "Technical Skills",
      description: `- Software Development: Java, Python, Swift, MATLAB App Designer
        - Software Design: UML Diagrams (Class, Use Case)
        - Database Management: MySQL, Microsoft SQL Server, MongoDB
        - Web Development: HTML, CSS, JavaScript, PHP
        - Machine Learning: TensorFlow, PyTorch`,
    },

    {
      icon: "fa-solid fa-code-branch",
      title: "Soft Skills",
      description: `- Problem-Solving: Excel in diagnosing issues and implementing efficient solutions.
        - Adaptability: Quickly adapt to new technologies and changes in project scope.
        - Effective Communication: Articulate complex technical concepts to non-technical stakeholders.
        - Collaborative Teamwork: Successfully worked in diverse teams on various projects.`,
    },
  ];

  function updateCircles(currentIndex) {
    var circles = document.querySelectorAll(".circle");
    circles.forEach(function (circle, index) {
      if (index === currentIndex) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
  }

  function createCircles() {
    var container = document.getElementById("circlesContainer");
    aboutmeSections.forEach(function () {
      var circle = document.createElement("div");
      circle.className = "circle";
      container.appendChild(circle);
    });
  }

  // Call this function at the end of the script to initialise the circles
  createCircles();
  updateCircles(0);

  function updateAboutMeSections(aboutmeSection, index) {
    document.getElementById("aboutmeTitles").innerText = aboutmeSection.title;
    document.getElementById("aboutmeDescriptions").innerText =
      aboutmeSection.description;
    document.querySelector(".aboutmeIcons").className =
      "fas aboutmeIcons " + aboutmeSection.icon;

    updateCircles(index);
  }

  document.getElementById("nextButton").addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % aboutmeSections.length;
    updateAboutMeSections(aboutmeSections[currentIndex], currentIndex);
  });

  document.getElementById("prevButton").addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + aboutmeSections.length) % aboutmeSections.length;
    updateAboutMeSections(aboutmeSections[currentIndex], currentIndex);
  });

  updateAboutMeSections(aboutmeSections[0]);

  // Typing effect code
  const titleElement = document.querySelector(".h1-title");
  const subtitleElement = document.querySelector(".h2-title");
  const fullTextH1 = titleElement.innerText;
  const fullTextH2 = subtitleElement.innerText;
  let charIndexH1 = 0;
  let charIndexH2 = 0;

  const typeSpeedH1 = 190;
  const typeSpeedH2 = 190;
  const pauseBeforeH2 = 400;

  // clear the visible text (it's hidden by CSS already, but clear to be safe)
  titleElement.innerText = "";
  subtitleElement.innerText = "";

  function typeWriterTitle() {
    // reveal title area before typing
    titleElement.style.opacity = "1";

    if (charIndexH1 < fullTextH1.length) {
      titleElement.innerText = fullTextH1.substring(0, charIndexH1 + 1);
      charIndexH1++;
      setTimeout(typeWriterTitle, typeSpeedH1);
    } else {
      titleElement.classList.add("no-cursor");
      setTimeout(typeWriterSubtitle, pauseBeforeH2);
    }
  }

  function typeWriterSubtitle() {
    // reveal subtitle when its typing begins
    subtitleElement.style.opacity = "1";

    if (charIndexH2 < fullTextH2.length) {
      subtitleElement.innerText = fullTextH2.substring(0, charIndexH2 + 1);
      charIndexH2++;
      setTimeout(typeWriterSubtitle, typeSpeedH2);
    } else {
      subtitleElement.classList.add("no-cursor");
    }
  }

  setTimeout(typeWriterTitle, 150); // optional small initial delay
});

// Contact form makes sure contact message has content
document.getElementById("contact-form").onsubmit = function () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  if (name.trim() === "") {
    alert("Please enter your name.");
    return false;
  }

  if (email.trim() === "") {
    alert("Please enter your email.");
    return false;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (message.trim() === "") {
    alert("Please enter a message.");
    return false;
  }

  return true;
};
