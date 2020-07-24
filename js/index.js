// URL de l'api
const url = "http://localhost:3000/api/cameras";

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

//Mise a jour quantité de produit à coté du panier
function nombreProduit() {
  let nombreProduit = localStorage.getItem('quanti');
  nombreProduit = parseInt(nombreProduit);

  if (nombreProduit) {
    localStorage.setItem("quanti", nombreProduit + 1);
    document.querySelector('.totalQt').textContent = nombreProduit + 1;
  } else {
    localStorage.setItem("quanti", 1);
    document.querySelector('.totalQt').textContent = 1;
  }
}

// Affiche les produits
const afficheProducts = async () => {
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);
    console.log(products);
  });
};

// Récupère toutes les caméras
const getAllCams = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// affichage d'un produit
function renderProduct(productName, productId, productImg, productPrice) {
  const products = document.querySelector("#produits");                                       // Récupère la div qui contiendra les différents articles.
  const article = document.createElement("article");                                          // création d'une  element HTML artivle.    
  article.innerHTML =                                                                         //  construction de l'élément contenant les carractéristiques des articles.
    `<a href="produits.html?id=${productId}" style="display:block;width:100%;height:100%;">
    <img alt="${productName}" src="${productImg}">
    <p class="produits-title">${productName}</p>
    <p class="price">${productPrice / 100} €</p>
    </a>`;
  products.appendChild(article);                                                              //implentation de article comme enfant de l'elemant HTML ou il est.     
}

afficheProducts();                                                                            //appel de la fonction.