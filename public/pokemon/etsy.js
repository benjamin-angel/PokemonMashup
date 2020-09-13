let currentPokemon;

let submitButton = document.getElementById("submitSort");
submitButton.onclick = () => {
  let selectionValue = document.getElementById("sortOrder").value;
  changePokemonResults(currentPokemon, selectionValue);
};

function createEtsyCard(etsyListing) {
  let item = etsyListing;
  const rightContainer = document.getElementById("etsyDiv");
  const etsyEl = document.createElement("div");
  etsyEl.classList.add("etsy");
  const etsyInnerHTML = `
    <div class="etsy-img-container"><img src="${item.Images[0].url_75x75}"/>
    
    </div>
    <div class="etsy-info">
    <p>${item.title}</p>
    <p>${item.price}${item.currency_code}</p>
    </div>
    <a href="${item.url}"></a>
`;
  etsyEl.innerHTML = etsyInnerHTML;
  rightContainer.appendChild(etsyEl);
}

async function getPokemonResults(pokemon) {
  const url = `http://localhost:3000/api/v1/etsy/${pokemon}`;
  const res = await fetch(url);
  const pokemonData = await res.json();
  for (let i = 0; i < pokemonData.results.length; i++) {
    createEtsyCard(pokemonData.results[i]);
  }
}
async function changePokemonResults(pokemon, query) {
  let etsyDiv = document.getElementById("etsyDiv");
  etsyDiv.innerHTML = "";
  const url = `http://localhost:3000/api/v1/etsy/${pokemon}&sort_on=${query}`;
  const res = await fetch(url);
  const pokemonData = await res.json();

  for (let i = 0; i < pokemonData.results.length; i++) {
    createEtsyCard(pokemonData.results[i]);
  }
}
function getUrl() {
  let url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  currentPokemon = data.name;
  getPokemonResults(data.name);
}
function OpenNewWindow(target){
  if(target.className == "etsy" ){
    window.open(
      `${target.children[2].href}`);
  }else if(target.className == "etsy-info"){
    window.open(
      `${target.parentElement.children[2].href}`);
  }
}

document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    OpenNewWindow(target);
  },
  false
);

getUrl();