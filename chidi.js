const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const clock = document.getElementById("clock");

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  const isDark = theme === "dark";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  if (themeLabel) {
    themeLabel.textContent = isDark ? "Dark" : "Light";
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
}

function updateClock() {
  if (!clock) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  clock.textContent = timeString;
}

initTheme();
updateClock();
setInterval(updateClock, 1000);

const mobileMenu = document.querySelector(".mobile-menu");

mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.removeAttribute("open");
    });
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('formStatus');

    if (!name || !email || !message) {
        event.preventDefault();
        status.textContent = 'Please fill out all fields before submitting.';
        return;
    }

    status.textContent = 'Thanks, ' + name + '! Message sent.\nI will respond soon.';
    status.style.color = '#8bffa8';

    console.log({ name, email, message });
    });
}

const items = document.querySelectorAll(".scroll-item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

items.forEach(item => {
    observer.observe(item);
});
