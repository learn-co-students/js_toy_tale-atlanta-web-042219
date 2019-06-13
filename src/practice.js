document.addEventListener('DOMContentLoaded', () => {
  const baseURL = `http://localhost:3000/toys`

  fetchToys()


// --- FETCH --- //

  function fetchToys() {
    fetch(baseURL)
    .then (resp => resp.json())
    .then (data => data.forEach(showToys))
  }


// --- SHOW TOYS --- //

  function showToys(toy) {
    console.log(toy)

    let toyCollection = document.getElementById('toy-collection')
    let card = document.createElement('div')
    card.className = 'card'

    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name

    let image = document.createElement('img')
    image.className = 'toy-avatar'
    image.src = toy.image

    let p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`

    let button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = 'Like <3'
    button.dataset.id = toy.id

    toyCollection.append(card)
    card.append(h2, image, p, button)
  }


// --- END --- //

})