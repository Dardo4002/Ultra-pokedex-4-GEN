let slideIndex = 1;
let autoSlide;
let dots = document.querySelectorAll(".dot");
let slides = document.querySelectorAll(".mySlides");
// Mostramos el primer slide cuando se carga la web
showSlide(slideIndex);
// Iniciamos el funcionamiento automático del slideshow
startAutoSlide();

dotsChange();
// Seleccionamos las flechas para next y prev slide
let nextSlideArrow = document.querySelector(".next")
let prevSlideArrow = document.querySelector(".prev")

for(let x = 0; x < slides.length; x++) {
    dots[x].addEventListener("onclick", function() {
        stopAutoSlide();
        currentSlide(x+1);
        startAutoSlide();
    }) 
   
};


nextSlideArrow.addEventListener("click", function(){
    stopAutoSlide();
    nextPrevSlide(1);
    startAutoSlide();
});

prevSlideArrow.addEventListener("click", function(){
    stopAutoSlide();
    nextPrevSlide(-1);
    startAutoSlide();
});

// Seleccionamos todos los puntos (dot) del HTML

/**
 * 
 * @param {number} n 
 * 
 * Esta funcion aumenta o disminiye el slideIndex en función del parámetro que le llegue
 */
function nextPrevSlide(n) {
    slideIndex += n;
    // slideIndex = slideIndex + n;
    showSlide(slideIndex);
};


/**
 * El click en los puntos actualiza el slideIndex
 * 
 * @param {number} n 
 */
function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
};

/**
 * 
 * @param {number} slideNum 
 * 
 * Esta función hace que se vea un slide en concreto.
 */
function showSlide(slideNum) {
    
    
    

    if (slideNum > slides.length) {
        slideIndex = 1;
    };

    if (slideNum < 1) {
        slideIndex = slides.length;
    };

    //Bucle for para recorrer el array de slides
    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
       
    };

    //Bucle for para recorrer el array de dots
    // for (j = 0; j < dots.length; j++) {
    //     dots[j].className = dots[j].className.replace(" active", "");
    // };

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}




function dotsChange() {
    let dot = document.querySelector(".dot");
};

//Automatizamos la llamada a la funcion nextPrevSlide() usando la función built-in setInterval() 
// Le pasamos el parámetro con el valor 1 para avanzar al siguiente slide

function startAutoSlide(){
    autoSlide = setInterval(function(){
        nextPrevSlide(1);
    }, 3000);
};


function stopAutoSlide() {
  clearInterval(autoSlide);
};