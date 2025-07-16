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
      $('.video-cards-container').empty();

      $('.search-text-area').val(data.q || '');
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

$(document).ready(function () {
  // Load dropdowns
  $.get('https://smileschool-api.hbtn.info/courses', function(data) {
    const topicSelect = $('#topic-select');
    const sortSelect = $('#sort-select');

    topicSelect.empty();
    sortSelect.empty();

    data.topics.forEach(topic => {
      topicSelect.append(`<option value="${topic}">${topic}</option>`);
    });
    data.sorts.forEach(sort => {
      sortSelect.append(`<option value="${sort}">${sort}</option>`);
    });

    // Initial fetch with defaults
    const q = $('.search-text-area').val();
    fetchCourses(q, topicSelect.val(), sortSelect.val());
  });

  $('.search-text-area').on('input', function () {
    const q = $(this).val();
    const topic = $('#topic-select').val();
    const sort = $('#sort-select').val();
    fetchCourses(q, topic, sort);
  });

  $('#topic-select, #sort-select').on('change', function () {
    const q = $('.search-text-area').val();
    const topic = $('#topic-select').val();
    const sort = $('#sort-select').val();
    fetchCourses(q, topic, sort);
  });
});
