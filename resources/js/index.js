// close header-top
$(document).ready(function(){
  $(".header-top-icon").click(function(){
    $(".header-top").slideUp();
  });
});

// sticky header

$(window).scroll(function(){
  const sticky = $('.header-main'),
      scroll = $(window).scrollTop();

  if (scroll >= 10) sticky.addClass('sticky');
  else sticky.removeClass('sticky');
});

// slider

// data
const data = [
  {
    slug: '#',
    cover: './resources/assets/img/shanghai.png',
    title: 'The Bund',
    city: 'Shanghai',
    description: 'China’s most international city',
    price: '$598',
  },
  {
    slug: '#',
    cover: './resources/assets/img/sydney.png',
    title: 'Sydney Opera House',
    city: 'Sydney',
    description: 'Sydney Opera House, Sydney',
    price: '$981',
  },
  {
    slug: '#',
    cover: './resources/assets/img/Kyoto.png',
    title: 'Kōdaiji Temple',
    city: 'Kyoto',
    description: 'Step back in time in the Gion district' ,
    price: '$681',
  },
];

function createCard(item) {
    return `
    <div class="item">
    <div class="card" style="width: 18rem">
      <div class="card-img-top">
        <img
          src="${item.cover}"
          alt="${item.city}"
          class="card-img-top"
        />
      </div>
      <div class="card-body">
        <div class="card-name">
          <div class="title">
            ${item.title}, <a href="">${item.city}</a>
          </div>
          <div class="price">${item.price}</div>
        </div>
        <p class="description">${item.description}</p>
      </div>
    </div>
  </div>
  
    `;
}

data.map(createCard);
document.querySelector(".owl-carousel").innerHTML = data
  .map(createCard) 
  .join("");
