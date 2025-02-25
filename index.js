import{a as L,S as w,i}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();const b="48882977-05c15dd410216085f6c7fee9f",S="https://pixabay.com/api/",E=40;async function y(r,t){try{const e=await L.get(S,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:E}});return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Error fetching images:",e),e}}function p(r){const t=document.querySelector(".gallery");t.innerHTML=r.map(e=>`
      <a class="gallery-item" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
        <div class="image-info">
          <div class="info-item">
            <div class="info-title">Likes</div>
            <div class="info-value">${e.likes}</div>
          </div>
          <div class="info-item">
            <div class="info-title">Views</div>
            <div class="info-value">${e.views}</div>
          </div>
          <div class="info-item">
            <div class="info-title">Comments</div>
            <div class="info-value">${e.comments}</div>
          </div>
          <div class="info-item">
            <div class="info-title">Downloads</div>
            <div class="info-value">${e.downloads}</div>
          </div>
        </div>
      </a>`).join("")}const m=document.querySelector("#search-form"),q=document.querySelector(".gallery"),f=document.querySelector('[data-action="load-more"]'),l=document.querySelector(".loader");let n="",a=1;const R=40;let d=0;const h=new w(".gallery a",{captionsData:"alt",captionDelay:200});function $(){f.classList.remove("hidden")}function g(){f.classList.add("hidden")}function v(){!d||a*R>=d?(g(),i.info({title:"End of Results",message:"YWe're sorry, but you've reached the end of search results.",position:"topRight"})):$()}m.addEventListener("submit",async r=>{if(r.preventDefault(),n=r.target.elements.searchQuery.value.trim(),a=1,q.innerHTML="",g(),!n){i.error({title:"Error",message:"Please enter a search term!",position:"topRight"});return}l.style.display="block";try{const{hits:t,totalHits:e}=await y(n,a);d=e,t.length===0?i.warning({title:"No results",message:"Sorry, no images found.",position:"topLeft"}):(p(t),h.refresh(),v())}catch(t){i.error({title:"Error",message:t.message,position:"topRight"})}finally{l.style.display="none",m.reset()}});f.addEventListener("click",async()=>{a+=1,l.style.display="block";try{const{hits:r}=await y(n,a);p(r),h.refresh(),v();const t=document.querySelector(".gallery-item");if(t){const{height:e}=t.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}catch(r){i.error({title:"Error",message:r.message,position:"topRight"})}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
