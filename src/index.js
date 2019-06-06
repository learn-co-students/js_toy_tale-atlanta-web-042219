document.addEventListener('DOMContentLoaded', function(){
    fetchToys();
    // insertToys();

    // document.querySelector('#update').addEventListener('click', handleUpdateToy)

})


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    document.querySelector('.add-toy-form').addEventListener('submit',  handleCreateToy)
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function handleCreateToy(e){

    e.preventDefault()

    let toy  = {
        name: e.target.name.value,
        img: e.target.image.value,
        likes: 0
    }

    insertToys(toy)
    addNewToy(toy)

    e.target.reset()
}


function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json=> addToys(json))
  .catch(error=>console.log(error));
}
// fetchToys()
function insertToys(toy){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then((res)=>res.json())
}

function addToys(toys){
    toys.forEach(toy =>{
        addNewToy(toy)
    })
}

function handleLikeButton(e){
  let toy =
  id: e.target.parentElement.dataset.id,
  likes: parseInt(e.target.parentElement.children[2].innerText) +1}
  updateToy(toy)
  e.target.parentElement.children[2].innerText = parseInt(e.target.parentElement.children[2].innerText)+1
}

function updateToy(toy){
  return fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then((res)=>res.json())
}

function addNewToy(toy){
  const toy_gallery = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = toy.id

  const h2 = document.createElement('h2')
  h2.textContent = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  const p = document.createElement('p')
  p.textContent = toy.likes

  const likeBtn = document.createElement('button')
  likeBtn.innerText = "Like"
  likeBtn.className = "like-btn"
  likeBtn.addEventListener('click', handleLikeButton)

  div.appendChild(img)
  div.appendChild(h2)
  div.appendChild(p)
  div.appendChild(likeBtn)
  toy_gallery.appendChild(div)
}
