(function () {
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  let maxScrollValue = document.body.offsetHeight - window.innerHeight;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    const scrollPer = scrollY / maxScrollValue;
    const zMove = scrollPer * 980 - 490; //스크롤 비율
    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    // progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("resize", resizeHandler);
})();
