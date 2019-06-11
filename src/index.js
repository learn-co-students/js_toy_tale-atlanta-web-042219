document.addEventListener('DOMContentLoaded', function() {

	// VARIABLES
	const TOYS_URL = 'http://localhost:3000/toys'
	const toyForm = document.getElementById('add-toy-form')
	const tfc = toyForm.parentElement // toy form container

	// MAIN
	document.addEventListener('click', handleClickEvents)
	fetch_toys()

	//											//
	// FUNCTION DEFINITIONS //
	//											//
	function handleClickEvents(e) {
		if(e.target.id === 'new-toy-btn')
			tfc.style.display = tfc.style.display === 'block' ? 'none' : 'block'
		else if (e.target.id === 'submit-new-toy')
			add_new_toy(e)
		else if(e.target.className === 'like-btn')
			like_toy(e.target.parentElement.parentElement.children[2].children[0])
		else if(e.target.className === 'delete-btn')
			delete_toy(e.target.parentElement.parentElement)
	}

	function add_new_toy(e) {
		e.preventDefault()
		fetch(TOYS_URL,{
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				'name': toyForm.name.value,
				'image': toyForm.image.value,
				'likes': '0'
			})
		})
		.then(resp => resp.json())
		.then(show_toy)
		.then(toyForm.reset())
	}

	function like_toy(likeSpan) {
		likeSpan.innerText = parseInt(likeSpan.innerText)+1
		fetch(TOYS_URL+'/'+likeSpan.dataset.toyId,{
			method: 'PATCH',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify( {'likes' : likeSpan.innerText} )
		})
	}

	function delete_toy(toyDiv) {
		console.log(toyDiv)
		fetch(TOYS_URL+'/'+toyDiv.dataset.toyId, {method: 'DELETE'})
		.then(toyDiv.remove())

	}

	function fetch_toys() {
		fetch(TOYS_URL)
		.then(resp => resp.json())
		.then(json => json.forEach(show_toy))
	}

	function show_toy(toy) {
		document.getElementById('toy-box').innerHTML += `
			<div class="toy-card" data-toy-id=${toy.id}>
		    <h2>${toy.name}</h2>
		    <img src="${toy.image}" class="toy-avatar"/>
		    <p><span data-toy-id=${toy.id}>${toy.likes}</span> Likes</p>
		    <div class="btn-div">
			    <button class="like-btn">Like</button>
			    <button class="delete-btn">Delete</button>
		    <div>
	  	</div>`
	}

	// END //
})
