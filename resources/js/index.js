// close header-top
const btn_close = document.querySelector(".header-top-icon");
const headertop = document.querySelector(".header-top");
btn_close.addEventListener("click", () => {
    headertop.style.display = 'none';
  });

  // slider

  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})