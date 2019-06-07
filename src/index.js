const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('#create-toy').addEventListener('click', handleAddToy)
  fetchToys()
})

function handleAddToy(e) {
  e.preventDefault()
  const formData = e.target.parentElement
  const newToy = {
    'name': formData.name.value,
    'image': formData.image.value,
    'likes': 0
  }
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => {
    toyToPage(toy)
    toyForm.firstElementChild.reset()
    addToy = false
    toyForm.style.display = 'none'
  })
}

function handleLike(e, toy) {
  toy.likes += 1
  e.target.parentElement.querySelector('p').innerText = toy.likes
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(res => res.json())
}

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => addToys(json))
}

function addToys(toys) {
  toys.forEach(toy => {
    toyToPage(toy)
  })
}

function toyToPage(toy){
  const toyCollection = document.querySelector("#toy-collection")

  const div = document.createElement('div')
  div.class = "card"
  const name = document.createElement('h2')
  name.innerText = toy.name
  const img = document.createElement('img')
  img.src = toy.image
  img.class = "toy-avatar"
  const likes = document.createElement('p')
  likes.innerText = toy.likes
  const btn = document.createElement('button')
  btn.class = 'like-btn'

  div.appendChild(name)
  div.appendChild(img)
  div.appendChild(likes)
  div.appendChild(btn)

  btn.addEventListener('click', e => (handleLike(e, toy)))
  toyCollection.appendChild(div)
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
