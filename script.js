const API_KEY = "4c3a164cb70e42c989b7d8fe95b5f222";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cloneCard = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cloneCard, article);
        cardContainer.appendChild(cloneCard);
    });
}

function fillDataInCard(cloneCard, article) {
    const newsImg = cloneCard.querySelector("#news-img");
    const newsTitle = cloneCard.querySelector("#news-title");
    const newsSource = cloneCard.querySelector("#news-source");
    const newsDesc = cloneCard.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}.${date}`;

    cloneCard.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url,"_blank");
    });
}

let curSelector = null;

function onNavClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelector?.classList.remove('active');
    curSelector= navItem;
    curSelector.classList.add('active');
}

const searchText = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click" ,() => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelector?.classList.remove("active");
    curSelector=null;
});

searchButton.addEventListener("click" , (event)=>{
    // if you are submitting a form (prevents page reload)
     event.preventDefault();  
      // clear input field 
     searchText.value="";
});




