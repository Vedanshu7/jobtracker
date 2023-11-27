// filter.js
function filterJobs() {
    var keyword = document.getElementById('keyword').value.toLowerCase();
    var category = document.getElementById('category').value.toLowerCase();
    var location = document.getElementById('location').value.toLowerCase();
  
    var jobCards = document.querySelectorAll('.job-card');
  
    jobCards.forEach(function (card) {
      var title = card.querySelector('.card-title').innerText.toLowerCase();
      var cardCategory = card.querySelector('.card-category').innerText.toLowerCase();
      var cardLocation = card.querySelector('.card-location').innerText.toLowerCase();
  
      var titleMatch = title.includes(keyword);
      var categoryMatch = category === 'all' || cardCategory.includes(category);
      var locationMatch = location === 'all' || cardLocation.includes(location);
  
      card.style.display = titleMatch && categoryMatch && locationMatch ? 'block' : 'none';
    });
  }
  