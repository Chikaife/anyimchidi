var params = new URLSearchParams(window.location.search);
var product = window.AACEE_PRODUCTS.find(function (item) {
  return item.id === params.get("item");
});

var productPage = document.getElementById("productPage");

if (product) {
  var productImage = document.getElementById("productImage");
  var productStage = document.getElementById("productStage");
  var placeholder = document.getElementById("galleryPlaceholder");
  var placeholderAngle = document.getElementById("placeholderAngle");
  var activeColour = product.colors[0];
  var activeSize = product.sizes[0];
  var galleryViews = document.querySelectorAll(".gallery-view");

  document.title = product.name + " | AACEE";
  document.querySelector('meta[name="description"]').content =
    product.description + " Discover the AACEE collection.";
  document.getElementById("breadcrumbName").textContent = product.name;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productMeta").textContent = product.details.join(" · ");
  document.getElementById("productPrice").textContent = product.price;
  document.getElementById("productDescription").textContent = product.description;
  galleryViews.forEach(function (view) {
    var isFront = view.dataset.view === "front";
    var image = isFront ? product.image : product.backImage;
    var thumbnail = view.querySelector(".view-image");

    if (image) {
      thumbnail.style.backgroundImage = 'url("' + image + '")';
      thumbnail.classList.remove("view-placeholder");
    } else {
      thumbnail.classList.add("view-placeholder");
    }
  });

  function showGalleryView(view) {
    var isFront = view.dataset.view === "front";
    var image = isFront ? product.image : product.backImage;

    if (image) {
      productImage.src = image;
      productImage.alt = product.alt + (isFront ? " — front view" : " — back view");
      productImage.hidden = false;
      placeholder.hidden = true;
      productStage.classList.remove("is-placeholder");
    } else {
      productImage.hidden = true;
      placeholder.hidden = false;
      productStage.classList.add("is-placeholder");
      placeholderAngle.textContent = "Back view";
    }

    galleryViews.forEach(function (button) {
      var isActive = button === view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  productImage.src = product.image;
  productImage.alt = product.alt + " — front view";

  function updateOrderLink() {
    var selected = new URLSearchParams();
    selected.set("item", product.name);
    selected.set("size", activeSize + ", " + activeColour);
    document.getElementById("orderLink").href = "shop.html?" + selected.toString() + "#order";
  }

  product.colors.forEach(function (colour, index) {
    var button = document.createElement("button");
    button.className = "colour-swatch";
    button.type = "button";
    button.title = colour;
    button.setAttribute("aria-label", colour);
    button.setAttribute("aria-pressed", String(index === 0));
    button.style.setProperty("--swatch-color", colour.toLowerCase());
    if (colour === "White") {
      button.classList.add("is-light");
    }
    button.addEventListener("click", function () {
      activeColour = colour;
      document.getElementById("selectedColour").textContent = colour;
      document.querySelectorAll(".colour-swatch").forEach(function (swatch) {
        swatch.setAttribute("aria-pressed", String(swatch === button));
      });
      updateOrderLink();
    });
    document.getElementById("colourOptions").appendChild(button);
  });

  product.sizes.forEach(function (size, index) {
    var button = document.createElement("button");
    button.className = "size-choice";
    button.type = "button";
    button.textContent = size;
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", function () {
      activeSize = size;
      document.querySelectorAll(".size-choice").forEach(function (choice) {
        choice.setAttribute("aria-pressed", String(choice === button));
      });
      updateOrderLink();
    });
    document.getElementById("sizeOptions").appendChild(button);
  });

  document.getElementById("selectedColour").textContent = activeColour;
  product.details.forEach(function (detail) {
    var item = document.createElement("li");
    item.textContent = detail;
    document.getElementById("productDetails").appendChild(item);
  });
  updateOrderLink();

  galleryViews.forEach(function (view) {
    view.addEventListener("click", function () {
      showGalleryView(view);
    });
  });

  var relatedProducts = window.AACEE_PRODUCTS.filter(function (item) {
    return item.id !== product.id;
  }).slice(0, 3);
  relatedProducts.forEach(function (item) {
    var link = document.createElement("a");
    link.className = "item";
    link.href = "product.html?item=" + encodeURIComponent(item.id);
    link.setAttribute("aria-label", "Discover " + item.name);

    var picture = document.createElement("div");
    picture.className = "pic";
    var image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";
    picture.appendChild(image);

    var name = document.createElement("h3");
    name.textContent = item.name;
    var meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = item.details.join(" · ");
    var price = document.createElement("p");
    price.className = "price";
    price.textContent = item.price;
    var discover = document.createElement("span");
    discover.className = "discover";
    discover.append("Discover the piece ");
    var arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    discover.appendChild(arrow);

    link.append(picture, name, meta, price, discover);
    document.getElementById("relatedProducts").appendChild(link);
  });
} else {
  productPage.innerHTML =
    '<section class="product-missing"><p class="eyebrow">AACEE · THE COLLECTION</p>' +
    '<h1>This piece is not in the collection.</h1>' +
    '<p>Explore the collection to find your next everyday essential.</p>' +
    '<a class="btn" href="/shop">Discover the collection <span aria-hidden="true">→</span></a></section>';
}
