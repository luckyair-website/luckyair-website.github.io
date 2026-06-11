/* Beneficios card */

export function beneficiosCards() {
  const container = document.querySelector('.beneficios-container');
  const cards = document.querySelectorAll('.beneficios-card');
  let index = 0;
  let interval;
  let userInteracting = false;
  let timeout;

  if (!container || !cards) return;

  function startCarousel() {
    interval = setInterval(() => {
      if (!userInteracting) { // solo avanza si el usuario no está tocando
        index = (index + 1) % cards.length;
        container.scrollTo({
          left: cards[index].offsetLeft,
          behavior: 'smooth'
        });
      }
    }, 3000);
  }

  function stopCarousel() {
    clearInterval(interval);
  }

  // Detectar interacción del usuario (scroll/touch)
  container.addEventListener('scroll', () => {
    userInteracting = true;
    stopCarousel();
    clearTimeout(timeout);
    // reanudar después de 3s sin interacción
    timeout = setTimeout(() => {
      userInteracting = false;
      startCarousel();
    }, 3000);
  });

  container.addEventListener('touchstart', () => {
    userInteracting = true;
    stopCarousel();
  });

  container.addEventListener('touchend', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      userInteracting = false;
      startCarousel();
    }, 3000);
  });

  startCarousel(); // inicia al cargar
}
