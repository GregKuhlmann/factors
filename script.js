var level = 0;
var totalTime = 0;
var factors = [-1, -1];
var correct = 0;
var stars = 0;

var products = [];
for (var i = 2; i < 13; i++) {
  for (var j = 2; j < 13; j++) {
    var prod = i * j;
    if (!products.includes(prod)) {
      products.push(prod);
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(products);
var maxLevel = products.length;

function setLevel() {
  factors = [-1, -1];

  document.getElementById("product").innerHTML = products[level];
  document.getElementById("factor1").innerHTML = "";
  document.getElementById("factor2").innerHTML = "";

  var h = Math.floor(Math.random() * 360);
  var bgColor = "hsl(" + h + ", 60%, 80%)";
  document.getElementById("bdy").style.background = bgColor;
  document.getElementById("problem").innerText = `${level + 1} of ${maxLevel}`;
  document.getElementById("submit").className = "hidden";
}

function setBackground(wallpaper) {
  document.getElementById("bdy").className = wallpaper;
}

function handleButton(button) {
  var pos = button.id.substring(6, 7);
  var num = button.id.substring(8);
  var div = document.getElementById(`factor${pos}`);
  var submit = document.getElementById("submit");
  if (num == "del") {
    div.innerHTML = "";
    factors[pos - 1] = -1;
    submit.className = "hidden";
  } else {
    div.innerHTML = num;
    factors[pos - 1] = num;
    if (factors[pos % 2] != -1) {
      submit.className = "";
    }
  }
}

function handleSubmit() {
  if (products[level] == factors[0]*factors[1]) {
    correct += 1;
  } else {
    alert('That is incorrect!')
  }
  level += 1;
  document.getElementById('score').innerHTML = `${(correct*100/level).toFixed(2)}%`;
  if (level == maxLevel) {
    document.getElementById('submit').className = "hidden";
    document.getElementById('done').className = "";
    clearInterval(tick);
  } else {
    setLevel();
  }
}

setLevel();

var tick = setInterval(function () {
  totalTime += 1;
  minutes = Math.floor(totalTime / 60);
  seconds = totalTime % 60;
  document.getElementById("totalTime").innerHTML =
    minutes + "m " + seconds + "s ";
}, 1000);
