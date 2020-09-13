const getPokemon = async (id) => {
  const url = `http://localhost:3000/api/v1/pokemon/${id}`;
  const res = await fetch(url);
  const cachedData = await res.json();
  // console.log(cachedData);
  FillInfo(cachedData);
};
function FillInfo(pokemon) {
  const poke_container = document.getElementById("pokemonInfo");
  const pokemonEl = document.createElement("div");

  /**
   * Add h1 with pokemon name
   * display picture of the pokemon
   */
  pokemonEl.classList.add("pokemon");
  pokemonEl.id = `${pokemon.name}`;

  // console.log(pokemon);
  const pokeInnerHTML = `
        <div class="img-container"><img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemonEl.id}" />
        </div>
        <div id="info" class="info">
        <p id="pokeInfo"></p
        </div>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
  appendInfo(pokemon);
}
function appendInfo(pokemon) {
  const pokeInfo = document.getElementById("info");
  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const infoInnerHtml = `
    <p><b>Name</b>: ${pokemonName}</p>
    <p><b>#</b>: ${pokemon.id}</p>
    <p><b>Height</b>: ${pokemon.height}</p>
    <p><b>Weight</b>: ${pokemon.weight}</p>
    <p><b>Base Experience</b>: ${pokemon.base_experience}</p>
    
    <br>
    <p><b>Starting stats</b>:</p>
    <table>
    <tr>
    <td>Health points: </td>
    <td>${pokemon.stats[0].base_stat}</td>
    </tr>
    <tr>
    <td>Attack: </td>
    <td>${pokemon.stats[1].base_stat}</td>
    </tr>
    <tr>
    <td>Defence: </td>
    <td>${pokemon.stats[2].base_stat}</td>
    </tr>
    <tr>
    <td>Special Attack: </td>
    <td>${pokemon.stats[3].base_stat}</td>
    </tr>
    <tr>
    <td>Special Defence: </td>
    <td>${pokemon.stats[4].base_stat}</td>
    </tr>
    <tr>
    <td>Speed:</td>
    <td>${pokemon.stats[5].base_stat}</td>
    </tr>
    </table>
    <p><b>Games found in</b>: ${pokemon.name}</p>
    
    <br>
    <div class="grid-container">
    <p><b>Back Default</b>:</p>
    <p><b>Back Shiny</b>:</p>
    <img class="smallImage grid-item" src='${pokemon.sprites.back_default} '></img>
    <img class="smallImage grid-item" src='${pokemon.sprites.back_shiny}'></img>
    <p><b>Front Default</b>:</p>
    <p><b>Front Shiny</b>:</p>
    <img class="smallImage grid-item" src='${pokemon.sprites.front_default}'></img>
    <img class="smallImage grid-item" src='${pokemon.sprites.front_shiny}'></img>
    </div>
    
    `;
  pokeInfo.innerHTML = infoInnerHtml;
}

window.onload = function () {
  let url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  console.log(data.name);
  
  document.getElementById("pokeh1").innerHTML = data.name[0].toUpperCase() + data.name.slice(1)
  getPokemon(data.name);
};
