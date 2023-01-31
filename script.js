const searchBtn = document.getElementById('search-btn');
const dalleMageList = document.getElementById('dalleMage');
const dalleMageDetailsContent = document.querySelector('.dalleMage-details-content');
const dalleCloseBtn = document.getElementById('dalle-close-btn');

//Event Listeners
searchBtn.addEventListener('click', getTees);
dalleMageList.addEventListener('click', getdalleMagedalle);
dalleCloseBtn.addEventListener('click', () =>{
    dalleMageDetailsContent.parentElement.classList.remove('showdalle');
})

function getTees(){
    let searchInputTxt = document.getElementById
    ('search-input').value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    var raw = JSON.stringify({
        "prompt": searchInputTxt,
        "n": 3,
        "size": "512x512"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/images/generations", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = "<h2 class=\"title\">Your Design:</h2>";
            if(data){
             //   let url = data['data'][0]['url']
                console.log(data)
          data['data'].forEach(url =>{
              //Fill URL
                let link = url['url']
                html += `
                <div class="dalleMage-item" data-id="">
                    <div class="dalleMage-img">
                        <img src="${link}" alt="">
                    </div>
                    <div class="dalleMage-name">
                        <h3>${searchInputTxt}</h3>
                        <a href="#" class="dalleMage-btn">Order T-Shirt</a>
                    </div>
                </div>`
            });
            }else{
                html = "Sorry, could not generate image!";
                dalleMageList.classList.add('notFound');
            }
            //add loader to the page while the request are still loading
                dalleMageList.innerHTML= html;
        }

        );



}

function getdalleMagedalle(e){
    e.preventDefault();
    if(e.target.classList.contains('dalle-btn')){
        let dalleMageItem = e.target.parentElement.parentElement;
        fetch(`https://www.thedalleMagedb.com/api/json/v1/1/lookup.php?i=${dalleMageItem.dataset.id}`)
        .then(response => response.json())
        .then(data => dalleMagedalleModal(data.dallemage));
    }
}

//create a Modal
function dalleMagedalleModal(dalleMage){
    console.log(dalleMage);
    dalleMage = dalleMage[0] ;
    let html = `
    <h2 class="dalle-title">${dalleMage.strdalleMage}</h2>
    <p class="dalle-category">${dalleMage.strCategory}</p>
    <div class="dalle-instruct">
        <h3>Instructions:</h3>
        <p>${dalleMage.strInstructions}</p>
    </div>
    <div class="dalle-dalleMage-img">
        <img src="${dalleMage.strdalleMageThumb}" alt="" >
    </div>
    <div class="dalle-link">
        <a href="${dalleMage.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
    dalleMageDetailsContent.innerHTML = html;
    dalleMageDetailsContent.parentElement.classList.add('showdalle');
}