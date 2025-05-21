$(document).ready(function(){
    let offset = 0;
    // Ocultar items inicialmente
    $(".item-cont").hide();
    
    // Añadir manejador de clic para el botón Healing
    $("#healing").on("click", function() {
        // Limpiar items existentes
        sortedItems = [];
        $(".item-cont").empty();
        
        // Obtener items de curación
        fetch("https://pokeapi.co/api/v2/item-category/27/?limit=10000&offset=0")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(result);
                let itemList = result.items;
                itemList.forEach(function(item) {
                    fetchItemData(item);
                });
                // Mostrar items después de obtenerlos
                $(".item-cont").show();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    
    // Añadir manejador de clic para el botón Pokeballs
    $("#pokeballs").on("click", function() {
        // Limpiar items existentes
        sortedItems = [];
        $(".item-cont").empty();
        
        // Obtener items de pokeballs
        fetch("https://pokeapi.co/api/v2/item-category/34/?limit=15&offset=15")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(result);
                let itemList = result.items;
                itemList.forEach(function(item) {
                    fetchItemData(item);
                });
                // Mostrar items después de obtenerlos
                $(".item-cont").show();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    
    // Añadir manejador de clic para el botón Held
    $("#held").on("click", function() {
        // Limpiar items existentes
        sortedItems = [];
        $(".item-cont").empty();
        
        // Obtener items de equipamiento
        fetch("https://pokeapi.co/api/v2/item-category/17/?limit=15&offset=0")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(result);
                let itemList = result.items;
                itemList.forEach(function(item) {
                    fetchItemData(item);
                });
                // Mostrar items después de obtenerlos
                $(".item-cont").show();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    
// Añadir manejador de clic para el botón All
    $("#all").on("click", function() {
        // Limpiar items existentes
        sortedItems = [];
        $(".item-cont").empty();
        
        // Obtener items de equipamiento
        fetch("https://pokeapi.co/api/v2/items")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(result);
                let itemList = result.items;
                itemList.forEach(function(item) {
                    fetchItemData(item);
                });
                // Mostrar items después de obtenerlos
                $(".item-cont").show();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    // Carga inicial
    fetch("https://pokeapi.co/api/v2/item/?limit=15&offset=0")
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log(result);
            let itemList = result.results;
            itemList.forEach(function(item){
                fetchItemData(item);
            });
            // Mostrar items después de la primera carga
            $(".item-cont").show();
        })
        .catch(function(err){
            console.log(err);
        });
        
    // Array de items ordenados
    let sortedItems = [];

    // Función que pide a la api los datos de un item y los ordena en el array
    function fetchItemData(item){
        let urlItem = item.url;

        fetch(urlItem)
        .then(function(response){
            return response.json();
        })
        .then(function(itemDetails){
            sortedItems.push(itemDetails)
            sortedItems.sort(function(a,b){
                return a.id - b.id;
            })
            renderItemCard();
        })
        .then(function(){
            console.log(sortedItems);
        })
        .catch(function(err){
            console.log(err);
        });
    }

    // Función para renderizar los datos de cada item
    function renderItemCard(){
        $(".item-cont").empty();
        
        // Crear un contenedor para los items
        let itemsContainer = $('<div class="items-container"></div>');
        
        sortedItems.forEach(function(itemDetails){
            let itemName = itemDetails.name
            let itemFirstLet = itemName.slice(0,1).toUpperCase();
            let itemRest = itemName.slice(1,itemName.length);
            
            let itemHTML = `<div class="row card mt-2 rounded-5 help">
                            <div class="col-3 d-flex justify-content-center align-items-center lazy">
                                <img src="${itemDetails.sprites.default}" alt="${itemName}" class="lazy item-sprite">
                            </div>
                            <div class="col-9 d-flex justify-content-center align-items-center">
                                <p id="${itemDetails.id}" class="text mb-0 button lazy button-text">${itemFirstLet + itemRest}</p>
                            </div>
                        </div>`;
            
            itemsContainer.append(itemHTML);
        });

        // Añadir contenedor de items al contenedor principal
        $(".item-cont").append(itemsContainer);

        // Añadir botón de cargar más si no existe
        if (!$(".loader").length) {
            let loadMoreBtn = `<div class="loader row card mt-2 rounded-5 help">
                            <p id="loader" class="ml-2 mt-1 d-flex justify-content-center align-items-center h-100 w-100 text">Cargar más</p>
                        </div>`;
            $(".item-cont").append(loadMoreBtn);
        }

        // Reinicializar Isotope y aplicar orden actual
        $(".item-cont").isotope('reloadItems');
        $(".item-cont").isotope({
            sortBy: window.currentSort
        });
        $(".item-cont").isotope('layout');

        // Añadir manejadores de eventos
        $(".button").on("click", function() {
            $(".button").parent().parent().removeClass("slct");
            $(this).parent().parent().addClass("slct");
            let itemId = $(this).attr("id");
            loading();
            select(itemId);
        });

        $(".loader").on("click", function() {
            offset += 15;
            console.log(offset);
            
            fetch("https://pokeapi.co/api/v2/item/?limit=15&offset=" + offset)
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    console.log(result);
                    let itemList = result.results;
                    itemList.forEach(function(item) {
                        fetchItemData(item);
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    }
    // comentario random
    function select(itemId){
        fetch("https://pokeapi.co/api/v2/item/" + itemId)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log(result);
            let selectedItem = result;
            $("#selected").empty();
            let itemInfo = `<div class="col-12">
                            <div class="row align-items-center">
                                <!-- Imagen a la izquierda, ocupa el 50% -->
                                <div class="col-6">
                                    <img class="picture smaller mt-4 ms-4" src="${selectedItem.sprites.default}" alt="Imagen">
                                </div>

                                <!-- Contenido textual a la derecha -->
                                <div class="col-6 d-flex flex-column justify-content-center part-right-cont">
                                    <!-- Nombre ocupa la mitad derecha (50% de col-6 = col-12 dentro del contenedor) -->
                                    <div class="w-100 h-50 d-flex justify-content-center align-items-center text-center mb-2 pantalla-arriba mt-5 rounded-4 borde">
                                        <p class="mb-0 text button-text">${selectedItem.name}</p>
                                    </div>

                                    <!-- Tipo y Precio juntos en fila -->
                                    <div class="d-flex align-items-center justify-content-between gap-3 h-50 mt-2">
                                        <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                         <p class="mb-0 button-text category-text">${selectedItem.category.name}</p>       
                                        </div>
                                        <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                            <p class="mb-0 text button-text">${selectedItem.cost} Pokecoins</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- Mitad de abajo -->
                        <div class="col-12 part-down-cont mt-3 rounded-4 d-flex justify-content-center align-items-center borde">
                            <p class="mb-0 text-center text">${selectedItem.effect_entries[0].effect}</p>
                        </div>`;

            $("#selected").append(itemInfo);
        })
        .catch(function(err){
            console.log(err);
        });
    }

    function loading(){
        console.log("cargando");
        
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
                                    <p class="mb-0 text">Nombre: <br> Cargando...</p>
                                </div>

                                <!-- Tipo y Precio juntos en fila -->
                                <div class="d-flex align-items-center justify-content-between gap-3 h-50 mt-2">
                                    <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                     <p class="mb-0 text">Categoría: <br> Cargando...</p>       
                                    </div>
                                    <div class="w-50 h-100 d-flex justify-content-center align-items-center text-center pantalla-arriba rounded-4 borde">
                                        <p class="mb-0 text">Precio: <br> Cargando... Pokecoins</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Mitad de abajo -->
                    <div class="col-12 part-down-cont mt-3 rounded-4 d-flex justify-content-center align-items-center borde">
                        <p class="mb-0 text text-center">Cargando...</p>
                    </div>`;

        $("#selected").append(itemInfo);
    }
    
});