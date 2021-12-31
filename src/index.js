let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')
const toyName = document.querySelector('.input-text')
const toySubmit = document.querySelector('.submit')



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Gets toys from JSON
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyJSON => {
      toyJSON.forEach(toy => {
        let toyDiv = document.createElement('div')
        toyDiv.classList.add('card')
        toyDiv.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar">
          <p>${toy.likes} likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
        `

        //updates likes
        const toyLike = toyDiv.querySelector('.like-btn').addEventListener('click', (e) => {
          toy.likes += 1
          toyDiv.querySelector('p').textContent = `${toy.likes} likes`
          updateLikes(toy)
        })

        toyCollection.appendChild(toyDiv)
      })
 
  })

});






//POSTS new toy

function handleSubmit(e) {
  e.preventDefault()
  let toyObject = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderToy(toyObject)
  sendToy(toyObject)
}

function sendToy(toy) {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
}


function renderToy(toy){
  let toyDiv = document.createElement('div')
  toyDiv.classList.add('card')
  toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `
  toyCollection.appendChild(toyDiv)
}


function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
  .then(toy => console.log(toy))
}


//Event Listeners

toyForm.addEventListener('submit', handleSubmit)


