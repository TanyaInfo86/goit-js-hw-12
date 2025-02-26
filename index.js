import{a as L,S as w,i as r}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const S="48882977-05c15dd410216085f6c7fee9f",b="https://pixabay.com/api/",E=40;async function m(s,t){try{const o=await L.get(b,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:E}});return{hits:o.data.hits,totalHits:o.data.totalHits}}catch(o){throw console.error("Error fetching images:",o),o}}function p(s,t=!1){const o=document.querySelector(".gallery"),n=s.map(e=>`
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
    </a>`).join("");t?o.insertAdjacentHTML("beforeend",n):o.innerHTML=n}const u=document.querySelector("#search-form"),R=document.querySelector(".gallery"),f=document.querySelector('[data-action="load-more"]'),h=document.querySelector(".loader");let l="",a=1;const q=40;let d=0;const g=new w(".gallery a",{captionsData:"alt",captionDelay:200});function O(){f.classList.remove("hidden")}function y(){f.classList.add("hidden")}function T(){h.style.display="block"}function $(){h.style.display="none"}function B(){r.info({title:"Loading images please wait.....",message:'<div class="spinner"></div>',position:"topRight",timeout:3e3,close:!1,id:"loadingToast"})}function H(){r.hide({transitionOut:"fadeOutUp",id:"loadingToast"})}function v(){!d||a*q>=d?(y(),r.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):O()}u.addEventListener("submit",async s=>{if(s.preventDefault(),l=s.target.elements.searchQuery.value.trim(),a=1,R.innerHTML="",y(),!l){r.error({title:"Error",message:"Please enter a search term!",position:"topRight"});return}T();try{const{hits:t,totalHits:o}=await m(l,a);d=o,t.length===0?r.warning({title:"No results",message:"Sorry, no images found.",position:"topLeft"}):(p(t,!1),g.refresh(),v())}catch(t){r.error({title:"Error",message:t.message,position:"topRight"})}finally{$(),u.reset()}});f.addEventListener("click",async()=>{a+=1,B();try{const{hits:s}=await m(l,a);p(s,!0),g.refresh(),v();const t=document.querySelectorAll(".gallery-item");if(t.length>=2){const o=t[t.length-1],e=t[t.length-2].getBoundingClientRect().height*2;window.scrollBy({top:e,behavior:"smooth"})}}catch(s){r.error({title:"Error",message:s.message,position:"topRight"})}finally{H()}});
//# sourceMappingURL=index.js.map
