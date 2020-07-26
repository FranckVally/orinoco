//Chargement quantité de produit à coté du panier (TotalQt)
function chargementPanier() {
  let nombreProduit = localStorage.getItem('quanti');
  
  if (nombreProduit) {
    document.querySelector('.totalQt').textContent = nombreProduit;
  } else {
    document.querySelector('.totalQt').textContent = 0;
  }
}

chargementPanier();

//Mise a jour quantité de produit à coté du panier en plus
function nombreProduit() {
  let nombreProduit = localStorage.getItem('quanti');
  nombreProduit = parseInt(nombreProduit);

  if (nombreProduit) {
    localStorage.setItem("quanti", nombreProduit +  1);
    document.querySelector('.totalQt').textContent = nombreProduit + 1;
  } else {
    localStorage.setItem("quanti", 1);
    document.querySelector('.totalQt').textContent = 1;
  }
}

//Mise a jour quantité de produit à coté du panier en moins
function produitsEnMoins() {
  let nombreProduit = localStorage.getItem('quanti');
  nombreProduit = parseInt(nombreProduit);

  if (nombreProduit) {
    localStorage.setItem("quanti", nombreProduit - 1);
    document.querySelector('.totalQt').textContent = nombreProduit - 1;
  } else {
    localStorage.setItem("quanti", 1);
    document.querySelector('.totalQt').textContent = 1;
  }
}



const cart = document.querySelector("#cart"); // Récupère la section du panier
const cartTotal = document.getElementById("cart-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  products: [],
};

/* Stock le prix total */
let totalPrice = 0;

// Affiche le/les produit(s) du panier.
const displayCart = async () => {
  const cartItems = JSON.parse(localStorage.getItem("panier"));
  if (Object.keys(cartItems).length > 0) {  // si le tableau est vide
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      // Pour chaque article du panier
      const itemId = Object.keys(cartItems)[i];
      const product = await getItem(itemId); // Récupère les informations du produit
      const camId = product._id; // Stocke l'id du produit
      const camName = product.name; // Stocke le nom du produit
      const camPrice = product.price / 100; // Stocke le prix du produit
      const camImg = product.imageUrl; // Stocke l'image du produit
      const camQuantity = cartItems[itemId].quantity; //Quantité de camera acheté
      cartInformation.products.push(camId); // Envoie l'id du produit au tableau products de cartInformation
      renderCart(camName, camPrice, camImg, camQuantity); // Fourni l'affichage du/des produits du panier

      const remove = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];
      const moins = document.querySelectorAll(".moins")[i];
      const plus = document.querySelectorAll(".plus")[i];

      deleteCart(remove, article, itemId);
      decrementItem(moins, article, itemId, ); // appel de la fonction décrémentation avec le bouton moins
      incrementItem(plus, article, itemId); // appel de la fonction incrémentation avec le bouton plus
    }
  } else {
   
    cart.innerHTML =`<div id=paniervide> votre panier est vide</div>`;
    form.classList.add("invisible");
  }
};
// Récupère élément dans localStorage
const getItem = async (productId) => {
  const response = await fetch(
    "http://localhost:3000/api/cameras/" + productId
  );
  return await response.json();
};
// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl, productQuantity) => {
  /* Affiche article(s) du panier */
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${imgUrl}">
    <div class="product-information>
        <p class="product-title">${productName}</p>
        <p class="price">${productPrice} €</p>
    </div>
    <p class="quantity"><button class="moins"> - </button>${productQuantity}<button class="plus"> + </button>
   <button class="remove">supprimer</button></p>`;
  cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
  totalPrice += productPrice * productQuantity; /* Implémente prix */
  cartTotal.textContent = `Total : ${totalPrice} €`; /* Affiche le prix total */

};

//Mise a jour quantité de produit à coté du panier a Zero
function produitSupprimer() {
  
  let nombreProduit = localStorage.getItem('quanti');
  nombreProduit = parseInt(nombreProduit);

  if (nombreProduit) {
    localStorage.setItem("quanti", nombreProduit - nombreProduit);
    document.querySelector('.totalQt').textContent = nombreProduit;
  } else {
    localStorage.setItem("quanti", 1);
    document.querySelector('.totalQt').textContent = nombreProduit;
  }
}

/* Supprime élément du panier sur un clique*/
const deleteCart = (removeElt, container, productId) => {
  removeElt.addEventListener("click", async () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    
    function deletProduits() {
      let nombreProduit = localStorage.getItem('quanti');
      nombreProduit = parseInt(nombreProduit);
    
      if (nombreProduit) {
        localStorage.setItem("quanti", nombreProduit - panier[productId].quantity );
        document.querySelector('.totalQt').textContent = nombreProduit - panier[productId].quantity ;
      } else {
        localStorage.setItem("quanti", 1);
        document.querySelector('.totalQt').textContent = 12 ;
      }
    }
    deletProduits()
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {

      console.log(document.querySelector('.totalQt').textContent);
      console.log (panier[productId]);
      console.log(panier);
      console.log(panier.quantity);
      console.log (panier[productId].quantity);
      
      

    }
    localStorage.setItem("panier", JSON.stringify(panier));

    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true); /* Actualise la page dynamiquement */
    
    
    });
};

// décrémente et enlève un produit au panier avec bouton moins

const decrementItem = (moins, container, productId) => {
  moins.addEventListener("click", () => {
    
    produitsEnMoins()
    
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity > 1) {
      panier[productId].quantity--;
     
    } else {
      delete panier[productId]; 
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};

// incremente et rajoute un produit au panier avec bouton plus

const incrementItem = (plus, container, productId) => {
  plus.addEventListener("click", () => {
    nombreProduit()
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity >= 1) {
      panier[productId].quantity++;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
    
  });
};

displayCart();

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;
const regcodePostal =/[0-9]{5}/g;

const isNotEmpty = (value) => (value !== "" ? true : false); // Vérifie que la valeur donnée ne soit pas vide
const isLongEnough = (value) => (value.length >= 2 ? true : false); // Vérifie que la valeur donnée ait assez de caractère
const doNotContainNumber = (value) =>
  !value.match(containNumber) ? true : false; // Vérifie que la valeur donnée ne possède pas de chiffre
const doNotContainSpecialCharacter = (value) =>
  !value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole
const isValidEmail = (value) => (value.match(regexEmail) ? true : false); // Vérifie que la valeur donnée soit bien dans le format email
const isValidCodePostal = (value) => (value.match(regcodePostal) ? true : false); // Vérifie que la valeur donnée soit bien dans le format code postal

const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value); // renvoie true si toutes les conditions sont vérifiées


// Récupère les éléments du formulaire
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const codePostal = form.elements.codePostal;
const email = form.elements.email;
const btn = document.getElementById("btn");

const firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
const addressErrorMessage = document.getElementById("addressErrorMessage");
const cityErrorMessage = document.getElementById("cityErrorMessage");
const codePostalErrorMessage = document.getElementById("codePostalErrorMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage");

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
  if (isValidInput(firstName.value)) {
    firstNameErrorMessage.textContent = "";

    if (isValidInput(lastName.value)) {
      lastNameErrorMessage.textContent = "";

      if (isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

        if (isValidInput(city.value)) {
          cityErrorMessage.textContent = "";

          if (isValidCodePostal(codePostal.value)) {
            codePostalErrorMessage.textContent = "";

            if (isValidEmail(email.value)) {
              emailErrorMessage.textContent = "";

              return (cartInformation.contact = {
                // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                codePostal: codePostal.value,
                email: email.value,
              });
            } else {
              emailErrorMessage.textContent =
                "Merci de renseigner votre adresse mail !";
              email.focus();
              return false;
            }
          } else {
            codePostalErrorMessage.textContent =
              "Merci de renseigner votre code postal !";
            codePostal.focus();
            return false;
          }
        } else {
          cityErrorMessage.textContent = "Merci de renseigner votre ville !";
          city.focus();
          return false;
        }
      } else {
        addressErrorMessage.textContent = "Merci de renseigner votre adresse !";
        address.focus();
        return false;
      }
    } else {
      lastNameErrorMessage.textContent = " Merci de renseigner votre nom !";
      lastName.focus();
      return false;
    }
  } else {
    firstNameErrorMessage.textContent = "Merci de renseigner votre prénom !";
    firstName.focus();
    return false;
  }
};
// Envoie données à l'api
const postData = async (method, url, dataElt) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(dataElt),
  });
  return await response.json();
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const validForm = formValidate(); // Valide le formulaire
  if (validForm !== false) {
    const response = await postData(
      "POST",
      "http://localhost:3000/api/cameras/order",
      cartInformation
    ); // Envoie données au serveur
    window.location = `./confirmationcommande.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Redirige vers la page de confirmation de commande
    localStorage.removeItem("panier");
  }
});

if (!localStorage.getItem("panier")) {
  // vérifie que la localstorage est vide, si il est vide on cache le formulaire et on insère le texte
  cart.textContent = "Votre panier est vide.";
  form.classList.add("invisible");
}
