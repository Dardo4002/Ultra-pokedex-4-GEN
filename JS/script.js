$(document).ready(function(){
    console.log("Cargado!");
    let $itemCont = $(".item-cont");
    // Add currentSort variable to track sort method
    window.currentSort = 'number'; // Default sort by ID
    
    $itemCont.isotope({
        itemSelector: ".card",
        layoutMode: 'fitRows',
        getSortData: {
            name: ".button",
            number: function(itemElem) {
                return parseInt($(itemElem).find('.button').attr('id'));
            }
        }
    });
    
    $(".buttons .sort").on("click", function () {
        let sorterVal = $(this).data("sort-by");
        window.currentSort = sorterVal; // Update current sort method
        $itemCont.isotope({
            sortBy: sorterVal
        });
    });

    
});