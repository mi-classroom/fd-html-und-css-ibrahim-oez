
"use strict";

const articleListUrl = 'https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json';
let currentData = null;



document.addEventListener('DOMContentLoaded',() => {
    initArticleList();
})



function initArticleList(){
    const responsePromise = fetch(articleListUrl);
    responsePromise.then(function(response){
        console.log(response.ok);
        
        const dataPromise = response.json();
        dataPromise.then(function (data){
            currentData = data
            renderArticle(data.articles)
            initFilter()
        });

    });
};

function filterArticles(filterValue){
    const filteredArticles = currentData.articles.filter((article) => {
        return article.tags.keywords.includes(filterValue)
    })
    return filteredArticles
}


function initFilter(){
const filterSection = document.querySelector('[data-js-category="keywords"]');
const keywords = currentData.articles.map(() => {
    return article.tafs.keywords;
});
const uniqueKeywords = keywords.filter((item,index) => {
    return keywords.indexOf(item) === index;
});
filterSection.forEach((button) => {
    button.addEventListener('click',(event) => {
        const filterValue = event.currentTarget.getAttribute('data-js-filter');
        const filteredArticles = filterArticles(filterValue);
        renderArticle(filteredArticles);

    });
});
}

function renderArticle(articles){
    const articleListElement = document.querySelector('[data-js-generate-articlelist]');
  
    const cards = articles.map(function(article){
        return `
        <figure>
        <img src=/assets/images/${article.teaserImg}>
        <figcaption>
          <h3>${article.title}</h3>
          <address>${article.author}</address>
          <ul class="tag-list">
        ${article.tags.projectphase.map(function(tag){
            return `<li>${tag}</li>`
        }).join('')}
        ${article.tags.keywords.map(function(tag){
            return `<li>${tag}</li>`
        }).join('')}
        ${article.tags.modules.map(function(tag){
            return `<li>${tag}</li>`
        }).join('')}
        ${article.tags.fileFormat.map(function(tag){
            return `<li>${tag}</li>`
        }).join('')}
          </ul>
        </figcaption>
      </figure>
    </li>
        `
    }).join('');


    articleListElement.innerHTML = cards;
    console.log(cards);

    const author = articles.map(function(article) {
        return `<li>${article.author}</li>`;
    }).join('');



    
}
