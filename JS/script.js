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
        // Remove slct class from all sort buttons
        $(".buttons .sort").removeClass("slct");
        // Add slct class to clicked button
        $(this).addClass("slct");
        
        let sorterVal = $(this).data("sort-by");
        window.currentSort = sorterVal;
        $itemCont.isotope({
            sortBy: sorterVal
        });
    });

    // Set initial selected sort button
    $(".buttons .sort[data-sort-by='number']").addClass("slct");
});