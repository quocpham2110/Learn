fetch('products.json')
    .then(response => response.json())
    .then(json => {
        let products = json;
        initialize(products);
    })
    .catch(console.log);

function initialize(products) {
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');

    let lastCategory = category.value;
    let lastSearch = '';

    let categoryGroup;
    let finalGroup;

    categoryGroup = products;
    finalGroup = categoryGroup;
    updateDisplay();

    categoryGroup = [];
    finalGroup = [];

    // category.onchange = selectCategory;
    searchBtn.onclick = selectCategory;
    
    function selectCategory(e) {
        e.preventDefault();

        categoryGroup = [];
        finalGroup = [];

        if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else {
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();

            if (category.value === 'All') {
                categoryGroup = products;
                selectProducts();
            } else {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].type === category.value.toLowerCase()) {
                        categoryGroup.push(products[i]);
                    }
                }
                selectProducts();
            }
        }
    }

    function selectProducts() {
        // e.preventDefault();
        if (searchTerm.value.trim() === '') {
            finalGroup = categoryGroup;
            updateDisplay();
        } else {
            let lowerCaseSearch = searchTerm.value.trim().toLowerCase();
            for (let i = 0; i < categoryGroup.length; i++) {
                if (categoryGroup[i].name.indexOf(lowerCaseSearch) !== -1) {
                    finalGroup.push(categoryGroup[i]);
                }
            }
            updateDisplay();
        }
    }

    function updateDisplay() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        if (finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
        } else for (let i = 0; i < finalGroup.length; i++) {
            getImage(finalGroup[i]);
        }
    }

    function getImage(product) {
        let url = 'images/' + product.image;
        fetch(url)
            .then(response => response.blob())
            .then(myBlob => {
                objectURL = URL.createObjectURL(myBlob);
                displayProducts(product, objectURL);
            })
            .catch(console.log);
    }

    function displayProducts(product, objectURL) {
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const price = document.createElement('p');
        const img = document.createElement('img');

        section.setAttribute('class', product.type);
        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
        price.textContent = '$' + product.price.toFixed(2);
        img.src = objectURL;
        img.alt = product.name;

        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(price);
        section.appendChild(img);
    }
}