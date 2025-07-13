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
