// Replace with your number: country code + number, digits only (e.g. 2348012345678)
var WHATSAPP_NUMBER = "2348067206105";
var FORMSPREE_URL = "https://formspree.io/f/xoejwjol";

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  var f = new FormData(e.target);
    try{
        fetch(FORMSPREE_URL,{
            method: "POST",
            body: f,
            headers:{"Accept": "application/json"},
            keepalive: true
        }).catch(function(){});
        }catch(err){}

  var lines = [
    "Hi, I'd like to order merch.",
    "Name: " + f.get("name"),
    "Item: " + f.get("item"),
    "Size/colour: " + (f.get("size") || "-"),
    "Quantity: " + f.get("qty"),
    "Location: " + f.get("place")
  ];
  
  if (f.get("extra")) {
    lines.push("Note: " + f.get("extra"));
  }
  
  var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  
  window.open(url, "_blank", "noopener");
});
