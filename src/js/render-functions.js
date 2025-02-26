export function renderGallery(images, append = false) {
  const gallery = document.querySelector(".gallery");
  const markup = images
    .map(
      (image) => `
    <a class="gallery-item" href="${image.largeImageURL}">
      <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
      <div class="image-info">
        <div class="info-item">
          <div class="info-title">Likes</div>
          <div class="info-value">${image.likes}</div>
        </div>
        <div class="info-item">
          <div class="info-title">Views</div>
          <div class="info-value">${image.views}</div>
        </div>
        <div class="info-item">
          <div class="info-title">Comments</div>
          <div class="info-value">${image.comments}</div>
        </div>
        <div class="info-item">
          <div class="info-title">Downloads</div>
          <div class="info-value">${image.downloads}</div>
        </div>
      </div>
    </a>`
    )
    .join("");

  if (append) {
    gallery.insertAdjacentHTML("beforeend", markup);
  } else {
    gallery.innerHTML = markup; 
  }
}