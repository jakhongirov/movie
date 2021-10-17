const elList = document.querySelector('.list');
const elForm = document.querySelector('.form');
const elInput = document.querySelector('.input');
const elSelect = document.querySelector('.select');
const elBackBtn = document.querySelector('.back__btn');
const elNextBtn = document.querySelector('.next__btn');
const elTemplate = document.querySelector('.movie__template').content;

const API_KEY = 'e097de96';
let search = 'hulk';
let page = 1;

function renderMovies(arr, node) {

   const fragmetList = document.createDocumentFragment()

   node.innerHTML = null

	arr.forEach((row) => {

      const clonedMovieTemplate = elTemplate.cloneNode(true);

      clonedMovieTemplate.querySelector('.movie__img').src = row.Poster;
      clonedMovieTemplate.querySelector('.movie__img').alt = row.Title + ' image';
      clonedMovieTemplate.querySelector('.movie__heading').textContent = row.Title;
      clonedMovieTemplate.querySelector('.movie__info').textContent = row.Type;
      clonedMovieTemplate.querySelector('.movie__date').textContent = row.Year;
      clonedMovieTemplate.querySelector('.movie__btn').textContent = 'Watch';


		fragmetList.appendChild(clonedMovieTemplate);
	});

   node.appendChild(fragmetList)
}


async function getMovie(){

   const selectValue = elSelect.value;
   
   const res = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${search}&type=${selectValue}&page=${page}`);

   const data = await res.json();

   if(data.Search.length > 0){

      renderMovies(data.Search, elList);
   }

   if (page === 1) {

      elBackBtn.disabled = true;
   }else {
      elBackBtn.disabled = false
   }

}

elInput.addEventListener('change', (evt)=>{
   search = evt.target.value
   getMovie()
})


elForm.addEventListener('submit', (evt)=>{
   evt.preventDefault();
   
   search = elInput.value.trim();
   const selectValue = elSelect.value;

   elInput.value = null

   getMovie
})

elNextBtn.addEventListener('click', (evt)=>{
   page++
   
   getMovie()
});

elBackBtn.addEventListener('click', (evt)=>{
   page--
   
   getMovie()
})

getMovie()  