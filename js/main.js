const pokemonsOL = document.querySelector('.pokemons');
const loadMoreButton = document.querySelector('#loadMore');
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => pokemonsOL.innerHTML += pokemonList.map((pokemon) => {
        return `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name show-info-name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>
                <img class="show-info-img" src="${pokemon.photo}" alt="${pokemon.name}" onclick="showPokemonInfo(${JSON.stringify(pokemon.number)})">
            </div>
        </li>`
    }).join(''))
    .catch((error) => console.log(error))
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    let qtdRecordNextPage = offset + limit;
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        return
    }else{
        loadPokemonItens(offset, limit);
    }
})

function showPokemonInfo(pokemonNumber){
    console.log('=====');
    console.log(pokemonNumber)
}