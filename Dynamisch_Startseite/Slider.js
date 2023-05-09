let slideIndex = 1;
showSlides(slideIndex);
            
function plusSlides(n) {
    showSlides(slideIndex += n);
}
            
function currentSlide(n) {
    showSlides(slideIndex = n);
}
            
function showSlides(n) {
    let i;
    let x = document.getElementsByClassName("slide");
    if (n > x.length) {
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = x.length; 
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "flex";
}