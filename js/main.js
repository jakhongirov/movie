const elList = document.querySelector('.list');
const elForm = document.querySelector('.form');
const elInput = document.querySelector('.input');
const elPage= document.querySelector('.input__page');
const elSelect = document.querySelector('.select');


function renderMovies(arr, node) {

   const fragmetList = document.createDocumentFragment()

   node.innerHTML = null

	arr.Search.forEach((row) => {
		const newli = document.createElement('li');
      const newHeading = document.createElement('h3');
		const newstrong = document.createElement('strong');
      const newImage = document.createElement('img');
      const newBtn = document.createElement('button');

		newHeading.textContent = row.Title;
		newstrong.textContent =  row.Year;
      newBtn.textContent = 'Watch';
      
      newli.setAttribute('class', 'movie__item');

      newImage.setAttribute('src', row.Poster);
      newImage.setAttribute('width', '200');
      newImage.setAttribute('height', '200');
      newImage.setAttribute('alt',  row.Title +' image')

      newHeading.setAttribute('class', 'movie__heading');
      newstrong.setAttribute('class', 'movie__date');
      newBtn.setAttribute('class', 'movie__btn btn');

      newli.appendChild(newImage);
      newli.appendChild(newHeading);
		newli.appendChild(newstrong);
      newli.appendChild(newBtn);

		fragmetList.appendChild(newli);
	});

   node.appendChild(fragmetList)
}

const API_KEY = 'e097de96'

elForm.addEventListener('submit', (evt)=>{
   evt.preventDefault();
   
   const inputValue = elInput.value.trim();
   const selectValue = elSelect.value;

   const pageValue = elPage.value.trim();

   fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${inputValue}&type=${selectValue}&page=${pageValue} `)
      .then((res) => res.json())
      .then((data) => renderMovies(data, elList));

   elInput.value = null

})

