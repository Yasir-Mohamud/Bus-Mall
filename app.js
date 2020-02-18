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

function render () {
  one.setAttribute('src', getRandom(imageOne).pathOfImage);
  one.setAttribute('alt', getRandom(imageOne).name);
  getRandom(imageOne).timesrendered++;
  two.setAttribute('src', getRandom(imageTwo).pathOfImage);
  two.setAttribute('alt', getRandom(imageTwo).name);
  getRandom(imageTwo).timesrendered++;
  three.setAttribute('src', getRandom(imageThree).pathOfImage);
  three.setAttribute('alt', getRandom(imageThree).name);
  getRandom(imageThree).timesrendered++;
}



function handleImageClick (event) {
  var id = event.target.getAttribute('alt');
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


function endOfSurvey () {
  // var list = document.createElement('li');
  for(var i = 0; i < bestProducts.length;i++){
    var list = document.createElement('li');
    for(var j = 0; j < allProducts.length;j++){
      if(bestProducts[i] === allProducts[j].name)
        list.textContent = (allProducts[j].name + ' had ' + allProducts[j].timesClicked + ' and was shown ' + allProducts[j].timesrendered + ' times.' );
      results.appendChild(list);
    }

  }

}
