const menu = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

if (menu && nav) {
  menu.addEventListener("click", () => nav.classList.toggle("open"));
}

const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const dots = Array.from(slider.querySelectorAll("[data-slide-to]"));
  const prev = document.querySelector("[data-slider-prev]");
  const next = document.querySelector("[data-slider-next]");
  let activeIndex = 0;
  let timer;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(activeIndex + 1), 5200);
  };

  prev?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    restart();
  });

  next?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    restart();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideTo));
      restart();
    });
  });

  restart();
}
