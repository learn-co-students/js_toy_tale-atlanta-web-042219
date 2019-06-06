const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector(".add-toy-form")
let addToy = false

// YOUR CODE HERE

  document.addEventListener('DOMContentLoaded', function(){
  newToyForm.addEventListener('submit', handleCreateToy)
  getToys()
})

function getToys(){
 fetch("http://localhost:3000/toys")
.then((res)=> res.json())
.then((data)=>{addToys(data)
})
}

function addToys(toys){
  toys.forEach(toy=>{
    addNewToy(toy)
  })
  
}


function addNewToy(toy){
  const toy_list = document.querySelector("#toy-collection")
  const div = document.createElement('div')
  div.className = "card"
  const h2 = document.createElement("h2")
  h2.textContent = toy.name  
  const image = document.createElement("img")
  image.src = toy.image
  image.className = "toy-avatar"
  const p = document.createElement("p")
  p.innerText = toy.likes
  const button = document.createElement("button")
  button.innerText = "Like <3"
  button.className = "like-btn"


  
  div.appendChild(h2)
  div.appendChild(image)
  div.appendChild(p)
  div.appendChild(button)
  toy_list.appendChild(div)
}

function handleCreateToy(e){
  e.preventDefault()
  const name = e.target.name.value
  const img = e.target.image.value
  const likes = 0
  const toyInfo = {"name": name, "image": img, "likes": likes}
  insertToy(toyInfo)
  
}





function insertToy(toy){
  return fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      'Content-Type':'application/json'
    }, 
    body: JSON.stringify(toy)
  })
  .then((res)=>res.json())
  
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
