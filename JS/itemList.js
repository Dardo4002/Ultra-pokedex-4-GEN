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
                
                //Insertamos el primer item y sus datos en el array sortedItems

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
            $(".item-cont").empty();
            sortedItems.forEach(function(itemDetails){
                let itemName = itemDetails.name
                let itemFirstLet = itemName.slice(0,1).toUpperCase();
                let itemRest = itemName.slice(1,itemName.length);
                
                let itemHTML;
                

                    itemHTML = `<div class="row card mt-2 rounded-5">
                                <p id="${itemDetails.id}" class="ml-2 mt-1 select-btn">${itemFirstLet + itemRest}</p>
                            </div>`;
                                
                
               

                $(".item-cont").append(itemHTML);

            })
            $(".select-btn").on("click", function() {
                
                let itemId = $(this).attr("id");
                
                loading();
                select(itemId);
            });

        }
        
        function select(itemId){
            
            fetch("https://pokeapi.co/api/v2/item/" + itemId)

        .then(function(response){
            return response.json();
            
            
        }
            
        )
        .then(function(result){
            
            console.log(result);
            let selectedItem = result;
            $("#selected").empty();
            let itemInfo = `<div class="col-12">
                            <div class="row align-items-center">
                                <!-- Imagen a la izquierda, ocupa el 50% -->
                                <div class="col-6">
                                    <img class="picture mt-4 ms-4" src="${selectedItem.sprites.default}" alt="Imagen">
                                </div>

                                <!-- Contenido textual a la derecha -->
                                <div class="col-6 d-flex flex-column justify-content-center part-right-cont">
                                    <!-- Nombre ocupa la mitad derecha (50% de col-6 = col-12 dentro del contenedor) -->
                                    <div class="w-100 h-50 d-flex justify-content-center align-items-center text-center mb-2 pantalla-arriba mt-5 rounded-4 borde">
                                        <p class="mb-0">Name: <br> ${selectedItem.name}</p>
                                    </div>

                                    <!-- Tipo y Precio juntos en fila -->
                                    <div class="d-flex align-items-center justify-content-between gap-3 h-50 mt-2">
                                        <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                         <p class="mb-0">Category: <br> ${selectedItem.category.name}</p>       
                                        </div>
                                        <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                            <p class="mb-0">Price: <br> ${selectedItem.cost} Pokecoins</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- Mitad de abajo -->
                        <div class="col-12 part-down-cont mt-3 rounded-4 d-flex justify-content-center align-items-center borde">
                            <p class="mb-0 text-center">${selectedItem.effect_entries[0].effect}</p>
                        </div>`;

            $("#selected").append(itemInfo);
        })
        .catch(function(err){

            console.log(err);
            
        });


            
            
        }
        function loading(){
            console.log("loading");
            
            $("#selected").empty();
            let itemInfo = `<div class="col-12">
                            <div class="row align-items-center">
                                <!-- Imagen a la izquierda, ocupa el 50% -->
                                <div class="col-6  d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                         
                                     </div>
                                </div>

                                <!-- Contenido textual a la derecha -->
                                <div class="col-6 d-flex flex-column justify-content-center part-right-cont">
                                    <!-- Nombre ocupa la mitad derecha (50% de col-6 = col-12 dentro del contenedor) -->
                                    <div class="w-100 h-50 d-flex justify-content-center align-items-center text-center mb-2 pantalla-arriba mt-5 rounded-4 borde">
                                        <p class="mb-0">Name: <br> Loading...</p>
                                    </div>

                                    <!-- Tipo y Precio juntos en fila -->
                                    <div class="d-flex align-items-center justify-content-between gap-3 h-50 mt-2">
                                        <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                         <p class="mb-0">Category: <br> Loading...</p>       
                                        </div>
                                        <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                            <p class="mb-0">Price: <br> Loading... Pokecoins</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- Mitad de abajo -->
                        <div class="col-12 part-down-cont mt-3 rounded-4 d-flex justify-content-center align-items-center borde">
                            <p class="mb-0 text-center">Loading...</p>
                        </div>`;

            $("#selected").append(itemInfo);

        }
})