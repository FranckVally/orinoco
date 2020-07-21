// URL de l'api
const url = "http://localhost:3000/api/cameras/";
// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const article = document.querySelector("article");

// Affiche le produit
const displayProduits = async () => {
  const data = await getOneCams(url, id);
  renderCams(data);
  customizeYourCamera(article, data.lenses);
  addToCart(article, data);
};
// Récupère une caméra
const getOneCams = async (produitsUrl, produitsId) => {
  const response = await fetch(produitsUrl + produitsId);
  return await response.json();
};
// Fourni l'affichage selon les données du produit
const renderCams = (produitsData) => {
  article.innerHTML = `
    <div class="fiche-produits">
        <img src="${produitsData.imageUrl}" alt="${produitsData.name}">
        <div class="produits-information">
            <h2 class="produits-title">${produitsData.name}</h2>
            <p class="price">${produitsData.price / 100} €</p>
        </div>
    </div>`;
};

// Personnalise le produit
const customizeYourCamera = (parentElt, produitsLenses) => {
  // Crée liste déroulante
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.setAttribute("for", "lenses-list");
  label.textContent = "Lentilles disponibles : ";
  select.id = "lenses-list";
  
  parentElt.appendChild(label).appendChild(select);

  // Crée une balise option pour chaque lentille
  produitsLenses.forEach((produitsLense) => {
    const option = document.createElement("option");
    option.value = produitsLense;
    option.textContent = produitsLense.toUpperCase();
    select.appendChild(option);
  });
  // Récupère la lentille choisie dans la console
  select.addEventListener("change", (e) => {
    lenseChosen = e.target.value.toLowerCase();
  });
};
// // Ajoute le produit au panier
const addToCart = (parentElt, produitsData) => {
  // Crée le bouton d'envoie du produit
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Ajouter au panier";
  div.classList.add("add-to-cart");
  parentElt.appendChild(div).appendChild(btn);

  // Assigne valeur à envoyer à localStorage
  const produits = {
    id: produitsData._id,
    name: produitsData.name,
    price: produitsData.price,
    imageUrl: produitsData.imageUrl,
    quantity: 1,
  };

  // Envoie valeur à localStorage après un clique
  btn.addEventListener("click", () => {
    // récupérer panier localstorage
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
      panier = {};
    }
    // ajouter le produit au panier
    if (panier[produits.id] !== undefined) {
      panier[produits.id].quantity += 1;
    } else {
      panier[produits.id] = produits;
    }
    // update panier localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    btn.classList.add("invisible");
    div.textContent = "Le produit a été ajouté au panier !";
  });
};

displayProduits();
