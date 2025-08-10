function funcAOS() {
  document.addEventListener("DOMContentLoaded", () => {
    const aosInit1 = document.querySelectorAll(".aos-init");

    aosInit1.forEach((el, index) => {
      el.setAttribute("data-aos-delay", index * 250);
    });

    AOS.init({
      once: true,
    });
  });
}
funcAOS();
