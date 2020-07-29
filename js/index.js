// URL de l'api
const url = "http://localhost:3000/api/cameras";


//Chargement quantité de produit à coté du panier (TotalQt)
function chargementPanier() {                            // création d'une fonction appellé chargenentPanier //
  let nombreProduit = localStorage.getItem('quanti');   // déclaration varriable nombreProduit et chargemant dans le cache navigateur//
  console.log(nombreProduit)
  
  document.querySelector('.totalQt').textContent = 0                             
  
  if (nombreProduit) {
    document.querySelector('.totalQt').textContent = nombreProduit;  // ecrire la valeur nombreProduit si présente dans l'element HTML .TotalQt //
  } else {
    document.querySelector('.totalQt').textContent = 0;             // Sinon innscrie 0 dans l'element HTML .TotalQt //
   console.log(nombreProduit) //affiche dans la consol le nombre de produit en pannier // 
  }
}

chargementPanier();   //execute la fonction

// Affiche les produits
const afficheProducts = async () => {                   // fonction pour faire un tableau contemant par produits provenant de la BDD //
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);  //nom des carractéristiques //
    console.log(products);
  });
};

// Récupère toutes les caméras
const getAllCams = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// affichage d'un produit
function renderProduct(productName, productId, productImg, productPrice) {                    // fonction pour fabriquer le rendu avec les carractéristiques produits //
  const products = document.querySelector("#produits");                                       // Récupère la div qui contiendra les différents articles.
  const article = document.createElement("article");                                          // création d'une  element HTML artice.    
  article.innerHTML =                                                                         //  construction de l'élément contenant les carractéristiques des articles.
    `<a href="produits.html?id=${productId}" style="display:block;width:100%;height:100%;">
    <img alt="${productName}" src="${productImg}">
    <p class="produits-title">${productName}</p>
    <p class="price">${productPrice / 100} €</p>
    </a>`;
  products.appendChild(article);                                                              //implentation de article comme enfant de l'elemant HTML ou il est.     
}

afficheProducts();                                                                            //appel de la fonction.