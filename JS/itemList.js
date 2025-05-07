$(document).ready(function(){

    fetch("https://pokeapi.co/api/v2/item/?limit=3&offset=0")
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
                

                    itemHTML = `<div>
                                      <img src="${itemDetails.sprites.default}" alt="...">
                                        <div>
                                        <h5>${itemFirstLet + itemRest}</h5>
                                        <p>${itemDetails.category.name}</p>                                        
                                        <button class="select-btn">Select</button>
                                         </div>
                                </div>`;
                
               

                $("#item-cont").append(itemHTML);

            })
            $(".select-btn").on("click", function() {
                select();
            });

        }
        
        function select(){
            $("#selected").empty();
            let itemInfo = `<div> <img src=""> <div>
            <h5>ive been selected</h5>
            </div></div>`;

            $("#selected").append(itemInfo);
            
        }
})