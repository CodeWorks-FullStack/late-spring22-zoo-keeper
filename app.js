console.log('js loaded');

let money = 0;
let lasClicked = '';
let combo = 0;

const animals = {
  koko:{
    hunger: 100,
    status: 'happy',
    emoji: '🦍'
  },
  jojo:{
    hunger: 100,
    status: 'happy',
    emoji: '🐒'
  },
  momo:{
    hunger: 100,
    status: 'happy',
    emoji: '🐅'
  },
  jeffery: {
    hunger: 100,
    status: 'happy',
    emoji: '🦎'
  },
  gloria: {
    hunger: 100,
    status: 'happy',
    emoji: '🦛'
  },
  sebastian: {
    hunger: 100,
    status: 'happy',
    emoji: '🦥'
  },
  dean: {
    hunger: 100,
    status: 'happy',
    emoji: '🦆'
  },
  jimmy: {
    hunger: 100,
    status: 'happy',
    emoji: '🐊'
  },
  einstein:{
    hunger: 100,
    status: 'happy',
    emoji: '🐢'
  }
}

function drawMoney(){
  // @ts-ignore
  document.querySelector('#cha-ching').play()
  document.getElementById('money').innerText = money.toFixed(2)
}

function drawAnimals(){
// create empty template
// add animals to tmeplate - loop
// inject template into html

  let template = ''
  for(let key in animals){
    let animal = animals[key]
    // console.log(key, animal);
    template += `
    <div id="${key}" class="col-6 col-md-4">
      <div class="pen">
          <marquee behavior="alternate" direction="right" scrolldelay="${Math.random()*1000}">
            <marquee behavior="alternate" direction="up" scrolldelay="${Math.random()*1000}">
              <h2 class="animal happy" onclick="feed('${key}')">
              ${animal.emoji}
              </h2>
            </marquee>
          </marquee>
        </div>
      <div class="progress">
        <div class="progress-bar bg-danger" role="progressbar" style="width: ${animal.hunger}%;" aria-valuenow="25"
          aria-valuemin="0" aria-valuemax="100">${key}</div>
      </div>
    </div>
    `
    document.getElementById('animal-pens').innerHTML = template
  }
}

function updateAnimal(name){
let animal = animals[name]
let animalPen = document.getElementById(name)
let animoji = animalPen.querySelector('.animal')
// console.log(animalPen);
// change animal status based on huger, the descending checks order matters.
if(animal.hunger > 70){
  animal.status = 'happy'
} else if( animal.hunger > 40){
  animal.status = 'normal'
} else if (animal.hunger > 0){
  animal.status = 'hungry'
} else  {
  animal.status = 'dead'
}
// console.log('status', animal);
// NOTE switch takes in a specific value and does code based on that action
switch(animal.status){
  case 'happy': 
      animoji.classList.add('happy')  
    break;
    case 'normal': 
      animoji.classList.remove('happy')
      animoji.classList.remove('hungry')
    break;
    case 'hungry' :
      animoji.classList.add('hungry')
      console.warn(name, 'is hungry');
    break;
    case 'dead': 
      animoji.classList.remove('hungry')
      console.error(name, 'is dead')
    // @ts-ignore
    animoji.innerText = '👻'
  break;
}

let bar = animalPen.querySelector('.progress-bar')
// console.log(bar);
// ignore when reaching into element attributes
// @ts-ignore
bar.style.width = animal.hunger + '%'
}

function hunger(){
  for(let key in animals){
    let animal = animals[key]
    if(animal.status != 'dead'){
      animal.hunger -= 6
      // NOTE CLAMP this just fixes the bars so they fully drain
      if(animal.hunger < 0){
        animal.hunger = 0
      }
      // console.log('hunger', animal)
      updateAnimal(key)
    }
  }
}

function feed(name){
  let animal = animals[name]
  // NOTE only do function if animal is not dead
  if(animal.status != 'dead'){
    if(lasClicked == name){
      animal.hunger += 2 + combo
      combo++
    } else {
      lasClicked = name
      combo = 0
    }
    //CLAMP don't over feed the animal
    if(animal.hunger > 100 ){
      if(combo > 15){
        animal.hunger =120
      } else {
        animal.hunger = 100
      }
    }
    updateAnimal(name)
  }
  // console.log('feed',animal);
}

function getMoney(){
  let moneyNow = money
  console.log(money);
  for(let key in animals){
    let animal = animals[key]
    console.log('get Money',animal);
    // NOTE switch takes in a specific value and does code based on that action
    switch(animal.status){
      case 'happy' : money += 12
      break;
      case 'dead': 
      break;
      default: money += 8
      break;
    }
  }
  console.log(moneyNow, money);
  // checks for if money increased, if it didn't don't re-draw or play the audio
  if(moneyNow != money){
    drawMoney()
  }
}


let hungerInterval = setInterval(hunger, 1000)
let moneyInterval = setInterval(getMoney, 10000)
// NOTE set your intervals to variables to they can be stopped at some point
// clearInterval(hungerInterval)

// NOTE how to update the interval
// function updateInterval(int, fn, time){
//   int = clearInterval(int)
//   int = setInterval(fn, time)
// }


drawAnimals()