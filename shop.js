// Replace with your number: country code + number, digits only (e.g. 2348012345678)
const mobileNav = document.getElementById("mobileNav");
const menuToggle = document.getElementById("menuToggle");
const clock = document.getElementById("clock");

if (mobileNav && menuToggle) {
  const closeMobileNav = () => {
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuToggle.classList.toggle("is-open", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("click", (event) => {
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMobileNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMobileNav();
      menuToggle.focus();
    }
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

updateClock();
setInterval(updateClock, 1000);

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


var WHATSAPP_NUMBER = "2348067206105";
var FORMSPREE_URL = "https://formspree.io/f/xoejwjol";

window.AACEE_PRODUCTS = [
  {
    id: "bucket-hat",
    name: "Bucket hat",
    image: "/shop/bucket hat.jpg",
    backImage: "/shop/bucket_hat_back.jpg",
    alt: "Black bucket hat with white AACEE logo",
    price: "₦16,000",
    description: "A laid-back essential that brings effortless style to any fit. Made for sunny days, casual outings and everyday expression.",
    colors: ["Black", "Whitesmoke"],
    sizes: ["One size"],
    details: ["Black", "Essential", "One size"]
  },
  {
    id: "baseball-cap",
    name: "Baseball Cap",
    image: "/shop/face cap.jpg",
    backImage: "/shop/spade_baseball_cap.jpg",
    alt: "Black baseball cap with white AACEE logo",
    price: "₦15,000",
    description: "An everyday essential that brings effortless style to any fit. Designed for comfort, versatility and a confident finish to your look.",
    colors: ["Black", "#800020", "Whitesmoke"],
    sizes: ["AACEE", "SPADE"],
    details: ["Black", "AACEE or SPADE ", "Adjustable"]
  },
  {
    id: "polo-regular-fit",
    name: "Polo (Regular Fit)",
    image: "/shop/regular_polo.jpg",
    backImage: "/shop/regular_polo_back.jpg",
    alt: "AACEE regular-fit polo",
    price: "₦25,500",
    description: "A timeless everyday essential designed for effortless comfort and clean style. Easy to wear, easy to pair, always worn with confidence.",
    colors: ["White", "Black", "MediumSeaGreen", "Grey"],
    sizes: ["M", "L", "XL", "XXL"],
    details: ["Regular fit", "White or black", "Sizes M–XXL"]
  },
  {
    id: "muscle-tank",
    name: "Muscle Tank",
    image: "/shop/Muscle tank.jpg",
    backImage: "/shop/muscle_tank_back.jpg",
    alt: "AACEE muscle tank",
    price: "₦13,500",
    description: "A clean, relaxed staple for warm days, gym sessions and active lifestyles. Designed for effortless comfort, finished with a style that speaks confidence.",
    colors: ["Black", "Grey"],
    sizes: ["M", "L", "XL", "XXL"],
    details: ["Black", "Lifestyle", "Sizes M–XXL"]
  },
  {
    id: "gym-shorts",
    name: "Gym Shorts",
    image: "/shop/GYM SHORTS.jpg",
    backImage: "/shop/gym_shorts_back.jpg",
    alt: "Black AACEE gym shorts",
    price: "₦17,500",
    description: "Made for movement and built for comfort. From intense workouts to everyday wear, enjoy effortless performance with a clean, athletic style.",
    colors: ["Black", "Grey"],
    sizes: ["Standard"],
    details: ["Black", "Comfort", "Standard size"]
  },
  {
    id: "hoodie",
    name: "Hoodie",
    image: "/shop/hoodie.jpg",
    backImage: "/shop/hoodie_back.jpg",
    alt: "Black AACEE hoodie with logo detail",
    price: "₦45,000",
    description: "A perfect blend of comfort and effortless style. Designed for everyday wear, with a relaxed feel and a clean look that makes a statement wherever you go. Wear your confidence with AACEE.",
    colors: ["Black", "Whitesmoke", "Grey"],
    sizes: ["M", "L", "XL", "XXL"],
    details: ["White or black", "AACEE logo print", "Sizes M–XXL"]
  }
];

var orderForm = document.getElementById("orderForm");

if (orderForm) {
  var orderParams = new URLSearchParams(window.location.search);
  var selectedItem = orderParams.get("item");
  var selectedSize = orderParams.get("size");
  var itemSelect = orderForm.elements.namedItem("item");
  var sizeInput = orderForm.elements.namedItem("size");

  if (selectedItem && itemSelect) {
    itemSelect.value = selectedItem;
  }
  if (selectedSize && sizeInput) {
    sizeInput.value = selectedSize;
  }

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(orderForm);
    fetch(FORMSPREE_URL, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" },
      keepalive: true
    }).catch(function (error) {
      console.error("Unable to submit the order form.", error);
    });

    var lines = [
      "Hi, I'd like to order merch.",
      "Name: " + formData.get("name"),
      "Item: " + formData.get("item"),
      "Size/colour: " + (formData.get("size") || "-"),
      "Quantity: " + formData.get("qty"),
      "Location: " + formData.get("place")
    ];

    if (formData.get("extra")) {
      lines.push("Note: " + formData.get("extra"));
    }

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
}

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
