// Replace with your number: country code + number, digits only (e.g. 2348012345678)
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
    description: "A laid-back classic, finished with the AACEE logo. Made to bring an easy touch to everyday looks.",
    colors: ["Black"],
    sizes: ["One size"],
    details: ["Black", "White AACEE logo print", "One size"]
  },
  {
    id: "baseball-cap",
    name: "Baseball Cap",
    image: "/shop/face cap.jpg",
    backImage: "/shop/spade_baseball_cap.jpg",
    alt: "Black baseball cap with white AACEE logo",
    price: "₦15,000",
    description: "An everyday essential with a clean finish and a subtle AACEE logo detail.",
    colors: ["Black"],
    sizes: ["One size"],
    details: ["Black", "AACEE or SPADE ", "One size"]
  },
  {
    id: "polo-regular-fit",
    name: "Polo (Regular Fit)",
    image: "/shop/regular_polo.jpg",
    backImage: "/shop/regular_polo_back.jpg",
    alt: "AACEE regular-fit polo",
    price: "₦25,500",
    description: "A simple, easy-to-style polo with the AACEE logo. Choose a classic white or black finish.",
    colors: ["White", "Black"],
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
    description: "A clean, relaxed staple for warm days and active plans, finished with the AACEE logo.",
    colors: ["Black"],
    sizes: ["M", "L", "XL", "XXL"],
    details: ["Black", "AACEE logo print", "Sizes M–XXL"]
  },
  {
    id: "gym-shorts",
    name: "Gym Shorts",
    image: "/shop/GYM SHORTS.jpg",
    backImage: "/shop/gym_shorts_back.jpg",
    alt: "Black AACEE gym shorts",
    price: "₦17,500",
    description: "A versatile black essential with an understated AACEE finish, made for movement and off-duty moments.",
    colors: ["Black"],
    sizes: ["Standard"],
    details: ["Black", "AACEE logo detail", "Standard size"]
  },
  {
    id: "hoodie",
    name: "Hoodie",
    image: "/shop/hoodie.jpg",
    backImage: "/shop/hoodie_back.jpg",
    alt: "Black AACEE hoodie with logo detail",
    price: "₦45,000",
    description: "An everyday layer with a clean silhouette and a considered AACEE logo detail. Available in white or black.",
    colors: ["White", "Black"],
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
