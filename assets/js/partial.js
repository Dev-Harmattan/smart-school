$(function(){
  //nav-icon toggle
  navToggle();
  function navToggle(){
    const navIcon = document.querySelector("#nav-icon");
    const nav = document.querySelector(".nav-wrapper");
    const navLists = document.querySelectorAll(".nav-list");

    navIcon.addEventListener('click', function () {
      nav.classList.toggle("nav-active");

      navLists.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = link.style.animation = `navLinksFade 0.5s ease ${index / 7 + 1}s forwards`;
        }
      })
      navIcon.classList.toggle('toggle')
    });
  }



//bording accordion script
  bordingAccordion();
  function bordingAccordion(){
    var i;
    var acc = document.getElementsByClassName("boarding-accordion");
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.classList.toggle('change')
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // dropdown script
  dropdownLink();
  function dropdownLink(){
    let dropdown = document.getElementsByClassName('dropdown-button')[0];
    let dropdownContent = document.getElementsByClassName('dropdown-content')[0]
    dropdown.addEventListener('click', function(){
      dropdownContent.classList.toggle('show')
    });
  }

// curriculum carousels script
  
  var crecheCarouselndex = 0;
  crecheCarouselOne();

  function crecheCarouselOne() {
    var i;
    let slides = document.getElementsByClassName('slide');
    for(i = 0; i< slides.length; i++){
      if(slides[i]){
        slides[i].style.display = 'none';
      }
    }
    crecheCarouselndex++;
    if(crecheCarouselndex > slides.length){ crecheCarouselndex = 1}
    if(slides[crecheCarouselndex - 1]){
      slides[crecheCarouselndex - 1].style.display = 'block';
    }
    setTimeout(crecheCarouselOne, 4000);
  }


  var primarySlideIndex = 0;
  primarySlideOne();

  function primarySlideOne() {
    var i;
    let primarySlides = document.getElementsByClassName('primary-slide-1');
    let primaryDots = document.getElementsByClassName('primary-dot');
    let dotlenghts = primaryDots.length;
    
    
    for(i = 0; i< primarySlides.length; i++){
      if(primarySlides[i]){
        primarySlides[i].style.display = 'none';
        primaryDots[i].style.backgroundColor = "#bbb"
      }
    }

    primarySlideIndex++;
    for(let i = 0; i < dotlenghts; i++){
      primaryDots[i].addEventListener('click', function(){
        primarySlideIndex = i;
      })
    }
    if(primarySlideIndex > primarySlides.length){ primarySlideIndex = 1}
    if(primarySlides[primarySlideIndex - 1]){
      primarySlides[primarySlideIndex - 1].style.display = 'block';
      primaryDots[primarySlideIndex - 1].style.backgroundColor = "#4033FF"
    }
    setTimeout(primarySlideOne, 2000);
  }

  var primarySlideIndexTwo = 0;
  primarySlideTwo();

  function primarySlideTwo() {
    var i;
    let primarySlides = document.getElementsByClassName('primary-slide-2');
    let primaryDots = document.getElementsByClassName('primary-dot-2');
    let dotlenghts = primaryDots.length;
    
    
    for(i = 0; i< primarySlides.length; i++){
      if(primarySlides[i]){
        primarySlides[i].style.display = 'none';
        primaryDots[i].style.backgroundColor = "#bbb"
      }
    }

    primarySlideIndexTwo++;
    for(let i = 0; i < dotlenghts; i++){
      primaryDots[i].addEventListener('click', function(){
        primarySlideIndex = i;
      })
    }
    if(primarySlideIndexTwo > primarySlides.length){ primarySlideIndexTwo = 1}
    if(primarySlides[primarySlideIndexTwo - 1]){
      primarySlides[primarySlideIndexTwo - 1].style.display = 'block';
      primaryDots[primarySlideIndexTwo - 1].style.backgroundColor = "#4033FF"
    }
    setTimeout(primarySlideTwo, 2000);
  }



  var secondarySlideIndex = 0;
  secondaryCarouselOne();

  function secondaryCarouselOne() {
    var i;
    let slides = document.getElementsByClassName('secondary-slide');
    for(i = 0; i< slides.length; i++){
      if(slides[i]){
        slides[i].style.display = 'none';
      }
    }
    secondarySlideIndex++;
    if(secondarySlideIndex > slides.length){ secondarySlideIndex = 1}
    if(slides[secondarySlideIndex - 1]){
      slides[secondarySlideIndex - 1].style.display = 'block';
    }
    setTimeout(secondaryCarouselOne, 4000);
  }


});