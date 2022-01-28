(function () {
  const houseElem = document.querySelector(".house");
  const maxScrollValue = document.body.offsetHeight - window.innerHeight;

  window.addEventListener("scroll", function () {
    const zMove = (scrollY / maxScrollValue) * 980 - 490; //스크롤 비율
    houseElem.style.transform = "translateZ(" + zMove + "vw)";
  });
})();
