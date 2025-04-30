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

