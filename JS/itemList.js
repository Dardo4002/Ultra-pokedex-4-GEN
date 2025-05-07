$(document).ready(function(){

    fetch("https://pokeapi.co/api/v2/item/?limit=15&offset=0")
        .then(function(response){
            return response.json();
            
        }
            
        )
        .then(function(result){
            console.log(result);
            let itemList = result.results;
            itemList.forEach(function(item){
                    //Aqui lanzamos un fetch para cada item
                    fetchItemData(item)
            })
        })
        .catch(function(err){

            console.log(err);
            
        });
        
        // array de pokemon aordenados
        let sortedItems = [];



        // Funcion que pide a la api los datos de un pokemon y los ordena en un array

        function fetchItemData(item){
            let urlItem = item.url;

            fetch(urlItem)
            .then(function(response){
                return response.json();
                
            })
            .then(function(itemDetails){
                
                //Insertamos el primer pokemon y sus datos en el array sortedPokemon

                sortedItems.push(itemDetails)

                sortedItems.sort(function(a,b){
                    return a.id - b.id; // ordenar por Id en orden ascendente

                    
                })
                renderItemCard();

            })
            .then(function(){
                console.log(sortedItems);
                
            })

            .catch(function(err){
                console.log(err);
                
            })

        }

        // Funcion para renderizar los datos de cada pokemon en un card
        // Esta función recorrerá el array sortedPokemon

        function renderItemCard(){
            $("#item-cont").empty();
            sortedItems.forEach(function(itemDetails){
                let itemName = itemDetails.name
                let itemFirstLet = itemName.slice(0,1).toUpperCase();
                let itemRest = itemName.slice(1,itemName.length);
                
                let itemHTML;
                
                    itemHTML = `<div class="card" style="width: 8rem;">
                                      <img src="${itemDetails.sprites.default

                                      }" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${itemFirstLet + itemRest}</h5>
                                        <p class="card-text">${itemDetails.category.name}</p>                                        
                                        <a href="item.html?id=${itemDetails.id}" class="btn btn-primary">Go somewhere</a>
                                         </div>
                                </div>`;
                
               

                $("#item-cont").append(itemHTML);

            })


        }
})