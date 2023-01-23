const container = document.querySelector("#main-container");
let pokemonCount = 649;

function getPokemonCount() {
  // Loop through each pokemon up to pokemonCount variable
  for (let i = 494; i <= pokemonCount; i++) {
     getPokemonId(i);
  }
}

// Fetches each pokemon based on id number
async function getPokemonId(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPokemon(data);
  console.log(data);
}

function displayPokemon(pokemon) {
  // Create card for each pokemon
  const card = document.createElement("div");
  card.classList.add('card');
  const sprite = document.createElement("img");
  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add('sprite-container');
  const name = document.createElement("h3");
  const index = document.createElement("span");
  index.classList.add('index');
  const typesDiv = document.createElement("div");
  typesDiv.classList.add('types-div');
  const typesHeader = document.createElement("h4");
  const type1 = document.createElement("span");
  const type2 = document.createElement("span");

  // Set image src for each pokemon
  sprite.setAttribute("src", pokemon.sprites.front_default);
  sprite.setAttribute("alt", `${pokemon.species.name} Sprite`);
  index.innerHTML = ` No. ${pokemon.id}`;
  spriteContainer.appendChild(sprite);

  // Display name of pokemone with first letter capitalized
  name.innerHTML = `${pokemon.species.name.toLowerCase().split(" ")
  .map((a) => a.charAt(0).toUpperCase() + a.substring(1)).join(" ")}`;

  // Append name, sprite, and index number to card
  card.append(spriteContainer);
  card.append(name);
  card.append(index);

  // Show whether or not a pokemon has 1 or multiple types and append to card
  for (let i = 0; i <= pokemon.types.length; i++) {
    typesHeader.innerHTML = "Type(s):";
    typesDiv.appendChild(typesHeader);

    // Find if Pokemon has 1 or 2 types and display type(s) with first letter capitalized
    if (pokemon.types.length === 2) {
      type1.innerHTML = `${pokemon.types[0].type.name.toLowerCase()
        .split(" ")
        .map((a) => a.charAt(0).toUpperCase() + a.substring(1))
        .join(" ")} `;
      type2.innerHTML = `| ${pokemon.types[1].type.name.toLowerCase()
        .split(" ")
        .map((a) => a.charAt(0).toUpperCase() + a.substring(1))
        .join(" ")}`;

      typesDiv.appendChild(type1);
      typesDiv.appendChild(type2);
      card.appendChild(typesDiv)
    }
    if (pokemon.types.length === 1){
      type1.innerHTML = `${pokemon.types[0].type.name.toLowerCase()
        .split(" ")
        .map((a) => a.charAt(0).toUpperCase() + a.substring(1))
        .join(" ")}`;

      typesDiv.appendChild(type1);
      card.appendChild(typesDiv);
    }
  }

  // Append card and all its children to the main container
  container.appendChild(card);
}

getPokemonCount();