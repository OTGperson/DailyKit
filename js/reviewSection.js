function reviewSwiper() {
  fetch("assets/data/reviews.json")
    .then((res) => res.json())
    .then((data) => {
      const wrapper = document.getElementById("reviewWrapper");

      data.forEach((review) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        slide.innerHTML = `
          <div class="review-card flex">
            <div class="web-app-info">
              <div class="review-app-img">
                <img src="assets/images/introSection/${review.app}.png"
                  alt="${review.app}">
              </div>
              <div class="review-app-name">
                <strong>${review.app}</strong>
              </div>
            </div>
            <div class="review-content">
              <div class="reviewer-nickname">
                <strong>${review.nickname}</strong>
              </div>
              <div class="review-feedback">
                ${review.feedback
                  .map((line) => `<span>${line}</span>`)
                  .join("<br>")}
              </div>
            </div>
          </div>
        `;

        wrapper.appendChild(slide);
      });

      new Swiper(".review-section .swiper", {
        slidesPerView: 1,
        loop: true,
        allowTouchMove: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {
            updatePagination(this);
          },
          slideChange: function () {
            updatePagination(this);
          },
        },
      });
    });
}
reviewSwiper();

function updatePagination(swiper) {
  // loop mode일 경우 양쪽 더미 slide 제외
  const totalSlides = swiper.slides.length - (swiper.loop ? 2 : 0);
  const currentIndex = swiper.realIndex + 1;

  document.querySelector(".current-page").textContent = currentIndex;
  document.querySelector(".total-page").textContent = totalSlides;
}
