import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = '47065564-a622eb5e999173b8ae38c4180';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: PER_PAGE,
                page,
            },
        });

        if (data.hits.length === 0) {
            iziToast.warning({ message: "Sorry, no images matching your search query. Please try again!" });
            return { images: [], totalHits: 0 };
        }

        return { images: data.hits, totalHits: data.totalHits };
    } catch (error) {
        iziToast.error({ message: "An error occurred. Please try again." });
        throw error;
    } finally {
        loadingSpinner.style.display = 'none';
    }
}


