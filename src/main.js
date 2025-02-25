import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
const per_page = 40;
let totalHits = 0;
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 200 });

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}


function checkBtnStatus() {
  if (!totalHits || page * per_page >= totalHits) {
    hideLoadMoreBtn();
    iziToast.info({
      title: 'End of Results',
      message: "YWe're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreBtn();
  }
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  query = e.target.elements.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  hideLoadMoreBtn();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!', position: 'topRight' });
    return;
  }

  loader.style.display = 'block';

  try {
    const { hits, totalHits: total } = await fetchImages(query, page);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.warning({ title: 'No results', message: 'Sorry, no images found.', position: 'topLeft' });
    } else {
      renderGallery(hits);
      lightbox.refresh();
      checkBtnStatus();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
});


loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  try {
    const { hits } = await fetchImages(query, page);
    renderGallery(hits);
    lightbox.refresh();
    checkBtnStatus();

    const firstItem = document.querySelector('.gallery-item');
    if (firstItem) {
      const { height: cardHeight } = firstItem.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    loader.style.display = 'none';
  }
});
