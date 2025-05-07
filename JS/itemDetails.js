$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search)
    const itemId = urlParams.get('id');
    
    console.log(itemId);
    fetch("https://pokeapi.co/api/v2/item/"+itemId)
    .then(function(response){
        return response.json();
        
    }
        
    )
    .then(function(result){
        console.log(result);
        
    })
    .catch(function(err){

        console.log(err);
        
    });
    
})

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