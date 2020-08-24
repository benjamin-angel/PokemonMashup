const poke_container = document.getElementById('poke_container');
const pokemons_number = 20;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
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