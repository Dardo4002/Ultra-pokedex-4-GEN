$(document).ready(function(){

    fetch("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0")
        .then(function(response){
            return response.json();
            
        }
            
        )
        .then(function(result){
            console.log(result);
            let pokeList = result.results;
            pokeList.forEach(function(pokemon){
                // Aquí lanzaríamos un fetch por cada pokemon.
                fetchPokemonData(pokemon)
            })
        })
        .catch(function(err){

            console.log(err);
            
        });
        
        // array de pokemon aordenados
        let sortedPokemon = [];



        // Funcion que pide a la api los datos de un pokemon y los ordena en un array

        function fetchPokemonData(pokemon){
            let urlPokemon = pokemon.url;

            fetch(urlPokemon)
            .then(function(response){
                return response.json();
                
            })
            .then(function(pokemonDetails){
                
                //Insertamos el primer pokemon y sus datos en el array sortedPokemon

                sortedPokemon.push(pokemonDetails)

                sortedPokemon.sort(function(a,b){
                    return a.id - b.id; // ordenar por Id en orden ascendente

                    
                })
                renderPokemonCard();

            })
            .then(function(){
                console.log(sortedPokemon);
                
            })

            .catch(function(err){
                console.log(err);
                
            })

        }

        // Funcion para renderizar los datos de cada pokemon en un card
        // Esta función recorrerá el array sortedPokemon

        function renderPokemonCard(){
            $("#poke-cont").empty();
            sortedPokemon.forEach(function(pokemonDetails){
                let pokemonName = pokemonDetails.name
                let pokemonFirstLet = pokemonName.slice(0,1).toUpperCase();
                let pokemonRest = pokemonName.slice(1,pokemonName.length);
                const types = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
                let pokeHTML;
                if (types[1] === undefined){
                    pokeHTML = `<div class="card type-${types[0]}" style="width: 18rem;">
                                      <img src="${pokemonDetails.sprites.front_default

                                      }" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${pokemonFirstLet + pokemonRest}</h5>
                                        <p class="card-text">${pokemonDetails.id}</p>
                                        <h5 class="card-title">${types[0]}</h5>
                                         <a href="#" class="btn btn-primary">Go somewhere</a>
                                         </div>
                                </div>`;
                }
                else{
                    pokeHTML = `<div class="card type-${types[0]} type-${types[1]}" style="width: 18rem;">
                                      <img src="${pokemonDetails.sprites.front_default

                                      }" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${pokemonFirstLet + pokemonRest}</h5>
                                        <p class="card-text">${pokemonDetails.id}</p>
                                        <h5 class="card-title">${types[0] + "/" + types[1]}</h5>
                                         <a href="#" class="btn btn-primary">Go somewhere</a>
                                         </div>
                                </div>`;
                }
                

                $("#poke-cont").append(pokeHTML);

            })


        }
})