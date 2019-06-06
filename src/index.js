const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function (){
  fetchToys()

  document.querySelector("#create-toy").addEventListener("click", handleAddToy)
})


///////////////////////////////////////////////////////////////////////////////

function handleAddToy(e){
  e.preventDefault()
  console.log(e.target.parentElement.name.value)
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
}



///////////////////////////////////////////////////////////////////////////////


function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    console.log(json)
    const toyCollection = document.querySelector("#toy-collection")
    json.forEach(toy => {
      console.log(toy)
      const div = document.createElement('div')
      div.class = "card"
      const h2 = document.createElement('h2')
      h2.innerText = toy.name
      div.appendChild(h2)
      const img = document.createElement('img')
      img.src = toy.image
      img.class = "toy-avatar"
      div.appendChild(img)
      const p = document.createElement('p')
      p.innerText = toy.likes
      div.appendChild(p)
      const btn = document.createElement('button')
      btn.class = "like-btn"
      div.appendChild(btn)
      toyCollection.appendChild(div)
      btn.addEventListener("click", (e) => (handleAddLike(e, toy)))
    })
  })
}

///////////////////////////////////////////////////////////////////////////////

function handleAddLike(e, toy) {
  console.log(toy.id)
  toy.likes += 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
  })
  .then(res => res.json())
}


///////////////////////////////////////////////////////////////////////////////


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
