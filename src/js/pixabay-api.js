import axios from 'axios';

const API_KEY = '48882977-05c15dd410216085f6c7fee9f';
const BASE_URL = 'https://pixabay.com/api/';
const per_page = 40;

export async function fetchImages(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: per_page,
      },
    });
    return { hits: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

