const container = document.querySelector(".container");
const country = document.querySelector("#country");
const city = document.querySelector("#city");
const mainBox = document.querySelector(".mainBox");
const btn = document.querySelector("#btn");
const allSelects = document.querySelector(".allSelects");
const allNamoz = document.querySelector(".allNamoz");
const time = document.querySelector("#time");
const btnBack = document.querySelector("#btnBack");
const regionIcon = document.querySelector(".regionIcon");
const qazoNamoz = document.querySelector(".qazo");
const masjidMap = document.querySelector(".masjidIcon");
const tasbehIcon = document.querySelector(".tasbehIcon");
const tasbehContent = document.querySelector(".tasbehContent");
const minus = document.querySelectorAll("#minus");
const plus = document.querySelectorAll("#plus");
const qazoNumber = document.querySelector("#qazoNumber");
const googleMap = document.querySelector(".googleMap");
const btnBackMap = document.querySelector("#btnBackMap");
const btnBackQazo = document.querySelector("#btnBackQazo");
const loader = document.querySelector("#loader");
const btnTasbeh = document.querySelector("#btnTasbeh");
const generalNum = document.querySelector("#genNum");
const btnBackTasbeh = document.querySelector("#btnBackTasbeh");
// const nameNamoz = document.querySelectorAll(".nameNamoz");

//Api
const ApI = "http://167.71.202.51:8080";

//now time=========>>
setInterval(() => {
  const currentTime = new Date();
  time.textContent = `Time: ${currentTime.toLocaleTimeString()}`;
});

// Scroll Reveal ======>>
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2500,
  delay: 400,
});

ScrollReveal().reveal("h1", { delay: 300, origin: "left" });
ScrollReveal().reveal("#time", { delay: 400, origin: "top" });
ScrollReveal().reveal(".chooseRegion", { delay: 500, origin: "bottom" });
ScrollReveal().reveal(".qazoNamoz", { delay: 600, origin: "bottom" });
ScrollReveal().reveal(".MasjidMap", { delay: 700, origin: "bottom" });
ScrollReveal().reveal(".tasbehSection", { delay: 800, origin: "bottom" });

//region icon click;
regionIcon.addEventListener("click", () => {
  loader.style.display = "block";
  setTimeout(() => {
    //viloyatni tanlash==========>>
    (async () => {
      const response = await fetch(`${ApI}/viloyat`);
      const data = await response.json();
      console.log(data.data);
      data.data.forEach((el) => {
        const option = document.createElement("option");

        // option=el.target.value;
        option.textContent = el.cityName;
        option.setAttribute("value", `${el.cityHref}`);
        country.appendChild(option);
      });
    })();

    //shaharni tanlash==============>>
    country.addEventListener("change", (event) => {
      (async () => {
        const response = await fetch(`${ApI}/viloyat/${event.target.value}`);
        const data = await response.json();
        console.log(data.data);
        data.data.forEach((el) => {
          const option = document.createElement("option");

          // option=el.target.value;
          option.textContent = el.cityName;
          city.appendChild(option);
          // city.innerHTML = '';
        });
      })();
    });

    //tanlangan shaharni chiqarish==============>>
    city.addEventListener("change", (event) => {
      btn.addEventListener("click", () => {
        loader.style.display = "block";
        setTimeout(() => {
          (async () => {
            const response = await fetch(`${ApI}/shahar/${event.target.value}`);
            const data = await response.json();
            console.log(data);

            mainBox.innerHTML = "";
            data.forEach((el) => {
              const box = document.createElement("div");
              const time = document.createElement("h2");
              const name = document.createElement("p");
              box.setAttribute("class", "box");
              time.textContent = el.prayTime;
              name.textContent = el.prayName;
              box.appendChild(time);
              box.appendChild(name);
              mainBox.appendChild(box);
            });
          })();
          //   ScrollReveal().reveal(".box", { delay: 500, origin: "left" });
          btnBack.style.display = "initial";
          allSelects.style.opacity = 0;
          allSelects.style.pointerEvents = "none";
          loader.style.display = "none";
        }, 3000);
      });
    });

    ScrollReveal().reveal("#country", { delay: 200, origin: "left" });
    ScrollReveal().reveal("#city", { delay: 300, origin: "right" });
    ScrollReveal().reveal("#btn", { delay: 400, origin: "left" });
    // btnBack.style.display = "initial";
    regionIcon.style.display = "none";
    qazoNamoz.style.display = "none";
    masjidMap.style.display = "none";
    tasbehIcon.style.display = "none";
    // allSelects.style.display = "block";
    allSelects.style.opacity = 1;
    allSelects.style.pointerEvents = "auto";
    loader.style.display = "none";
  }, 3000);
});

let count = 0;
//qazo namoz show when its click;
qazoNamoz.addEventListener("click", () => {
  loader.style.display = "block";
  setTimeout(() => {
    function plusNum() {
      count++;
      qazoNumber.textContent = count;
    }
    plus.addEventListener("click", plusNum);

    function minusNum() {
      if (count > 0) {
        count--;
        qazoNumber.textContent = count;
      }
    }
    minus.addEventListener("click", minusNum);

    // nameNamoz.forEach((el) => {
    //     // console.log(el);
    //     el.children(plus)
    // })

    ScrollReveal().reveal(".nameNamoz span", { delay: 100, origin: "bottom" });
    ScrollReveal().reveal(".nameNamoz #minus", { delay: 200, origin: "left" });
    ScrollReveal().reveal(".nameNamoz #plus", { delay: 300, origin: "right" });
    ScrollReveal().reveal(".allNamoz p", { delay: 100, origin: "top" });
    ScrollReveal().reveal("#btnBackQazo", { delay: 300, origin: "bottom" });
    allNamoz.style.display = "block";
    regionIcon.style.display = "none";
    qazoNamoz.style.display = "none";
    masjidMap.style.display = "none";
    tasbehIcon.style.display = "none";
    loader.style.display = "none";
  }, 3000);
});

//Masjid icon map click=======>>
masjidMap.addEventListener("click", () => {
  loader.style.display = "block";
document.querySelector("body").style.opacity = 0.1;
  setTimeout(() => {
    ScrollReveal().reveal("iframe", { delay: 100, origin: "top" });
    ScrollReveal().reveal("#btnBackMap", { delay: 200, origin: "bottom" });

    regionIcon.style.display = "none";
    qazoNamoz.style.display = "none";
    masjidMap.style.display = "none";
    tasbehIcon.style.display = "none";
    googleMap.style.display = "block";
    loader.style.display = "none";
  }, 3000);
});

//tasbeh div click==========>>
tasbehIcon.addEventListener("click", () => {
  let countTasbeh = 0;
  loader.style.display = "block";
  setTimeout(() => {
    function calculateTasbeh() {
      countTasbeh++;
      if (btnTasbeh !== "33") {
        generalNum.textContent = `${countTasbeh}/33`;
        btnTasbeh.textContent = countTasbeh;
      } else {
        generalNum.textContent = `${0}/33`;
        btnTasbeh.textContent = `${0}`;
      }
    }
    btnTasbeh.addEventListener("click", calculateTasbeh);

    ScrollReveal().reveal("h4", { delay: 200, origin: "left" });
    ScrollReveal().reveal("#genNum", { delay: 300, origin: "right" });
    ScrollReveal().reveal("#btnTasbeh", { delay: 400, origin: "left" });
    ScrollReveal().reveal("#btnBackTasbeh", { delay: 500, origin: "right" });
    regionIcon.style.display = "none";
    qazoNamoz.style.display = "none";
    masjidMap.style.display = "none";
    googleMap.style.display = "none";
    tasbehIcon.style.display = "none";
    btnBackTasbeh.style.display = 'block';
    tasbehContent.style.display = "block";
    loader.style.display = "none";
  }, 3000);
});

//back to main page
btnBack.addEventListener("click", () => {
  window.location.reload();
});
btnBackMap.addEventListener("click", () => {
  window.location.reload();
});
btnBackQazo.addEventListener("click", () => {
  window.location.reload();
});
btnBackTasbeh.addEventListener("click", () => {
  window.location.reload();
});


