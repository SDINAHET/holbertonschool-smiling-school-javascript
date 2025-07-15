/*js quote*/
$(document).ready(function () {
  console.log("Document ready, executing AJAX for quotes...");
  const $carousel = $('#carouselExampleControls');
  const $carouselInner = $carousel.find('.carousel-inner');
  const $loaderWrapper = $('.loader-wrapper');

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    success: function (quotes) {
      quotes.forEach((quote, index) => {
        const isActive = index === 0 ? 'active' : '';
        const item = `
          <div class="carousel-item ${isActive}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img
                  src="${quote.pic_url}"
                  class="d-block align-self-center rounded-circle"
                  alt="${quote.name}"
                />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">« ${quote.text} »</p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>`;
        $carouselInner.append(item);
      });

      // $loaderWrapper.hide(); // ✅ cache le fond violet + loader
      $loaderWrapper.fadeOut('slow', function () {
        $carousel.removeClass('d-none'); // ✅ affiche le carousel
    // },
      });
    },
    error: function () {
      $loaderWrapper.html('<p class="text-white">Erreur de chargement des citations</p>');
    }
  });
});


/*js popular tutorials*/
$(document).ready(function () {
  const carouselTrack = $(".carousel-track");
  const loader = $("#loader-popular");
  const container = $("#popular-carousel-container");

  let currentIndex = 0;

  $.get("https://smileschool-api.hbtn.info/popular-tutorials", function (data) {
    data.forEach((video) => {
      const card = `
        <div class="carousel-card">
          <div class="card mx-2">
            <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}">
            <div class="card-img-overlay text-center">
              <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${video.title}</h5>
              <p class="card-text text-muted">${video['sub-title']}</p>
              <div class="creator d-flex align-items-center">
                <img src="${video.author_pic_url}" width="30px" class="rounded-circle" alt="Author">
                <h6 class="pl-3 m-0 main-color">${video.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">${renderStars(video.star)}</div>
                <span class="main-color">${video.duration}</span>
              </div>
            </div>
          </div>
        </div>`;
      carouselTrack.append(card);
    });

    loader.addClass("d-none");
    container.removeClass("d-none");
  });

  function renderStars(starCount) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += `<img src="images/${i < starCount ? 'star_on' : 'star_off'}.png" width="15px" alt="star">`;
    }
    return stars;
  }

  // Scroll function
  $(".carousel-btn.right").click(function () {
    const cardWidth = $(".carousel-card").outerWidth(true);
    currentIndex++;
    if (currentIndex * cardWidth >= carouselTrack[0].scrollWidth) {
      currentIndex = 0;
    }
    carouselTrack.css("transform", `translateX(-${currentIndex * cardWidth}px)`);
  });

  $(".carousel-btn.left").click(function () {
    const cardWidth = $(".carousel-card").outerWidth(true);
    currentIndex = Math.max(0, currentIndex - 1);
    carouselTrack.css("transform", `translateX(-${currentIndex * cardWidth}px)`);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("popular-loader");

  // Simuler un chargement asynchrone
  setTimeout(() => {
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 700); // Retire l’élément du DOM
    }
  }, 1500); // Durée visible du loader
});
