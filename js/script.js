document.querySelector("header nav .nav-crypto").addEventListener('click', function(){fetchURL('https://api2.binance.com/api/v3/ticker/24hr' ,cryptodisplay)})
document.querySelector("header nav form").addEventListener('submit', function(event){
    event.preventDefault();
    usersearch()
});
let searched = false;

function fetchURL(url, callback, parameter) {

    fetch(url).then(
        function(response){
            if(response.status >= 200 && response.status <300){
                return response.json();
            }
            else{
                throw 'Fetch failed';
            }
        }).then(function(data){
            callback(data, parameter);})
        .catch((error) => errors(error));
}

function errors(error){
    console.log(error)
    document.querySelector("main figure h1").innerHTML = `An error has accured, please try refreshing <br>If this problem persist please contact support <br>Error: ${error}`;
}

//Flickr galleri 
function usersearch() {
    if(searched){
        img = document.querySelectorAll("main figure img");
        for(let i = 0; i < img.length; i++){
            img[i].remove();
            searched = false;
            usersearch()
        }
    }
    else {
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d880089cfbd925a2ce75ec96ae6c257c&text=${document.querySelector("#flickr-search").value}&media=photos&per_page=${document.querySelector("#flickr-number").value}&format=json&nojsoncallback=1`;
        fetchURL(url, getimage, document.querySelector("header nav form select").value);
        document.querySelector("main figure").appendChild(document.createElement("div")).classList.add("blob")
        anime({
            targets: '.blob',
            scale: 2,
            rotate: 90,
            duration: 2000,
            loop: true
        });
    }
}

function getimage(json, size){
    console.log(json)
    document.querySelector("main figure").removeChild(document.querySelector(".blob"));
    for(let i = 0; i < Object.keys(json.photos.photo).length; i++) {
        console.log(`https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`);
        document.querySelector("main figure").appendChild(document.createElement("img")).src = `https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`;
        searched = true;
    }
    if(size==="m"){
        document.querySelector("main figure").style.height="240px"
    }
    else if(size==="z"){
        document.querySelector("main figure").style.height="640px"
    }
    else if(size==="b"){
        document.querySelector("main figure").style.height="1024px"
    }
    pictureSlide()
}











// Picture slide
function pictureSlide() {
    var slideIndex = 0;
    carousel();
    
    function carousel() {
      var i;
      var x = document.querySelectorAll("main figure img");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "block";
      setTimeout(carousel, 2000); // Change image every 2 seconds
    }
}




//Crypto stuff hehe
function cryptodisplay(data){
    document.querySelector("main").appendChild(document.createElement("h1"));
    let counter = {red: 0, green: 0};
    const tr = document.createElement("tr");
    const container = document.createElement("div");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");
    const th4 = document.createElement("th");
    document.querySelector("main").appendChild(container).classList.add("list-container");
    container.appendChild(tr);
    tr.appendChild(th1).innerHTML = "Name:";
    tr.appendChild(th2).innerHTML = "Last price:";
    tr.appendChild(th3).innerHTML = "USD +/-";
    tr.appendChild(th4).innerHTML = "% +/-";


    for(let i = 0; i < data.length; i++){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        container.appendChild(tr);
        tr.appendChild(td1).innerHTML = `${data[i].symbol}: `;
        tr.appendChild(td2).innerHTML = `${data[i].lastPrice}`;
        tr.appendChild(td3).innerHTML = `${data[i].priceChange} USD`;
        tr.appendChild(td4).innerHTML = `${data[i].priceChangePercent} %`;
        if(data[i].priceChange[0] === "-"){
            td3.classList.add("red");
            td4.classList.add("red");
            counter.red++;
        }
        else {
            td3.classList.add("green");
            td4.classList.add("green");
            counter.green++;
        }
    }
    document.querySelector("main h1").innerHTML = `Todays Total: 📈 ${counter.green}  📉 ${counter.red}`;
}