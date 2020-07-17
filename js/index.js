// URL de l'api
const url = "http://localhost:3000/api/cameras";

// Affiche les produits
const afficheProducts = async () => {
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);
  });
};

// Récupère toutes les caméras
const getAllCams = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// affichage d'un produit
function renderProduct(productName, productId, productImg, productPrice) {
  const products = document.querySelector("#produits");    // Récupère la div qui contiendra les différents articles
  const article = document.createElement("article");       //  construction de l'élément contenant les carractéristique article
  article.innerHTML = 
    `<a href="produits.html?id=${productId}" style="display:block;width:100%;height:100%;">
    <img alt="${productName}" src="${productImg}">
    <p class="produits-title">${productName}</p>
    <p class="price">${productPrice / 100}</p>
    </a>`;
  products.appendChild(article);
}

afficheProducts();