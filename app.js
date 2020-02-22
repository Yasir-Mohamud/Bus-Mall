'use strict';
var allProducts = [];
var imageOne = [];
var imageTwo = [];
var imageThree = [];
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var totalClicks = 0;
var results = document.getElementById('results');
// var totalclicks = 0;
// constuctor function for products
function Product (name,pathOfImage) {
  this.name = name;
  this.pathOfImage = pathOfImage;
  this.timesClicked = 0;
  this.timesrendered = 0;
  allProducts.push(this);

}

if (!localStorage.Product) {
  var bag = new Product ('Bag' ,'images/bag.jpg');
  var banana = new Product ('Banana','images/banana.jpg');
  var bathroom = new Product ('Bathroom','images/bathroom.jpg');
  var boots = new Product ('Boots','images/boots.jpg');
  var breakfast = new Product ('Breakfast','images/breakfast.jpg');
  var bubblegum = new Product ('Bubblegum','images/bubblegum.jpg');
  var chair = new Product ('Chair','images/chair.jpg');
  var cthulhu = new Product ('Cthulhu','images/cthulhu.jpg');
  var dog_duck = new Product ('Dog-duck','images/dog-duck.jpg');
  var dragon = new Product ('Dragon','images/dragon.jpg');
  var pen = new Product ('Pen','images/pen.jpg');
  var pet_sweep = new Product ('Pet-sweep','images/pet-sweep.jpg');
  var scissors = new Product ('Scissors','images/scissors.jpg');
  var shark = new Product ('Shark','images/scissors.jpg');
  var sweep = new Product ('Sweep','images/sweep.png');
  var tauntaun = new Product ('Tauntaun','images/tauntaun.jpg');
  var unicorn = new Product ('Unicorn','images/unicorn.jpg');
  var usb = new Product ('Usb','images/usb.gif');
  var water_can = new Product ('Water-can','images/water-can.jpg');
  var wine_glass = new Product ('Wine-glass','images/wine-glass.jpg');

} else {
  var storageData = fetchProductData('product');
  for(var i = 0; i < storageData.length;i++) {
    var existingProduct = new Product(storageData[i].name, storageData[i].image);
    existingProduct.timesClicked += storageData[i].timesClicked;
    existingProduct.timesrendered += storageData[i].timesrendered;
  }
};

imageOne.push(bag, banana , bathroom, boots,breakfast, bubblegum);
imageTwo.push(chair,cthulhu,dog_duck,dragon,pen,pet_sweep,scissors);
imageThree.push(shark,sweep,tauntaun,unicorn,usb,water_can,wine_glass);

/////////// creates random nuber for image index /////////////////////////
function getRandom (image) {
  var randomIndex = Math.floor(Math.random() * image.length);
  return image[randomIndex];
}

//////////////// renders images ///////////////////////
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

// ///////////////// sets data to the local storage ////////////////////////
function setProductData (key,data) {
  var turnsToString = JSON.stringify(data);
  localStorage.setItem(key , turnsToString);
}

////////// get data from the loval storage ////////////////////////////
function fetchProductData (key) {
  var productData = localStorage.getItem(key);
  return JSON.parse(productData);
}

////////// creates handleclick function for event listner /////////////////
function handleImageClick (event) {
  event.preventDefault();
  var id = event.target.getAttribute('alt');
  // code stops after user clicks 25 times
  if (totalClicks < 25 ) {
    totalClicks++;
    for (var i = 0; i < imageOne.length; i++) {
      if(id === imageOne[i].name) {
        imageOne[i].timesClicked++ ;
      }
    }
    for (var j = 0; j < imageTwo.length; j++) {
      if (id === imageTwo[j].name) {
        imageTwo[j].timesClicked++ ;
      }
    }
    for (var k = 0; k < imageThree.length; k++) {
      if (id === imageThree[k].name) {
        imageThree[k].timesClicked++ ;
      }
    }


    render();
  } else {
    alert('Thank You for your input');
    one.removeEventListener('click',handleImageClick);
    two.removeEventListener('click',handleImageClick);
    three.removeEventListener('click',handleImageClick);
    endOfSurvey();
    setProductData('product',allProducts);
    chartResults();
  }


}


/////////// ebent listeners for images being rendered into the DOM ///////////////
one.addEventListener('click',handleImageClick);
two.addEventListener('click',handleImageClick);
three.addEventListener('click',handleImageClick);
render();

//////// creates result list of products after the 25 clicks /////////////////
function endOfSurvey () {
  for(var i = 0; i < allProducts.length;i++) {
    var list = document.createElement('li');
    results.appendChild(list);
    list.textContent = (allProducts[i].name + ' had ' + allProducts[i].timesClicked + ' clicks and was shown ' + allProducts[i].timesrendered + ' times.' );

  }
}






/////////// label names for the chart ///////////////
function chartNames () {
  var names = [];
  for (var i = 0; i < allProducts.length ; i++) {
    names.push( allProducts[i].name);
  }
  return names;
}

////////Data of number of clicks for the chart //////////
function chartClickData () {
  var data = [];
  for (var i = 0; i < allProducts.length ; i++) {
    data.push(allProducts[i].timesClicked);
  }
  return data;
}

//////////// data of times rendered for chart ///////////////
function chartRenderedData () {
  var data = [];
  for (var i = 0; i < allProducts.length ; i++) {
    data.push(allProducts[i].timesrendered);
  }
  return data;

}
//////// repeats background colors fot the chart /////////////////
function repeatColor (color) {
  var repeat = 0;
  do {
    repeat++;
    return color;
  } while(repeat < 20);

}
var red = 'rgba(255, 99, 132, 0.2)';
var blue =  'rgba(54, 162, 235, 1)';

//////////////  creates results chart ///////////////
function chartResults () {
  var canvas = document.getElementById('clicks');
  var ctx = canvas.getContext('2d');
  new Chart (ctx , {
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

