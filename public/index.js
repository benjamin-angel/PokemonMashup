const poke_container = document.getElementById("poke_container");
const pokemons_number = 10;
const colors = {
  normal: "#a8a878",
  fire: "#f08030",
  fighting: "#c03028",
  water: "#6890f0",
  flying: "#a890f0",
  grass: "#78c850",
  poison: "#a040a0",
  electric: "#f8d030",
  ground: "#e0c068",
  psychic: "#f85888",
  rock: "#b8a038",
  ice: "#98d8d8",
  bug: "#a8b820",
  dragon: "#7038f8",
  ghost: "#705898",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
  "???": "#68a090",
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `http://localhost:3000/api/v1/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  pokemonEl.id = `${pokemon.name}`;

  let pokemonId = pokemon.id;
  // const poke_types = pokemon.types.map(type => type.type.name);
  const type = pokemon.types[0].type.name;
  let type2 = "";
  if (pokemon.types[1] != undefined) {
    type2 = pokemon.types[1].type.name;
  }
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  let color;
  if (type == "normal" && type2 != undefined) {
    color = colors[type2];
  } else {
    color = colors[type];
  }
  pokemonEl.style.backgroundColor = color;

  if (pokemonId < 10) {
    pokemonId = `00${pokemonId}`.toString();
  } else if (pokemonId < 100) {
    pokemonId = `0${pokemonId}`.toString();
  }

  if (type2 != "") {
    type2 = `/${type2}`;
  }
  const pokeInnerHTML = `
        <div class="img-container"><img src="https://pokeres.bastionbot.org/images/pokemon/${
          pokemon.id
        }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}${type2}</span></small>
        </div>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
}

const searchBar = document.getElementById("searchTerm");
searchBar.addEventListener("keyup", (e) => {
  // console.log(searchBar.innerText);
  // console.log(searchBar.value);
  console.log(searchBar.value);
  const pokemonCards = document.getElementsByClassName("name");
  let searchVal = new RegExp("(" + searchBar.value + ")+", "img");
  console.log(searchVal);
  console.log(searchVal.test("Bulbasaur") + "Bulbasaur");
  console.log(searchVal.test("Ivysaur") + "Ivysaur");
  console.log(searchVal.test("Charmander") + "Charmander");
  console.log(searchVal.test("Ekans") + "Ekans");
  console.log(searchVal.test("Rayquaza") + "Rayquaza");
  console.log(searchVal.test("Benjamin") + "Benjamin");

  for (let i = 0; i <= pokemonCards.length; i++) {
    //if(searchVal.)
    // if(pokemonCards.item(i).innerHTML == searchVal){
    // 	console.log("Found it");
    // 	console.log(pokemonCards.item(i).innerHTML);
    // 	break;
    // }
    // else{
    // 	console.log("Didn't find it");
    // }
  }

  // if(searchBar.value == pokemonCards.innerHTML)
  // {
  // 	console.log(pokemonCards.value);
  // }
  // else{
  // 	console.log(searchBar.value);
  // 	console.log('false', pokemonCards);
  // }
});
function OpenNewWindow(pokemon)
{
  window.open("file:///D:/Uni/Cab432-CloudComputing/Assignment1-Express/public/pokemon/pokemon.html", "_self");
}
document.addEventListener("click", function(e){
  e = e || window.event;
  let target = e.target || e.srcElement, text = target.textContent || target.innerText;
  console.log(e);
  console.log(e.target.id);
  OpenNewWindow(e.target.id);
},false);
  
fetchPokemons();
