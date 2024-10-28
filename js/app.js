
/*Алгоритм 
1. Зарегистрироваться и получить API KEY на сайте https://kinopoiskapiunofficial.tech
2. Определить константы:
Запрос на выдачу Популярных фильмов
https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1
Запрос на поиск фильмов
https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=
3. Написать функцию получения фильмов по запросу
4. Написать функцию показа фильмов на страничке: в div .movies для каждого фильма нужно добавить 
новый элемент div с классом.movie и использовать innerHTML для структуры div и использовать там 
получаемые значения для каждого фильма (${movie.posterUrlPreview}, ${movie.nameRu} и тд 
)
5. Написать функцию поиска - использовать Url на поиск фильмов
6. Реализовать изменение цвета рейтинга по значению: зеленый -рейтинг больше 7, желтый от 5 до 7, красный меньше 5
*/
//API https://kinopoiskapiunofficial.tech/api/v1/api_keys/4HBJDFT-HHE4AY6-KR4NYSV-8K9HVAY
const API_KEY = "3f533e71-2dd7-438d-a702-1410261af25c";
const API_URL_POPULAR ="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH ="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const MyKey = "4HBJDFT-HHE4AY6-KR4NYSV-8K9HVAY"
const PopularFilms = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const FindFilms = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const form = document.querySelector('form');
const StrPoisk = document.querySelector('input');

getFilm(PopularFilms);
async function getFilm(url) {
    const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      });
    let json
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
        json = await response.json();
    } else {
    alert("Ошибка HTTP: " + response.status);
    }
    //console.log(json.films);
    showMovies(json.films);
}


function showMovies(movies) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        const ratingColor = getRatingColor(movie.rating);
        movieElement.innerHTML = `
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
            <h3>${movie.nameRu}</h3>
            <span class="${ratingColor}">${movie.rating}</span>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

form.addEventListener('submit', function(event){
    event.preventDefault();
    let searcnValue = String(StrPoisk.value);
    StrPoisk.value = '';
    const SEARCH_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searcnValue}`;
    getFilm(SEARCH_URL);
})

function getRatingColor(rating) {
    if (rating > 7) {
        return 'movie__average--green';
    } else if (rating >= 5) {
        return 'movie__average--orange';
    } else {
        return 'movie__average--red';
    }
}
