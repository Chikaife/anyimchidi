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

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector(".mobile-menu")?.removeAttribute("open");
        if (history.replaceState) {
            history.replaceState(null, '', `#${targetId}`);
        }
    });
});

function createIntersectionObserver(options, callback) {
    if (!('IntersectionObserver' in window)) return null;
    return new IntersectionObserver(callback, options);
}

const revealObserver = createIntersectionObserver(
    { threshold: 0.15, rootMargin: '0px 0px -10%' },
    entries => {
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // remove so element can animate again when it re-enters
                    entry.target.classList.remove('visible');
                }
        });
    }
);

document.querySelectorAll('.reveal, .animate-on-scroll, .fade-in, .slide-in, .scale-in').forEach(element => {
    element.classList.add('pre-reveal');
    if (revealObserver) revealObserver.observe(element);
});

const countObserver = createIntersectionObserver(
    { threshold: 0.6 },
    entries => {
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                } else {
                    // reset so the counter will animate again on re-entry
                    if (entry.target.dataset && entry.target.dataset.target) {
                        entry.target.textContent = '0';
                    }
                }
        });
    }
);

function animateCounter(element) {
    const targetValue = parseInt(element.dataset.target, 10);
    if (Number.isNaN(targetValue) || targetValue <= 0) return;

    const duration = 1400;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.textContent = Math.floor(progress * targetValue);
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue;
        }
    }

    requestAnimationFrame(update);
}

document.querySelectorAll('.counter[data-target]').forEach(counter => {
    if (countObserver) countObserver.observe(counter);
});

const hoverElements = document.querySelectorAll(
    'button, .card, .feature, .interactive, .nav-link, .project-tile'
);
hoverElements.forEach(item => {
    item.style.transition = 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease';

    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px) scale(1.01)';
        item.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.08)';
        item.style.opacity = '0.98';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'none';
        item.style.boxShadow = 'none';
        item.style.opacity = '1';
    });
});

function smoothResizeObserver() {
    if (!('ResizeObserver' in window)) return;
    const resizeItems = document.querySelectorAll('.responsive-animate');
    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.contentRect.width < 600) {
                element.style.transition = 'none';
            } else {
                element.style.transition = 'transform 280ms ease, opacity 280ms ease';
            }
        });
    });

    resizeItems.forEach(element => resizeObserver.observe(element));
}

smoothResizeObserver();
