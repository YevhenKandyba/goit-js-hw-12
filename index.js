import{a as b,i as a,S as L}from"./assets/vendor-BzajH6aU.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const w="47065564-a622eb5e999173b8ae38c4180",E="https://pixabay.com/api/",P=15;async function m(r,t){const o=document.getElementById("initialLoader");o.style.display="block";try{const{data:s}=await b.get(E,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P,page:t}});return s.hits.length===0?(a.warning({message:"Sorry, no images matching your search query. Please try again!"}),{images:[],totalHits:0}):{images:s.hits,totalHits:s.totalHits}}catch(s){throw a.error({message:"An error occurred. Please try again."}),s}finally{o.style.display="none"}}function g(r,t=!1){const o=document.querySelector(".gallery"),s=r.map(e=>`
        <li class="foto">
            <a href="${e.largeImageURL}">
                <img src="${e.webformatURL}" width="" height="" alt="${e.tags}">
            </a>
            <ul class="coments">
                <li>
                <p class="text">Likes</p>
                <p class="numb">${e.likes}</p>
                </li>
                <li>
                <p class="text">Views</p>
                <p class="numb">${e.views}</p>
                </li>
                <li>
                <p class="text">Comments</p>
                <p class="numb">${e.comments}</p>
                </li>
                <li>
                <p class="text">Downloads</p>
                <p class="numb">${e.downloads}</p>
                </li> 
            </ul>
        </li>
    `).join("");t?o.insertAdjacentHTML("beforeend",s):o.innerHTML=s}let h=new L(".gallery a"),i="",c=1,y=0;const S=document.querySelector(".form"),u=document.querySelector(".gallery"),l=document.getElementById("loadMoreBtn"),f=document.getElementById("initialLoader"),p=document.getElementById("loadingSpinner");l.style.display="none";p.style.display="none";S.addEventListener("submit",async function(r){if(r.preventDefault(),i=r.target.elements.query.value.trim(),c=1,!i){a.warning({message:"Please enter a search query."});return}u.innerHTML="",l.style.display="none",f.style.display="block";try{const{images:t,totalHits:o}=await m(i,c);if(y=o,t.length===0)return;g(t),h.refresh(),t.length<y&&(l.style.display="block")}catch(t){console.error("Error fetching images:",t)}finally{f.style.display="none"}});l.addEventListener("click",async function(){c+=1,l.style.display="none",p.style.display="block";try{const{images:r}=await m(i,c);if(r.length===0){l.style.display="none",a.info({message:"We're sorry, but you've reached the end of search results."});return}g(r,!0),h.refresh(),u.children.length>=y?(a.info({message:"We're sorry, but you've reached the end of search results."}),l.style.display="none"):l.style.display="block";const{height:t}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(r){console.error("Error fetching images:",r)}finally{p.style.display="none"}});
//# sourceMappingURL=index.js.map
