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
        
        itemInfo(result);
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
        
        

    })
    .then(function(){
        console.log(sortedItems);
        
    })

    .catch(function(err){
        console.log(err);
        
    })

}

function itemInfo(result){
    $("#item-cont").empty();

    let itemDetailsHTML = `<div>
                                      <img src="${result.sprites.default

                                      }" alt="...">
                                        <div>
                                        <h5>${result.name}</h5>
                                        <p>${result.category.name}</p>                                        
                                        <button onclick="select()">HEllo</button>

                                         </div>
                                </div>`;

    $("#item-cont").append(itemDetailsHTML);
                                
}

