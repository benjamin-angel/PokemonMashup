const poke_container = document.getElementById('poke_container');
const pokemons_number = 80;
const colors = {
	normal: '#a8a878',
	fire: '#f08030',
	fighting: '#c03028',
	water: '#6890f0',
	flying: '#a890f0',
	grass: '#78c850',
	poison: '#a040a0',
	electric: '#f8d030',
	ground: '#e0c068',
	psychic: '#f85888',
	rock: '#b8a038',
	ice: '#98d8d8',
	bug: '#a8b820',
	dragon: '#7038f8',
	ghost: '#705898',
	dark:'#705848',
	steel: '#b8b8d0',
	fairy: '#ee99ac',
	'???': '#68a090'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `http://localhost:3000/api/v1/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	let pokemonId = pokemon.id;
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	if(pokemonId < 10){
		pokemonId = `00${pokemonId}`.toString();
	}
	else if(pokemonId < 100){
		pokemonId = `0${pokemonId}`.toString();
	}
	const pokeInnerHTML = `
        <div class="img-container"><img src="https://pokeres.bastionbot.org/images/pokemon/${
			pokemon.id
		}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

const searchBar = document.getElementById('searchTerm');
searchBar.addEventListener('keyup', e => {
    // console.log(searchBar.innerText);
	// console.log(searchBar.value);
	console.log(searchBar.value);
	const pokemonCards = document.getElementsByClassName('name');
	let searchVal = new RegExp('(' + searchBar.value + ')+','img');
	console.log(searchVal);
	console.log(searchVal.test('Bulbasaur')+ "Bulbasaur");
	console.log(searchVal.test('Ivysaur') + "Ivysaur");
	console.log(searchVal.test('Charmander')+ "Charmander");
	console.log(searchVal.test('Ekans') + "Ekans");
	console.log(searchVal.test('Rayquaza')+ "Rayquaza");
	console.log(searchVal.test('Benjamin') + "Benjamin");
	
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
})


fetchPokemons();