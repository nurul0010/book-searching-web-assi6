// event listener 
document.getElementById('search-btn').addEventListener('click', function () {
    document.getElementById('spinner').classList.remove('d-none');

    const inputText = document.getElementById('search-text');
    const searchName = inputText.value;
    inputText.value = '';

    if (searchName.length < 1) {
        const empty = document.getElementById('no-result');
        empty.innerText = '"can not search without search text"';

        document.getElementById('spinner').classList.add('d-none');
    }
    else {
        fetch(`https://openlibrary.org/search.json?q=${searchName}`)
            .then(res => res.json())
            .then(data => displayData(data.docs))
    }

});

// arrow function for display data 
const displayData = (result) => {

    // console.log(result)
    if (result.length === 0) {
        document.getElementById('spinner').classList.add('d-none');

        const noResult = document.getElementById('no-result');
        noResult.innerText = 'Sorry! No Result Found by';

    }
    else {
        // display result length 
        document.getElementById('spinner').classList.add('d-none');

        const resultQuantity = document.getElementById('result-quantity');
        resultQuantity.innerText = `"results found nareby ${result.length}"`;

        const container = document.getElementById('container');
        container.innerHTML = '';

        result.forEach(element => {
            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
    <div class="card h-100">
        <img width="250px" height="300px" src="https://covers.openlibrary.org/b/id/${element?.cover_i}-L.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">Author Name: ${element.author_name}</p>
        <p class="card-text">Publisher: ${element.publisher_facet}</p>
        <p class="card-text">First publish year: ${element.first_publish_year}</p>
        </div>
    </div>       
    `
            container.appendChild(div);
        });
    }

};