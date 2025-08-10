function headerFixedStyle() {
  const header = document.querySelector(".header-container");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 1) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
}

headerFixedStyle();

function scrollToSection() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 3.4 * 25;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top,
        });
      }
    });
  });
}
scrollToSection();

function sectionActive() {
  const sections = document.querySelectorAll("section[id]");
  const navList = document.querySelectorAll(".header-list li");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((s) => {
      const sTop = s.offsetTop - 3.4 * 25;
      const sHeight = s.clientHeight;
      if (window.scrollY >= sTop && window.scrollY < sTop + sHeight) {
        current = s.getAttribute("id");
      }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = sections[sections.length - 1].getAttribute("id");
    }

    navList.forEach((li) => {
      li.classList.remove("active");

      const a = li.querySelector("a");
      if (a.getAttribute("href") === "#" + current) {
        li.classList.add("active");
      }
    });
  });
}
sectionActive();
