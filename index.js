import{a as g,i,S as h}from"./assets/vendor-BzajH6aU.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const b="47065564-a622eb5e999173b8ae38c4180",L="https://pixabay.com/api/",w=15;async function m(r,t){const n=document.getElementById("loadingSpinner");n.style.display="block";try{const{data:s}=await g.get(L,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w,page:t}});return s.hits.length===0?(i.warning({message:"Sorry, no images matching your search query. Please try again!"}),{images:[],totalHits:0}):{images:s.hits,totalHits:s.totalHits}}catch(s){throw i.error({message:"An error occurred. Please try again."}),s}finally{n.style.display="none"}}function y(r,t=!1){const n=document.querySelector(".gallery"),s=r.map(e=>`
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
    `).join("");t?n.insertAdjacentHTML("beforeend",s):n.innerHTML=s}let p=new h(".gallery a"),l="",c=1,d=0;const E=document.querySelector(".form"),f=document.querySelector(".gallery"),a=document.createElement("button");a.textContent="Load more";a.classList.add("form-btn-lm");a.style.display="none";document.body.appendChild(a);E.addEventListener("submit",async function(r){if(r.preventDefault(),l=r.target.elements.query.value.trim(),c=1,!l){i.warning({message:"Please enter a search query."});return}f.innerHTML="",a.style.display="none";try{const{images:t,totalHits:n}=await m(l,c);if(d=n,t.length===0)return;y(t),p.refresh(),t.length<d&&(a.style.display="block")}catch(t){console.error("Error fetching images:",t)}});a.addEventListener("click",async function(){c+=1;try{const{images:r}=await m(l,c);if(r.length===0){a.style.display="none",i.info({message:"We're sorry, but you've reached the end of search results."});return}y(r,!0),p.refresh(),f.children.length>=d&&(a.style.display="none",i.info({message:"We're sorry, but you've reached the end of search results."}));const{height:t}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(r){console.error("Error fetching images:",r)}});
//# sourceMappingURL=index.js.map
