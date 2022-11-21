const input = document.querySelector(".input");
const output = document.querySelector(".output");
const con = document.querySelectorAll(".con");
const con1 = document.querySelectorAll(".con1");
const val1 = document.querySelector(".val1");
const val2 = document.querySelector(".val2");

let itemFrom1;
let itemTo1;
con.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < con.length; i++) {
      con[i].classList.add("unclicked");
      con[i].classList.remove("clicked");
    }
    event.target.classList.remove("unclicked");
    event.target.classList.add("clicked");
    itemFrom1 = clickedClass1(item);
  });
});

con1.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < con.length; i++) {
      con1[i].classList.add("unclicked1");
      con1[i].classList.remove("clicked1");
    }
    event.target.classList.remove("unclicked1");
    event.target.classList.add("clicked1");
    itemTo1 = clickedClass2(item);
  });
});

input.addEventListener("input", function (event) {
  if (input.value != "") {
    if (itemFrom1 && itemTo1) {
      Fetching1();
      Fetching2();
    }
  }
});

con.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (itemFrom1 && itemTo1) {
      Fetching1();
      Fetching2();
    }
  });
});

con1.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (itemFrom1 && itemTo1) {
      Fetching1();
      Fetching2();
    }
  });
});

function clickedClass1(el) {
  el = document.querySelector(".clicked");
  return el.innerText;
}

function clickedClass2(el) {
  el = document.querySelector(".clicked1");
  return el.innerText;
}

function Fetching1() {
  fetch(
    `https://api.exchangerate.host/latest?base=${itemFrom1}&symbols=${itemTo1}`
  )
    .then((response) => response.json())
    .then((data) => {
      let resp = input.value * data.rates[`${itemTo1}`];

      if (!isNaN(resp.toFixed(3))) {
        output.value = resp.toFixed(3);
        val1.innerHTML = `1 ${itemFrom1} = ${
          data.rates[`${itemTo1}`]
        } ${itemTo1}`;
      } else {
        output.value = "";
      }
    })
    .catch((err) => {
      alert("Check your internet connection");
    });

  if (input.value == "") {
    output.value == "";
  }
}

function Fetching2() {
  fetch(
    `https://api.exchangerate.host/latest?base=${itemTo1}&symbols=${itemFrom1}`
  )
    .then((response1) => response1.json())
    .then((data1) => {
      val2.innerHTML = `1 ${itemTo1} = ${
        data1.rates[`${itemFrom1}`]
      } ${itemFrom1}`;
    })
    .catch((err) => {
      alert("Check your internet connection");
    });

  if (input.value == "") {
    output.value == "";
  }
}
