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


function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}


function showSpinnerToast() {
  iziToast.info({
    title: 'Loading images please wait.....',
    message: '<div class="spinner"></div>',
    position: 'topRight',
    timeout: 3000, 
    close: false,
    id: 'loadingToast',
  });
}


function hideSpinnerToast() {
  iziToast.hide({
    transitionOut: 'fadeOutUp',
    id: 'loadingToast',
  });
}


function checkBtnStatus() {
  if (!totalHits || page * per_page >= totalHits) {
    hideLoadMoreBtn();
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
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

  showLoader();

  try {
    const { hits, totalHits: total } = await fetchImages(query, page);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.warning({ title: 'No results', message: 'Sorry, no images found.', position: 'topLeft' });
    } else {
      renderGallery(hits, false); 
      lightbox.refresh();
      checkBtnStatus();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
    form.reset();
  }
});


loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showSpinnerToast(); 

  try {
    const { hits } = await fetchImages(query, page);
    renderGallery(hits, true); 
    lightbox.refresh();
    checkBtnStatus();

   
    const items = document.querySelectorAll('.gallery-item');
    if (items.length >= 2) {
      const lastItem = items[items.length - 1];
      const secondLastItem = items[items.length - 2];
      const scrollDistance = secondLastItem.getBoundingClientRect().height * 2;

      window.scrollBy({
        top: scrollDistance,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    hideSpinnerToast(); 
  }
});

