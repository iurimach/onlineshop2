window.onload = function() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        // გალერია სურათების
        const galleryContainer = document.getElementById('gallery');
        const largeImageContainer = document.getElementById('largeImage');
        if (selectedProduct.images){
            selectedProduct.images.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = selectedProduct.name;
                img.addEventListener('click', () => {
                    displayLargeImage(imgSrc);
                });
                galleryContainer.appendChild(img);

                // Set the first image as the default large image
                if (index === 0) {
                    displayLargeImage(imgSrc);
                }
            
            });
            function displayLargeImage(src) { // დიდი სურათის გამოტანა და შეცვლა კლიკზე
                largeImageContainer.innerHTML = ''; // Clear previous image
                const img = document.createElement('img');
                img.src = src;
                img.alt = selectedProduct.name;
                largeImageContainer.appendChild(img);
            } 
        }

       
        // selectedProduct.images.forEach((imgSrc, index) => {
            

        // Display product name, price, and description
        document.getElementById('productName').textContent = selectedProduct.name;
        document.getElementById('productPrice').textContent = `${selectedProduct.price} ₾`;
        
        document.getElementById('productDescription').innerHTML = selectedProduct.description;

        // Show the product ID
        document.getElementById('productId').textContent = `Product ID: ${selectedProduct.id}`;

        if (selectedProduct.stockprice>0){ // სააქციო ფასი, თუ სტოკ ფას ჯსონში ყველას გაუწერ არ ურევს, 
            document.getElementById('newprice').textContent= "ახალი ფასი :" + " "+selectedProduct.stockprice + "ლ"
           console.log(selectedProduct.stockprice +' stok fasi');
                    
        }
       
        // Display additional descriptions if available
        let additionalDescriptions = '';
        for (let i = 2; i <= 50; i++) { // 50 აღწერას / descriptions  წამოიღემს მაქსიმუმ
            if (selectedProduct[`description${i}`]) {
                additionalDescriptions += `<p>${selectedProduct[`description${i}`]}</p>`;
            }
        }
        document.getElementById('productAdditionalDescriptions').innerHTML = additionalDescriptions;

        // suratebi
        
        // Set up the image slider
        const images = selectedProduct.images;
        const slider = document.getElementById('imageSlider');
        let currentImageIndex = 0;

        // Display the first image in the slider
        slider.src = images[currentImageIndex];

        // Function to update the slider image based on the index
        function updateSliderImage() {
            slider.src = images[currentImageIndex];
        }

        // Set up next and previous buttons for the slider
        document.getElementById('prevButton').onclick = function() {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateSliderImage();
            }
        };

        document.getElementById('nextButton').onclick = function() {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                updateSliderImage();
            }
        };
    }
};

function goBack() {
    window.history.back();
}

//პროდუქების სურათები 
// Fetch the JSON data
fetch('json/products.json')
    .then((response) => response.json())
    .then((data) => {
        const product = data[0]; // Assuming you're dealing with the first product
        const galleryContainer = document.getElementById('gallery');
        const largeImageContainer = document.getElementById('largeImage');

     
    })
    .catch((error) => console.error('Error fetching the data:', error));





// აქ იწყება გამოკითხვა დიალოგი, როგორ იხდის
const dialogContainer = document.getElementById('dialog-container');
const dialogMessage = document.getElementById('dialog-message');
const buyButton = document.getElementById('buyButton');
const courierButton = document.getElementById('courierButton');
const cardButton = document.getElementById('cardButton');
const closeDialog = document.getElementById('closeDialog');

// Function to show dialog
function showDialog(message, options) {
  dialogMessage.textContent = message;
  dialogContainer.style.display = 'flex';

  // Toggle button visibility
  courierButton.style.display = options.showCourier ? 'inline-block' : 'none';
  cardButton.style.display = options.showCard ? 'inline-block' : 'none';
}

// Function to hide dialog
function hideDialog() {
  dialogContainer.style.display = 'none';
  const formwrapper=document.getElementById("regitracionform")
  formwrapper.innerHTML=" "
}

// Event Listeners
buyButton.addEventListener('click', () => {
  showDialog('გადახდის მეთოდი:', { showCourier: true, showCard: true });
});

courierButton.addEventListener('click', () => {
  showDialog(' გადახდა კურიერთან', { showCourier: false, showCard: false });
});

cardButton.addEventListener('click', () => {
  showDialog('გადახდა ბარათით', { showCourier: false, showCard: false });
});


closeDialog.addEventListener('click', hideDialog);


// სარეგისტრაციო ფორმის შექმნა

function creatregistracionform(){
    const formwrapper=document.getElementById("regitracionform")
    formwrapper.innerHTML=" "

    const name= document.createElement("input")
    name.type="text"
    name.id="nameid"
    name.placeholder=" შეიყვანეთ სახელი"

    const gvari= document.createElement("input")
    gvari.type="text"
    gvari.id="gvariid"
    gvari.placeholder=" შეიყვანეთ გვარი"

    const tel= document.createElement("input")
    tel.type="number"
    tel.id="telid"
    tel.placeholder=" შეიყვანეთ ტელეფონი"

    const adgili= document.createElement("input")
    adgili.type="text"
    adgili.id="adgiliid"
    adgili.placeholder=" შეიყვანეთ მისამართი"

    const  submitbt= document.createElement("button")
    submitbt.textContent="გაგზავნე მონაცმები"
    submitbt.id="submitbtid"
    submitbt.addEventListener("click",submitbt2)

    formwrapper.appendChild(name)
    formwrapper.appendChild(gvari)
    formwrapper.appendChild(tel)
    formwrapper.appendChild(adgili)
    formwrapper.appendChild(submitbt)

  
}


function submitbt2(){
   const nameid=document.getElementById("nameid").value
   const  gvariid=document.getElementById("gvariid").value
   const telid=document.getElementById("telid").value
   const adgiliid=document.getElementById("adgiliid").value

   var productprice=document.getElementById("productPrice").textContent
   var productid=document.getElementById("productId").textContent
   var productname=document.getElementById("productName").textContent
   var productnewprice=document.getElementById("newprice").textContent



    console.log(nameid+gvariid+telid+adgiliid+productid+productname+productprice + productnewprice)
    console.log("gaixsna")
    SendMail(nameid, gvariid, telid, adgiliid, productprice, productid, productname,productnewprice) //აქ შეყარე მონაცმები 
}


function SendMail(nameid, gvariid, telid, adgiliid, productprice, productid, productname,productnewprice ){ // პარმეტრებს ვაწოდებ summ ფუნქციიდან

    console.log('sendsms' + nameid)
    var params={
            
        message: "სახელი : " + nameid+ 
        " ,  " + "გვარი :"  + gvariid + 
        " ,  "+ "ტელეფონი : "  + telid + " "+
         ", " + " ადგილი : "  + adgiliid +
         " ,   " +"ფასი :"  + productprice +
         " ,   "+ "პროდუქტ იდ : " + productid +
         " ,   "+ "სახელი პროუქტის : " +productname +
         " ,   "+ "ძველი  ფასი ? : " +productnewprice
    }
    // აქ ემილის პარმეტრბი წერია , email.js მა რაც მომანიჭა იდ .. 1-service id . 2 template it
    emailjs.send("service_6yhvuef", "template_57w4kk5",params).then(function(res){
        alert("gaigzavna")
        hideDialog()  // დახურავს დიალოგს ეს მიეხმარება გაასუფტავოს ფორმა რეგისტრციის

    
    })
}
