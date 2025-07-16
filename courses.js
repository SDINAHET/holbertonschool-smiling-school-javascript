function fetchCourses(query = '', topic = '', sort = '') {
  $('#loader').show();
  $('.video-cards-container').empty();

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/courses',
    method: 'GET',
    data: {
      q: query,
      topic: topic,
      sort: sort
    },
    success: function (data) {
      $('#loader').hide();
      $('.video-cards-container').html(
        data.courses.map(course => generateCard(course)).join('')
      );
    }
  });
}

function formatLabel(label) {
  return label
    .replace(/_/g, ' ')                  // Remplacer underscore par espace
    .replace(/\b\w/g, c => c.toUpperCase()); // Majuscule à chaque mot
}

function fetchCourses(query = '', topic = '', sort = '') {
  $('#loader').show();
  $('.video-cards-container').empty();

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/courses',
    method: 'GET',
    data: {
      q: query,
      topic: topic,
      sort: sort
    },
    success: function (data) {
      $('#loader').hide();
      $('.video-cards-container').html(
        data.courses.map(course => generateCard(course)).join('')
      );
    }
  });
}

function generateCard(course) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += `<img src="images/${i < course.star ? 'star_on' : 'star_off'}.png" alt="star" width="15px" />`;
  }

  return `
    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mb-4">
      <div class="card">
        <img src="${course.thumb_url}" class="card-img-top" alt="Video thumbnail" />
        <div class="card-img-overlay text-center">
          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
        </div>
        <div class="card-body">
          <h5 class="card-title font-weight-bold">${course.title}</h5>
          <p class="card-text text-muted">${course['sub-title']}</p>
          <div class="creator d-flex align-items-center">
            <img src="${course.author_pic_url}" alt="Author" width="30px" class="rounded-circle" />
            <h6 class="pl-3 m-0 main-color">${course.author}</h6>
          </div>
          <div class="info pt-3 d-flex justify-content-between">
            <div class="rating">${stars}</div>
            <span class="main-color">${course.duration}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateDropdown(menuId, labelId, options) {
  const menu = $(`#${menuId}`);
  const label = $(`#${labelId}`);
  menu.empty();

  options.forEach(option => {
    const displayText = formatLabel(option);
    const item = $(`<a class="dropdown-item" href="#">${displayText}</a>`);
    item.on('click', function (e) {
      e.preventDefault();
      label.text(displayText);
      label.data('value', option); // Stocker la vraie valeur en data-value
      fetchWithFilters();
    });
    menu.append(item);
  });
}


function fetchWithFilters() {
  const query = $('.search-text-area').val();
  const topic = $('#topic-label').data('value') || '';
  const sort = $('#sort-label').data('value') || '';
  fetchCourses(query, topic, sort);
}


$(document).ready(function () {
  // Charger dynamiquement les options depuis l'API
  $.get('https://smileschool-api.hbtn.info/courses', function (data) {
    updateDropdown('topic-options', 'topic-label', data.topics);
    updateDropdown('sort-options', 'sort-label', data.sorts);

    fetchWithFilters();
  });

  // Réagir à la recherche en temps réel
  $('.search-text-area').on('input', fetchWithFilters);
});
