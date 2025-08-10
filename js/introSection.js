function introSectionSwiper() {
  fetch("assets/data/intro.json")
    .then((res) => res.json())
    .then((data) => {
      const wrapper = document.getElementById("introWrapper");

      data.forEach((intro) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        slide.innerHTML = `
          <div class="web-app-container">
            <div class="web-app-img flex">
              <img src="assets/images/introSection/${intro.name}.png"
                  alt="${intro.name}" />
            </div>
            <div class="web-app-desc">
              <div class="web-name">
                <strong>${intro.name}</strong>
              </div>
              <div class="web-ex">
                <span>${intro.ex}</span>
              </div>
              <div class="web-func flex">
                ${intro.func
                  .map((line) => `<div class="flex">${line}</div>`)
                  .join("")}
              </div>
            </div>
            <div class="web-link-btn flex">
              <button><a href="${
                intro.site
              }" target="_blank">사용하러 가기</a></button>
            </div>
          </div>
        `;

        wrapper.appendChild(slide);
      });

      const swiper = new Swiper(".intro-section .swiper", {
        loop: true,
        spaceBetween: 60,
        breakpoints: {
          1920: {
            slidesPerView: 4.2,
          },
          1080: {
            slidesPerView: 3.8,
          },
          960: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 2,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
}
introSectionSwiper();
