document.addEventListener('DOMContentLoaded', function() {
	addBtn_event()

	let btn = document.querySelector('input.submit').addEventListener('click', submit_new_toy)
	fetch_toys()
})

function submit_new_toy(e) {
	let form = e.target.parentElement.children
	toy = {
		name: form[1].value,
		image: form[3].value,
		likes: 0
	}
	add_toy(toy)
}

function display_toys(obj_arr) {
	obj_arr.forEach(toy => {

		const div = document.createElement('div')
		div.dataset.id = toy.id
		div.className = 'card'

		const img = document.createElement('img')
		img.src = toy.image
		img.className = 'toy-avatar'

		const h2 = document.createElement('h2')
		h2.innerText = toy.name

		const p = document.createElement('p')
		p.innerText = 'Likes: '+toy.likes

		const like_btn = document.createElement('button')
		like_btn.innerText = 'Like this toy!'
		like_btn.className = 'like-btn'
		like_btn.addEventListener('click', like_toy)

		const del_btn = document.createElement('button')
		del_btn.innerText = 'Delete'
		del_btn.className = 'like-btn'
		del_btn.addEventListener('click', handleDeleteBtn)

		div.appendChild(img)
		div.appendChild(h2)
		div.appendChild(p)
		div.appendChild(like_btn)
		div.appendChild(del_btn)

		const all_toys_div = document.querySelector('div#toy-collection')
		all_toys_div.appendChild(div)
	})
}

function like_toy(e) {
	let card = e.target.parentElement.children
	let toy = {
		id: e.target.parentElement.dataset.id,
		name: card[1].innerText,
		image: card[0].src,
		likes: parseInt(card[2].innerText.split(' ')[1])+1
	}
	update_toy(toy)
	e.target.parentElement.children[2].innerText = 'Likes: '+(parseInt(card[2].innerText.split(' ')[1])+1)
}

function handleDeleteBtn(e) {
	if ( confirm('Are you sure?') ) {
		delete_toy(e.target.parentElement.dataset.id)
		e.target.parentElement.remove()
	}
}

// FETCH METHODS

function fetch_toys() {
	return fetch('http://localhost:3000/toys')
	.then( res => test = res.json() )
	.then( json => display_toys(json) )
}

function add_toy(toy) {
  return fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  }).then((res)=>res.json())
}

function update_toy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  }).then((res)=>res.json())
}

function delete_toy(id) {
  return fetch(`http://localhost:3000/toys/${id}`,{
    method: 'DELETE'
  }).then((res)=>res.json())
}

// ...

function addBtn_event() {
	const addBtn = document.querySelector('#new-toy-btn')
	const toyForm = document.querySelector('.container')
	let addToy = false

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
}
