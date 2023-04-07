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
    let slides = document.getElementsByClassName("image");
    let slides2 = document.getElementsByClassName("description");
    if (n > slides.length) {
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = slides.length; 
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides2[i].style.display = "none";   
    }
    slides[slideIndex-1].style.display = "block";
    slides2[slideIndex-1].style.display = "block";  
}