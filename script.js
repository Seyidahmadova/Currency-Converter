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
    itemFrom1  = clickedClass1(item)
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
    itemTo1 = clickedClass2(item)
  });
});

input.addEventListener('input', function(event){
  var requestURL = `https://api.exchangerate.host/latest?base=${itemFrom1}&symbols=${itemTo1}`;
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    var response = request.response;
    var resp = input.value * response.rates[`${itemTo1}`]
    output.value = resp.toFixed(3)
    val1.innerHTML  = `1 ${itemFrom1} = ${response.rates[`${itemTo1}`]} ${itemTo1} `
    
  };

  var requestURL2 = `https://api.exchangerate.host/latest?base=${itemTo1}&symbols=${itemFrom1}`;
  var request2 = new XMLHttpRequest();
  request2.open("GET", requestURL2);
  request2.responseType = "json";
  request2.send();

  request2.onload = function () {
    var response2 = request2.response;
    val2.innerHTML  = `1 ${itemTo1} = ${response2.rates[`${itemFrom1}`]} ${itemFrom1} `
    
  };

  if(input.value == ''){
    output.value == ''
  }
})


function clickedClass1 (el){
    el = document.querySelector('.clicked')
    return el.innerText
}

function clickedClass2 (el){
  el = document.querySelector('.clicked1')
  return el.innerText
}




