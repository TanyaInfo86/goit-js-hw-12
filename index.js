import{a as L,S as w,i}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const b="48882977-05c15dd410216085f6c7fee9f",S="https://pixabay.com/api/",E=40;async function p(s,t){try{const e=await L.get(S,{params:{key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:E}});return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Error fetching images:",e),e}}function y(s){const t=document.querySelector(".gallery");t.innerHTML=s.map(e=>`
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
      </a>`).join("")}const m=document.querySelector("#search-form"),q=document.querySelector(".gallery"),u=document.querySelector('[data-action="load-more"]'),c=document.querySelector(".loader");let l="",a=1;const R=40;let f=0;const g=new w(".gallery a",{captionsData:"alt",captionDelay:200});function $(){u.classList.remove("hidden")}function h(){u.classList.add("hidden")}function v(){!f||a*R>=f?(h(),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):$()}m.addEventListener("submit",async s=>{if(s.preventDefault(),l=s.target.elements.searchQuery.value.trim(),a=1,q.innerHTML="",h(),!l){i.error({title:"Error",message:"Please enter a search term!",position:"topRight"});return}c.style.display="block";try{const{hits:t,totalHits:e}=await p(l,a);f=e,t.length===0?i.warning({title:"No results",message:"Sorry, no images found.",position:"topLeft"}):(y(t),g.refresh(),v())}catch(t){i.error({title:"Error",message:t.message,position:"topRight"})}finally{c.style.display="none",m.reset()}});u.addEventListener("click",async()=>{a+=1,c.style.display="block";try{const{hits:s}=await p(l,a);y(s),g.refresh(),v();const t=document.querySelectorAll(".gallery-item");if(t.length>=2){const e=t[t.length-2],{top:n}=e.getBoundingClientRect();window.scrollBy({top:n,behavior:"smooth"})}}catch(s){i.error({title:"Error",message:s.message,position:"topRight"})}finally{c.style.display="none"}});
//# sourceMappingURL=index.js.map
