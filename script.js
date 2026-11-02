const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const pokemonContainer = document.getElementById("pokemonContainer");

const showMessage = (text) => {
    const heading = document.createElement("h2");
    heading.textContent = text;
    pokemonContainer.textContent = "";
    pokemonContainer.appendChild(heading);
};

const fetchPokemon = async (query) => {
    showMessage("Finding Pokemon...");
    try{
        const response = await fetch(apiUrl + encodeURIComponent(query));
        const data = await response.json();
        if (!data) {
            showMessage("No Pokemon found.");
            return;
        }

        pokemonContainer.textContent = "";

        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("foundPokemon");

        const image = document.createElement("img");
        image.src = data.sprites.other['official-artwork'].front_default;

        const title = document.createElement("h3");
        title.textContent = data.name.toUpperCase();

        const number  = document.createElement("p");
        number.textContent = "ID NUMBER: " + data.id;

        const types = document.createElement("p");
        const rawtypes = data.types.map(t => t.type.name);
        types.textContent = rawtypes.join(', ').toUpperCase();

        pokemonDiv.append(image, title, number, types);
        pokemonContainer.appendChild(pokemonDiv);
    } catch (error) {
        showMessage(`Error: ${error.message}`);
    }

};

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        showMessage("What Pokemon are you looking for?");
        return;
    }
    fetchPokemon(searchInput);
});