// =============================
// NAVBAR SCROLL EFFECT
// =============================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
});

// =============================
// MOBILE MENU TOGGLE
// =============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.matches("a")) navLinks.classList.remove("active");
  });
}

// =============================
// THEME TOGGLE
// =============================
const themeButton = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("site-theme") || "light";
document.documentElement.setAttribute("data-theme", storedTheme);
updateThemeIcon(storedTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const nextTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("site-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const handle = document.querySelector(".switch-handle");
  if (!handle) return;
  handle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
}

// =============================
// SKILL BARS
// =============================
const skillFills = document.querySelectorAll(".progress-fill");
if (skillFills.length) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute("data-percent");
        entry.target.style.width = percent + "%";
      }
    });
  }, { threshold: 0.5 });
  skillFills.forEach((fill) => skillObserver.observe(fill));
}

// =============================
// FADE-UP SECTIONS
// =============================
const fadeSections = document.querySelectorAll(".fade-up");
if (fadeSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeSections.forEach((sec) => sectionObserver.observe(sec));
}

// =============================
// CONTACT FORM
// =============================
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
if (form && formMessage) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          formMessage.textContent = "✅ Message sent successfully!";
          formMessage.className = "form-message success";
          form.reset();
        } else {
          formMessage.textContent = "❌ Something went wrong. Please try again.";
          formMessage.className = "form-message error";
        }
      })
      .catch(() => {
        formMessage.textContent = "❌ Network error. Please try again.";
        formMessage.className = "form-message error";
      });
  });
}

// =============================
// ANIMATED TAGLINE
// =============================
const typedElement = document.getElementById("typed");
if (typedElement) {
  const words = ["Web Developer", "Designer", "Programmer"];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (!deleting) {
      typedElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      typedElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeEffect, deleting ? 60 : 120);
  }
  typeEffect();
}

// =============================
// LIGHTBOX WITH SLIDESHOW
// =============================
window.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const projectImages = document.querySelectorAll(".project-image img");

  let currentIndex = 0;

  if (!lightbox || !lightboxImg || !projectImages.length) return;

  function showImage(index) {
    const img = projectImages[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.style.display = "flex";
    currentIndex = index;
  }

  projectImages.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => showImage(index));
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
      showImage(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % projectImages.length;
      showImage(currentIndex);
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
      if (e.key === "Escape") lightbox.style.display = "none";
    }
  });
});

// =============================
// HERO PARALLAX CHARACTERS
// =============================
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const behind = document.querySelector(".character-behind");
  const side = document.querySelector(".character-side");

  if (behind) {
    behind.style.transform = `translateY(${scrollY * 0.1}px)`; // slower
  }
  if (side) {
    side.style.transform = `translateY(${scrollY * 0.2}px)`; // faster
  }
});

// =============================
// HERO CHARACTER MOUSE FOLLOW (desktop only)
// =============================
const sideChar = document.querySelector(".character-side");

if (sideChar && window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;

    const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / innerHeight - 0.5) * 2;

    const moveX = x * 20; // max 20px left/right
    const moveY = y * 10; // max 10px up/down

    sideChar.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  document.addEventListener("mouseleave", () => {
    sideChar.style.transform = "translate(0, 0)";
  });
}



// =============================
// PROJECTS GRID: DRAG/TOUCH SCROLL
// =============================
const projectsGrid = document.querySelector(".projects-grid");

if (projectsGrid) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse drag (desktop)
  projectsGrid.addEventListener("mousedown", (e) => {
    isDown = true;
    projectsGrid.classList.add("dragging");
    startX = e.pageX - projectsGrid.offsetLeft;
    scrollLeft = projectsGrid.scrollLeft;
  });

  projectsGrid.addEventListener("mouseleave", () => {
    isDown = false;
    projectsGrid.classList.remove("dragging");
  });

  projectsGrid.addEventListener("mouseup", () => {
    isDown = false;
    projectsGrid.classList.remove("dragging");
  });

  projectsGrid.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectsGrid.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    projectsGrid.scrollLeft = scrollLeft - walk;
  });

  // Touch (mobile) works natively with overflow-x: auto
}
