let products = [];
let filteredProducts = [];
let currentPage = 1; // აქტიური გვერდი
const itemsPerPage = 20; // თითო გვერდზე 10 პროდუქტი

function fetchProducts() {
    fetch('json/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            filteredProducts = [...products];
            displayProducts(); // **დამატებულია**
            setupPagination(); // Pagination-ის დაყენება
        });
}

function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    // **შეცვლილი კოდი: მხოლოდ ამჟამინდელი გვერდის პროდუქტები გამოდის**
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredProducts.slice(startIndex, endIndex).forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="productimage">
            <h4>${product.name}</h4>
        `;
        const minidescription =document.createElement("p");
        minidescription.textContent=product.minidescription
        productCard.appendChild(minidescription)

        const oldprice = document.createElement("p");
        oldprice.textContent = product.price + " ლ";
        productCard.append(oldprice);

        if (product.stockprice) {
            oldprice.classList.add("oldprice");
            const stockpteg = document.createElement("p");
            stockpteg.textContent = product.stockprice + " ლ";
            stockpteg.id = "newprice";
            productCard.appendChild(stockpteg);
        }
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);
    });

    updatePageInfo(); // გვერდის ნომრის განახლება
}



function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // წინა ღილაკების წაშლა

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // **დამატებულია**

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'უკან';
    prevButton.disabled = currentPage === 1; // **შეცვლილი კოდი**
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--; // გვერდის დაქვეითება
            displayProducts();
            setupPagination();
        }
    };
    paginationContainer.appendChild(prevButton);

    // Page Number Buttons
    for (let i = 1; i <= totalPages; i++) { // **შეცვლილი კოდი**
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) pageButton.classList.add('active'); // აქტიური გვერდის მონიშვნა
        pageButton.onclick = () => {
            currentPage = i; // გვერდის არჩევა
            displayProducts();
            setupPagination();
        };
        paginationContainer.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'წინ';
    nextButton.disabled = currentPage === totalPages; // **შეცვლილი კოდი**
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++; // გვერდის მომატება
            displayProducts();
            setupPagination();
        }
    };
    paginationContainer.appendChild(nextButton);
}

function updatePageInfo() {
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredProducts.length / itemsPerPage)}`; // **დამატებულია**
}

function goToProductPage(productId) {
    const product = products.find(p => p.id === productId);
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product.html';
}

function sortByPrice(order) {
    filteredProducts.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    currentPage = 1; // **დამატებულია: სორტირების შემდეგ გვერდი 1-ზე დაბრუნდეს**
    displayProducts();
    setupPagination();
}

function globalSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput) {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchInput) || 
            product.description.toLowerCase().includes(searchInput)
        );
    } else {
        filteredProducts = [...products];
    }
    currentPage = 1; // **დამატებულია: ძებნის შემდეგ გვერდი 1-ზე დაბრუნდეს**
    displayProducts();
    setupPagination();
}

window.onload = function() {
    fetchProducts();
    document.getElementById('searchInput').addEventListener('input', globalSearch);
};



window.onload = function() {
    fetchProducts();
    document.getElementById('searchInput').addEventListener('input', globalSearch);
};


function sortByPrice(order) {
    filteredProducts.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    displayProducts();
    setupPagination();
}

function filterByPrice() {
    const priceFilter = document.getElementById('priceFilter').value;
    filteredProducts = products.filter(product => product.price <= priceFilter);
    displayProducts();
    setupPagination();
}

function globalSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput) {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchInput) || 
            product.description.toLowerCase().includes(searchInput)
        );
    } else {
        filteredProducts = [...products];
    }
    displayProducts();
    currentPage = 1; // **დამატებულია: ძებნის შემდეგ გვერდი 1-ზე დაბრუნდეს**

    setupPagination();
}



//ეს ფუქნცია შევქმნი , ხელით ეძებს კატეგორიაში დამტებულ  პროდუქტს მარტო, წაშლის , გაფილტრავს გამოჩენს
function findBurgi() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("ბურღი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )
    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }

}

function findXelsawyo() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("ხელსაწყოების ნაკრები")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )
    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }

}

function findPolirebis() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("პოლირების აპარატი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price+ " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }

}

function findGazonis() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("გაზონის საკრეჭი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }

}

function findLazerulitarazo() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("ლაზერული თარაზო")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }

}

function findkanchi() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("ქანჩის გასაღების ნაკრები")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }
    
}

function findfilebisachreli() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("ფილების საჭრელი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }
    

}
function findSaxraxnisisNakrebi() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("სახრახნისის ნაკრები")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }
    

}
function findShesawamliAparati() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("შესაწამლი აპარატი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )
    console.log("shesawamli ")

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }
    

}
function findkibe() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("კიბე")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )
    console.log("shesawamli ")

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }
    

}

function findKedlisachreli() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("კედლის საჭრელი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )
    console.log("shesawamli ")

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    }
    
}
function findUsadenoXerxi() {
    const productgrid=document.getElementById("productGrid")
     productgrid.innerHTML=""
    filteredProducts = products.filter(product => product.name.includes("უსადენო ხერხი")) // phone სახელით ძებნა
    
    const slider=document.getElementById("slider") // სლაიდერს გავაქრობ რომ კარგად გამოჩნდეს გაფლტრული
    slider.style.display = "none"

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class=productimage>
            <h4>${product.name}</h4>
            <P>${product.minidescription}</P>
            <p>${product.price + " "+"ლ"}</p>
        `;
        
        productCard.onclick = () => goToProductPage(product.id);
        productGrid.appendChild(productCard);}
    )
    console.log("shesawamli ")

    var togleoffen = document.getElementById("catalogDialog");
    if (togleoffen.style.display === "flex") {// თუ გახსნილია დიალოგი მოძებნის შემდეგ დახურე დიალოგის ფანჯრა
        toggleCatalog() // ეს ხურავს დიალოგის ფანჯარას
    
    } 
}


function toggleCatalog() {
    const catalogDialog = document.getElementById('catalogDialog');
    catalogDialog.style.display = catalogDialog.style.display === 'flex' ? 'none' : 'flex';
}