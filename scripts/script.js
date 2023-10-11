'use strict'

const selector = document.querySelector('.movies-select');
const container = document.querySelector('.container')

const renderSelector = (cards, movies) => {
    movies.forEach(item => {
        selector.insertAdjacentHTML('beforeend',
            `
            <option value="${item}">${item}</option>
            `)
    });

    selector.addEventListener('change', (e) => {
        if (!e.target.value) {
            render(cards)
        } else {
            let list = cards.filter((item) => {
                if (item.movies) {
                    return item.movies.includes(e.target.value)
                }
            });

            render(list)
        };
    })
}

const render = (heroes) => {
    container.innerHTML = ''

    heroes.forEach(item => {
        const movies = item.movies ? item.movies.join(', ') : ''

        container.insertAdjacentHTML('beforeend',
            `
            <div class="card">
                <div class="face face1">
                    <div class="content">
                        <img src="./assets/image/${item.photo}" alt="${item.name}"">
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <h3 class="hero">${item.name} (${item.actors})</h3>
                        <p class="movies"><span>Movies:</span> ${movies}</p>
                        <p class="status"><span>Status:</span> ${item.status}</p>
                    </div>
                </div>
            </div>
        `)
    });
};

const getData = (url) => {
    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const movies = new Set()

            data.forEach((item) => {
                if (item.movies) {
                    item.movies.forEach((movie) => {
                        movies.add(movie.trim());
                    })
                }
            })

            renderSelector(data, movies)
            render(data)
        })
        .catch(error => {
            console.log(error);
        })
};

getData('../assets/dbHeroes.json')