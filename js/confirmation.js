const orderInformation = window.location.search.substr(1).split("&");  // donne a orderInformation  la valeur de l' URL ou est la page en commencant par la premier case et s'arrétant au premier & trouve
const orderId = orderInformation[0].replace("id=", "");
const totalPrice = orderInformation[1].replace("price=", "");
const userName = orderInformation[2].replace("user=", "");

console.log((document.querySelector(".user").textContent += " " + userName));
document.querySelector(".order-id").textContent += " " + orderId;
document.querySelector(".price").textContent += " " + totalPrice + " €";



//Mise a jour quantité de produit suprimé
function miseAzeroProduits() {
  let nombreProduit = localStorage.getItem('quanti');
  nombreProduit = parseInt(nombreProduit);

  if (nombreProduit) {
    localStorage.setItem("quanti", nombreProduit = 0 );
    document.querySelector('.totalQt').textContent =  0;
  } else {
    localStorage.setItem("quanti", 0);
    document.querySelector('.totalQt').textContent = 0;
    console.log(nombreProduit)
  }
}
miseAzeroProduits()