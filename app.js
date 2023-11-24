
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


var search_api = 'https://newsapi.org/v2/everything?'
'country=us&' +
    'apiKey=671c2352a3e84772ad22c3af60963139';


var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=671c2352a3e84772ad22c3af60963139';


var req = new Request(url);

fetch(req)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        showNews(data.articles);
    });


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        const searchUrl = search_api + '&q=' + searchTerm;
        fetch(searchUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                showNews(data.articles);
            });
        search.value = '';
    } else {
        window.location.reload();
    }
});


function showNews(card) {
    main.innerHTML = ''

    card.forEach((haber) => {
        const { source: {
            id,
            name
        }, description, urlToImage, publishedAt } = haber
        const newElement = document.createElement('div')
        newElement.classList.add('card')

        newElement.innerHTML = `
                <img src="${urlToImage}"
                        alt="${description}">

                 <div class="source">
                     <h1>${name}</h1>
                     <span>${publishedAt}</span>
                </div>

                <div class="overview">
                    <p>${description}</p>
                 </div>`

        main.appendChild(newElement)
    })
}

