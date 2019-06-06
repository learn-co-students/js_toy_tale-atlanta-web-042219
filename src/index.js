const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    document.querySelector('.add-toy-form').addEventListener('submit', handleCreateToy)
  } else {
    toyForm.style.display = 'none'
  }
})

// ------------------------------------------------------- //

function getData() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => addToys(json))
    .catch(err => console.log(err));
}

getData();

// ------------------------------------------------------- //

function addToys(toys){
  toys.forEach(toy =>{
    addNewToy(toy)
  })
}

// ------------------------------------------------------- //

function handleCreateToy(e) {
  e.preventDefault()

  let toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

  insertToy(toy)
    .then((toy) => addNewToy(toy))
    // .then((toy) => console.log(toy))
}

// ------------------------------------------------------- //

function insertToy(toy){
  return fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then((res)=>res.json())
}

// ------------------------------------------------------- //

function handleLikeButton(e) {
  // console.log(e.target.parentElement.children)

  let toy = {
    id: e.target.parentElement.dataset.id,
    likes: parseInt(e.target.parentElement.children[2].innerText) + 1
  }

  updateToy(toy);

  e.target.parentElement.children[2].innerText = parseInt(e.target.parentElement.children[2].innerText) + 1
}

// ------------------------------------------------------- //

function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
    })
    .then((res)=>res.json())
}

// ------------------------------------------------------- //

function addNewToy(toy) {
  const toyCollection = document.getElementById('toy-collection')

  const div = document.createElement('div')
  div.className = "card"
  div.dataset.id = toy.id

  const h2 = document.createElement('h2')
  h2.textContent = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  const p = document.createElement('p')
  p.innerText = toy.likes

  const button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like"
  button.addEventListener("click", handleLikeButton)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  toyCollection.appendChild(div)
}
