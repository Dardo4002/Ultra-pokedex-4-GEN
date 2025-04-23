$(document).ready(function(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0")
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