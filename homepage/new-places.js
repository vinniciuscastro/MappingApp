document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.image');
    
    images.forEach(function(image) {
      image.addEventListener('click', function() {
        window.location.href = this.parentElement.getAttribute('href');
      });
    });
  });  