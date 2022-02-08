function Character(info) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML =
    "" +
    '<div class="character-face-con character-head">' +
    '<div class="character-face character-head-face face-front"></div>' +
    '<div class="character-face character-head-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-torso">' +
    '<div class="character-face character-torso-face face-front"></div>' +
    '<div class="character-face character-torso-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-arm character-arm-right">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-arm character-arm-left">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-leg character-leg-right">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-leg character-leg-left">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    "</div>";

  document.querySelector(".stage").appendChild(this.mainElem);

  //캐릭터 위치 선정
  this.mainElem.style.left = info.xPos + "%";

  //스크롤 중인지 아닌지
  this.scrollState = false;

  // 마지막 스크롤 위치
  this.lastScrollTop = 0;

  //캐릭터 위치 속도
  this.xPos = info.xPos;
  this.speed = info.speed;

  //좌우 이동 중인지 아닌지
  this.runningState = false;

  //방향
  this.direction;

  this.rafId;

  //메서드 실행
  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    //객체 가르키기
    const self = this;
    window.addEventListener("scroll", function () {
      //함수 내부에서 this는 클릭한 대상, 즉 window 전역을 가리킴

      //스크롤 시 계쏙 timeout를 초기화해줌 -> 즉 class remove를 하지 못하게 막아줌
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      //스크롤에 따른 캐릭터 앞 뒤 모습
      if (self.lastScrollTop > scrollY) {
        //이전 스크롤 위치가 크다면: 스크롤 올림
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        //이전 스크롤 위치가 작다면: 스크롤 내림
        self.mainElem.setAttribute("data-direction", "forward");
      }

      self.lastScrollTop = scrollY;
    });

    window.addEventListener("keydown", function (e) {
      if (self.runningState) return;

      if (e.key === "ArrowRight") {
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run();
        self.runningState = true;
      } else if (e.key === "ArrowLeft") {
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        self.mainElem.classList.add("running");
        self.run();
        self.runningState = true;
      }
    });

    window.addEventListener("keyup", function (e) {
      self.mainElem.classList.remove("running");
      this.cancelAnimationFrame(self.rafID);
      self.runningState = false;
    });
  },

  run: function () {
    const self = this;

    if (self.direction === "left") {
      self.xPos -= self.speed;
    } else if (self.direction === "right") {
      self.xPos += self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }

    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + "%";

    self.rafID = requestAnimationFrame(self.run.bind(self));
  },
};
