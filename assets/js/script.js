$(function () {
  // let $animation_elements = $('#about');
  // let $student = $('.student');
  // let $teacher = $('.teacher');
  // let $award = $('.award');
  // let $window = $(window);

  // function check_if_in_view() {
  //   let window_height = $window.height();
  //   let window_top_position = $window.scrollTop();
  //   let window_bottom_position = (window_top_position + window_height);

  //   let element_height = $animation_elements.outerHeight();
  //   let element_top_position = $animation_elements.offset().top;
  //   let element_bottom_position = (element_top_position + element_height);

    
  //   if ((element_bottom_position >= window_top_position) &&
  //     (element_top_position <= window_bottom_position)) {
  //     $student.addClass('student-counter');
  //     $teacher.addClass('teacher-counter');
  //     $award.addClass('award-counter');
  //   } else {
      
  //   }
  // }

  // $window.on('scroll resize', check_if_in_view);
  // $window.trigger('scroll');

  //navbar toggle
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

  //carousel scripts
  homeCarousel();
  function homeCarousel(){
    var prev = document.getElementById('prevButton')
    var next = document.getElementById('nextButton')

    var slideIndex = 1;
    showSlides(slideIndex);

    next.addEventListener('click', function () {
      showSlides(slideIndex += 1)
    })

    prev.addEventListener('click', function () {
      showSlides(slideIndex += -1);
    })

    var dotElements = document.getElementsByClassName("dot");
    for (var i = 0; i < dotElements.length; i++) {
      dotElements[i].addEventListener('click', function () {
        showSlides(i + 1);
      })
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("testimonial-Slides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }


  //accordion script
  accordion();
  function accordion(){
    var acc = document.getElementsByClassName("accordion");
    var hamb = document.getElementsByClassName('accordion-hambugger');
    var accordionPanel = document.getElementsByClassName('accordion-panel');
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.classList.toggle('change');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          accordionPanel.classList.toggle('border');
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


})

