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
    <br>
`;
  etsyEl.innerHTML = etsyInnerHTML;
  rightContainer.appendChild(etsyEl);
}

async function getPokemonResults(pokemon) {
  const url = `http://localhost:3000/api/v1/etsy/${pokemon}`;
  const res = await fetch(url);
  const pokemonData = await res.json();
  console.log(pokemonData);
  for (let i = 0; i < pokemonData.results.length; i++) {
    createEtsyCard(pokemonData.results[i]);
  }
}
async function changePokemonResults(pokemon, query) {
  let etsyDiv = document.getElementById("etsyDiv");
  etsyDiv.innerHTML = "";
  console.log(query);
  const url = `http://localhost:3000/api/v1/etsy/${pokemon}&sort_on=${query}`;
  const res = await fetch(url);
  const pokemonData = await res.json();
  console.log(pokemonData);

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

getUrl();
// getPokemonResults(document.getElementById('pokeh1').innerText);
