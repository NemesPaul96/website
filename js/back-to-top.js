document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');

  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 1000) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    if (window.scrollY > 1000) {
      backToTopButton.classList.add('show');
    }
  }
});
