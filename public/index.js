const poke_container = document.getElementById("poke_container");
let pokemons_number = 0;
let pokemon_offset = 0;
let baseURL;
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
let perPage = document.getElementById("perPage");
let nextPage = document.getElementById("nextPage");

function splitURL(){
  let url = document.location.href;
  let lastSlash = url.lastIndexOf('/');
  url = url.slice(0,lastSlash);
  console.log('url is ' +url);
  baseURL = url;
}
/**
 * Function used to determine when the amount of objects to display per page has been changed
 * Being uncomfortable with pure javascript I am reloading the page and adding query parameters
 */
perPage.addEventListener("change", () => {
  pokemons_number = document.getElementById("perPage").value;
  console.log(baseURL);
  window.open(`${baseURL}?perPage=${pokemons_number}`, "_self");
});

/**
 * Function used to determine when the next page button has been clicked to display next x amound of pokemon
 * Being uncomfortable with pure javascript I am reloading the page and adding query parameters
 */
nextPage.addEventListener("click", () => {
  pokemon_offset = pokemons_number;
    window.open(
    `${baseURL}?perPage=${pokemons_number}&offset=${pokemon_offset}`,
    "_self"
  );
});

/**
 * Reading the url and checking for any additional parameters
 */
function checkUrlParams() {
  try {
    let url = document.location.href,
      params = url.split("?")[1].split("&"),
      data = {},
      tmp;
    for (var i = 0, l = params.length; i < l; i++) {
      tmp = params[i].split("=");
      data[tmp[0]] = tmp[1];
    }
    pokemons_number = parseInt(data.perPage);
    if (data.offset >= 0) {
      pokemon_offset = parseInt(data.offset);
    }
  } catch (error) {
    pokemons_number = 15;
  }
}

/**
 * Function to send off specific pokemon id's to retrieve all of that pokemons information and store it in the backend cache for later use
 * in case the person clicks on that pokemon to display their information
 */
const fetchPokemons = async () => {
  if (pokemon_offset != 0) {
    numberOffset = pokemons_number + pokemon_offset;
    for (let i = pokemon_offset; i <= numberOffset; i++) {
      await getPokemon(i);
    }
  } else {
    for (let i = 1; i <= pokemons_number; i++) {
      await getPokemon(i);
    }
  }
};
/**
 * Function that connects to my backend server and serves up pokemon information
 * @param {*} id - pokemon number id
 */
const getPokemon = async (id) => {
  console.log(baseURL);
  const url = `${baseURL}/api/v1/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

/**
 * function to create the visual pokemon cards
 * @param {*} pokemon - pokemon information
 */
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
/**
 * Function that determines what pokemon has been selected and adds that query to the url of the
 * next page to be displayed
 * @param {*} target 
 */
function OpenNewWindow(target) {
  if (target.localName == "div") {
    window.open(
      `${baseURL}/pokemon/pokemon.html?name=${target.id}`,
      "_self"
    );
  }
}
/**
 * Function to determine what has been clicked on to open a new page
 */
document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    OpenNewWindow(target);
  },
  false
);

checkUrlParams();
splitURL();
fetchPokemons();
