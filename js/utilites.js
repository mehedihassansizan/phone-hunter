const loadPhone = async(searchText, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, limit)
}

const displayPhone = (data, limit) => {
    // console.log(data);
    const parentDiv = document.getElementById('card-body')
    parentDiv.innerHTML ='';

    const noMatch = document.getElementById('no-match')
    if (data == 0) {
        noMatch.classList.remove('d-none')
    } else {
        noMatch.classList.add('d-none')
    }

    const showMoreBtn = document.getElementById('show-more')
    if (limit && data.length > 6) {
        data = data.slice(0, 6);
        showMoreBtn.classList.remove('d-none')
    } else {
        showMoreBtn.classList.add('d-none')
    }

    data.forEach(element => {
        // console.log(element);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML =`
        <div class="card">
          <img src="${element.image}" class="p-4 card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="viewDetails('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
          </div>
        </div>
        `;
        parentDiv.appendChild(div)
        trogolFuntion(false)
    });
}

const searchOperation = (data) => {
    const inputFiled = document.getElementById('input-filed')
    const inputFiledValue = inputFiled.value;
    loadPhone(inputFiledValue, data)
}

const trogolFuntion = (data) => {
    const spinner = document.getElementById('spinner')
    if(data){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

document.getElementById('input-filed').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        searchOperation(6)
    }
})

document.getElementById('Search-btn').addEventListener('click', function () {
    searchOperation(6)
    trogolFuntion(true)
})

document.getElementById('show-more').addEventListener('click', function () {
    searchOperation();
    // console.log('hi');
})

const viewDetails = async(slug) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${slug}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.data)
}
const displayDetails = (data) =>{
    console.log(data);
    const exampleModalLabel = document.getElementById('exampleModalLabel');
    exampleModalLabel.innerText = data.name;
    const detailsBody = document.getElementById('details-body')
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
        <ul>
            <li>Storage: ${data.mainFeatures ? data.mainFeatures.storage : 'No data Found'}</li>
            <li>DisplaySize: ${data.mainFeatures.displaySize} </li>
            <li>Release Date: ${data.releaseDate} </li>
        </ul>
    `;

    detailsBody.appendChild(newDiv);
}

// loadPhone('apple')
