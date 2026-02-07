function introSectionSwiper() {
  fetch("assets/data/intro.json")
    .then((res) => res.json())
    .then((data) => {
      const wrapper = document.getElementById("introWrapper");
      const filterEl = document.getElementById("introFilter");

      // ✅ 단일 선택 상태: null이면 '전체'
      let selectedTag = null;

      let swiperInstance = null;

      const swiperOptions = {
        loop: true,
        spaceBetween: 60,
        breakpoints: {
          1920: { slidesPerView: 4.2 },
          1080: { slidesPerView: 3.8 },
          960: { slidesPerView: 3.5 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };

      function createSlideHTML(intro) {
        return `
          <div class="swiper-slide">
            <div class="web-app-container">
              <div class="web-app-img flex">
                <img src="assets/images/introSection/${intro.name}.png" alt="${intro.name}" />
              </div>

              <div class="web-app-desc flex flex-col h-65">
                <div class="web-name">
                  <strong>${intro.name}</strong>
                </div>
                <div class="web-ex">
                  <span>${intro.ex}</span>
                </div>
                <div class="web-func flex mt-auto">
                  ${(intro.func || []).map((line) => `<div class="flex">${line}</div>`).join("")}
                </div>
              </div>

              <div class="web-link-btn flex">
                <button><a href="${intro.site}" target="_blank">사용하러 가기</a></button>
              </div>
            </div>
          </div>
        `;
      }

      function getFilteredData() {
        if (!selectedTag) return data;

        return data.filter((item) => {
          const func = item.func || [];
          return func.includes(selectedTag);
        });
      }

      function syncActiveButtons() {
        const btns = filterEl.querySelectorAll(".filter-btn");
        btns.forEach((btn) => {
          const tag = btn.dataset.tag;

          if (tag === "all") {
            btn.classList.toggle("is-active", !selectedTag);
          } else {
            btn.classList.toggle("is-active", selectedTag === tag);
          }
        });
      }

      function renderSlides() {
        const filtered = getFilteredData();
        wrapper.innerHTML = filtered.map(createSlideHTML).join("");

        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }

        swiperInstance = new Swiper(".intro-section .swiper", swiperOptions);
        swiperInstance.slideToLoop(0, 0);
      }

      filterEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;

        const tag = btn.dataset.tag;

        if (tag === "all") {
          selectedTag = null;
        } else {
          selectedTag = selectedTag === tag ? null : tag;
        }

        syncActiveButtons();
        renderSlides();
      });

      syncActiveButtons();
      renderSlides();
    });
}

introSectionSwiper();
