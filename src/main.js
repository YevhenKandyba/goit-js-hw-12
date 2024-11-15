import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

let lightbox = new SimpleLightbox('.gallery a');
let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('form-btn-lm');
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    query = event.target.elements.query.value.trim();
    page = 1;

    if (!query) {
        iziToast.warning({ message: "Please enter a search query." });
        return;
    }

    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';

    try {
        const { images, totalHits: hits } = await fetchImages(query, page);
        totalHits = hits;

        if (images.length === 0) return;

        renderGallery(images);
        lightbox.refresh();

        if (images.length < totalHits) {
            loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
});

loadMoreBtn.addEventListener('click', async function () {
    page += 1;

    try {
        const { images } = await fetchImages(query, page);

        if (images.length === 0) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
            return;
        }

        renderGallery(images, true);
        lightbox.refresh();

        if (gallery.children.length >= totalHits) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        }

        
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
});
