const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', () => {
  fetchToys()
})
document.body.addEventListener('click', handleLikes)

function fetchToys(){ 
 fetch('http://localhost:3000/toys')
 .then(res => res.json())
 .then(addToys) 
}

function addToys(toy){
  // console.log(toy)
  toy.forEach(toy => showToy(toy))
}

function showToy(toy){
  let toyDiv = document.getElementById('toy-collection')
  // console.log(toyDiv)
  let div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    Likes<p>${toy.likes}</p>
    <button class="like-btn" data-id=${toy.id}>Like <3</button>`

  //append
  toyDiv.appendChild(div)
  // console.log(div)
}

function createToy(e){
  e.preventDefault()
  // console.log('test', e.target)

  let inputs = document.querySelectorAll('.input-text')
  // console.log(inputs)
  let toyName = inputs[0].value
  let toyImage = inputs[1].value 

  let newToy = {
    name: toyName,
    image: toyImage,
    likes: 0
  }
  
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      body: JSON.stringify(newToy),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(showToy, toyForm.style.display = 'none')
  }

  function handleLikes(e){
  // console.log(e.target.className)
    if(e.target.className === 'like-btn'){
      // console.log('liked', e)
      // console.log(e.target.parentElement.innerText)
      let likeValue = e.target.parentElement.querySelector('p').innerText
      let newValue = parseInt(likeValue)
      // console.log('does this work', newValue)
      let likeBox = e.target.parentElement.querySelector('p')
      // console.log(likeBox)
      likeBox.innerText = `${++newValue}`
      let id = e.target.dataset.id
    
  fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"likes": newValue}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    // .then(console.log)
    }
  }
