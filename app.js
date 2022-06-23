'use strict';

let imageEls = document.querySelectorAll('img');
let currentDisplay = [];

let roundTracker = 0;

let fileNames = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',
];

let images = read() || [];

function Image(fileName) {
  this.id = fileName;
  this.clicks = 0;
  this.views = 0;
  this.src = `./img/${fileName}`;
}

Image.prototype.handleClick = function () {
};

if (!images.length) {
  for (let i = 0; i < fileNames.length; i++) {
    images.push(new Image(fileNames[i]));
  }
}


imageEls[0].id = images[0].id;
imageEls[0].src = images[0].src;
images[0].views++;
imageEls[1].id = images[1].id;
imageEls[1].src = images[1].src;
images[1].views++;
imageEls[2].id = images[2].id;
imageEls[2].src = images[2].src;
images[2].views++;

function handleClick(event) {
  for (let i = 0; i < images.length; i++) {
    if (event.target.id === images[i].id) {
      images[i].clicks++;
    }
  }
  if (roundTracker === 25) {
    let imageElement = document.getElementById('image-selection');
    imageElement.innerHTML = 'Voting Has Ended, Thank You!';
    let button1AddElement = document.getElementById('results-button');
    button1AddElement.hidden = false;
    let button2AddElement = document.getElementById('nuke-button');
    button2AddElement.hidden = false;
    return;
  }
  renderImages();
  // console.log(images);
  roundTracker++;
  console.log(roundTracker);
  save();
}

imageEls.forEach(function (img) {
  img.addEventListener('click', handleClick);
});

function renderImages() {
  let image1 = generateRandomImage();
  let image2 = generateRandomImage();
  let image3 = generateRandomImage();

  while ((image1.id === image2.id) || (image1.id === image3.id)) {
    image1 = generateRandomImage();
  }
  while (image2.id === image3.id) {
    image2 = generateRandomImage();
  }
  
  imageEls[0].id = image1.id;
  imageEls[0].src = image1.src;
  image1.views++;
  imageEls[1].id = image2.id;
  imageEls[1].src = image2.src;
  image2.views++;
  imageEls[2].id = image3.id;
  imageEls[2].src = image3.src;
  image3.views++;

  console.log(imageEls[0].id);
  console.log(imageEls[1].id);
  console.log(imageEls[2].id);

  currentDisplay[0] = image1.id;
  currentDisplay[1] = image2.id;
  currentDisplay[2] = image3.id;

}

function generateRandomImage() {
  let index = Math.floor(Math.random() * images.length);

  if (currentDisplay.includes(images[index].id)) {
    return generateRandomImage();
  } else {
    return images[index];
  }
}

////save data to local storage///

function save() {
  let data = JSON.stringify(images);
  localStorage.setItem('state', data);

}

///retrieves application state from local storage///
function read() {
  let ValueFromLocalStorage = localStorage.getItem('state');
  return JSON.parse(ValueFromLocalStorage);
}



Image.prototype.renderResults = function () {
  const parentElement = document.getElementById('results-table');
  const article = document.createElement('article');
  parentElement.appendChild(article);

  const h2 = document.createElement('h2');
  h2.textContent = this.id + " had " + this.clicks + " clicks and was viewed " + this.views + " times";
  article.appendChild(h2);
};



let buttonEl = document.getElementById('results-button');

buttonEl.addEventListener('click', function () {
  voteResults();
});

let buttonEl2 = document.getElementById('nuke-button');

buttonEl2.addEventListener('click',function() {
  localStorage.clear();
});


//// generate chart data arrays///

let clicksArray = [];
let viewsArray = [];


function voteResults() {



  for (let i = 0; i < images.length; i++) {

    clicksArray.push(images[i].clicks);
    viewsArray.push(images[i].views);
  }

  ////create chart////

  let chartEl = document.getElementById('my-chart');
  let ctx = chartEl.getContext('2d');

  let myChart = new Chart(ctx, {
    type: 'bar',
    options: {
      layout: {
        padding: 80
      }
    },
    data: {
      labels: fileNames,
      datasets: [{
        label: '# of clicks',
        data: clicksArray,
        backgroundColor: 'green',
      },

      {
        label: '# of Views',
        data: viewsArray,
        backgroundColor: 'blue',
      }
      ]
    },

  });
}
