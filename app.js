'use strict';
var allProducts = [];
var imageOne = [];
var imageTwo = [];
var imageThree = [];
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var totalClicks = 0;
var bestProducts = [];
var results = document.getElementById('results');
// var totalclicks = 0;
// constuctor function for products
function Product (name,pathOfImage) {
  this.name = name;
  this.pathOfImage = pathOfImage;
  this.timesClicked = 0;
  this.timesrendered = 0;
  this.best = [];
  allProducts.push(this);

}
// products
var bag = new Product ('Bag' ,'images/images/bag.jpg');
var banana = new Product ('Banana','images/images/banana.jpg');
var bathroom = new Product ('Bathroom','images/images/bathroom.jpg');
var boots = new Product ('Boots','images/images/boots.jpg');
var breakfast = new Product ('Breakfast','images/images/breakfast.jpg');
var bubblegum = new Product ('Bubblegum','images/images/bubblegum.jpg');
var chair = new Product ('Chair','images/images/chair.jpg');
var cthulhu = new Product ('Cthulhu','images/images/cthulhu.jpg');
var dog_duck = new Product ('Dog-duck','images/images/dog-duck.jpg');
var dragon = new Product ('Dragon','images/images/dragon.jpg');
var pen = new Product ('Pen','images/images/pen.jpg');
var pet_sweep = new Product ('Pet-sweep','images/images/pet-sweep.jpg');
var scissors = new Product ('Scissors','images/images/scissors.jpg');
var shark = new Product ('Shark','images/images/scissors.jpg');
var sweep = new Product ('Sweep','images/images/sweep.png');
var tauntaun = new Product ('Tauntaun','images/images/tauntaun.jpg');
var unicorn = new Product ('Unicorn','images/images/unicorn.jpg');
var usb = new Product ('Usb','images/images/usb.gif');
var water_can = new Product ('Water-can','images/images/water-can.jpg');
var wine_glass = new Product ('Wine-glass','images/images/wine-glass.jpg');



imageOne.push(bag, banana , bathroom, boots,breakfast, bubblegum);
imageTwo.push(chair,cthulhu,dog_duck,dragon,pen,pet_sweep,scissors);
imageThree.push(shark,sweep,tauntaun,unicorn,usb,water_can,wine_glass);

function getRandom (image) {
  var randomIndex = Math.floor(Math.random() * image.length);
  return image[randomIndex];
}
// renders images
function render () {
  var randomImageOne = getRandom(imageOne);
  one.setAttribute('src', randomImageOne.pathOfImage);
  one.setAttribute('alt', randomImageOne.name);
  randomImageOne.timesrendered++;
  var randomImageTwo = getRandom(imageTwo);
  two.setAttribute('src', randomImageTwo.pathOfImage);
  two.setAttribute('alt', randomImageTwo.name);
  randomImageTwo.timesrendered++;
  var randomImageThree = getRandom(imageThree);
  three.setAttribute('src', randomImageThree.pathOfImage);
  three.setAttribute('alt', randomImageThree.name);
  randomImageThree.timesrendered++;
}



function handleImageClick (event) {
  var id = event.target.getAttribute('alt');
  // code stops after user clicks 25 times
  if (totalClicks < 25 ) {
    totalClicks++;
    for (var i = 0; i < imageOne.length; i++) {
      if(id === imageOne[i].name) {
        imageOne[i].timesClicked++ ;
        bestProducts.push(id);
      }
    }
    for (var j = 0; j < imageTwo.length; j++) {
      if (id === imageTwo[j].name) {
        imageTwo[j].timesClicked++ ;
        bestProducts.push(id);

      }
    }
    for (var k = 0; k < imageThree.length; k++) {
      if (id === imageThree[k].name) {
        imageThree[k].timesClicked++ ;
        bestProducts.push(id);
      }
    }
    render();
  } else {
    alert('Thank You for your input');
    endOfSurvey();
    chartResults();
  }

  console.log('best' + bestProducts);

}



if (totalClicks < 25) {
  totalClicks++;
  one.addEventListener('click',handleImageClick);
  two.addEventListener('click',handleImageClick);
  three.addEventListener('click',handleImageClick);
  render();
} else {
  prompt('again?');
  if(prompt === 'yes') {
    totalClicks -= 25;
  }
}

// function removeDuplicates(arr) {
//   var result = [];
//   for (var i = 0; i < arr.length; i++) {
//     var dup = false;
//     for (var j = 0; j < results.length; j++) {
//       if (result[j] === arr[i]) {
//         dup = true;
//       }
//     }
//     if (!dup) {
//       results.push(arr[i]);
//     }
//   }
//   return results;
// }

// lists all the products that where clicked on
function endOfSurvey () {
  let orderedArr = bestProducts.reduce(function(accumulator,currentValue) {
    if (accumulator.indexOf(currentValue) === -1 ) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, [] );
  for(var i = 0; i < orderedArr.length;i++){
    var list = document.createElement('li');
    results.appendChild(list);
    for(var j = 0; j < allProducts.length;j++){
      if(orderedArr[i] === allProducts[j].name) {
        list.textContent = (allProducts[j].name + ' had ' + allProducts[j].timesClicked + ' clicks and was shown ' + allProducts[j].timesrendered + ' times.' );
      }
    }
  }
}

// label names for the chart
function chartNames () {
  var names = [];
  for (var i = 0; i < allProducts.length ; i++) {
    names.push( allProducts[i].name);
  }
  return names;
}
//Data of number of clicks for the chart
function chartClickData () {
  var data = [];
  for (var i = 0; i < allProducts.length ; i++) {
    data.push(allProducts[i].timesClicked);
  }
  return data;
}
//data of times rendered for chart
function chartRenderedData () {
  var data = [];
  for (var i = 0; i < allProducts.length ; i++) {
    data.push(allProducts[i].timesrendered);
  }
  return data;

}
// repeats background colors fot the chart
function repeatColor (color) {
  var repeat = 0;
  do {
    repeat++;
    return color;
  } while(repeat < 20);

}
var red = 'rgba(255, 99, 132, 0.2)';
var blue =  'rgba(54, 162, 235, 1)';

//creates results chart
function chartResults () {
  var canvas = document.getElementById('clicks');
  var ctx = canvas.getContext('2d');
  timesClickedChart = new Chart (ctx , {
    type: 'bar',
    data: {
      labels: chartNames(),
      datasets: [{
        label: '# of times clicked',
        data: chartClickData(),
        backgroundColor: repeatColor (red) ,
        borderColor: repeatColor (red) ,
        borderWidth: 1
      },{
        label: '# of times rendered',
        data: chartRenderedData(),
        backgroundColor: repeatColor(blue),
        borderColor: repeatColor(blue),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}
