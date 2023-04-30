import { galleryItems } from './gallery-items.js';
const gallery = document.querySelector('.gallery');

// STEP 1. СТВОРЕННЯ ТА ДОДАВАННЯ РОЗМІТКИ ЗОБРАЖЕНЬ
const createGalleryMarkup = items => {
  return items
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join('');
};

gallery.innerHTML += createGalleryMarkup(galleryItems);

// STEP 2. СТВОРЕННЯ ФУНКЦІЇ, ЩО ВІДКРИВАЄ МОДАЛЬНЕ ВІКНО

let lightbox; // Тут не створиш, потім не закриєш!

const openImage = event => {
  const { nodeName, dataset, alt } = event.target;
  event.preventDefault();
  if (nodeName !== 'IMG') {
    return;
  }
  lightbox = basicLightbox.create(`
    <img src="${dataset.source}" alt="${alt}" />
  `);
  lightbox.show();
  document.addEventListener('keydown', closeImage);
};

// STEP 3. ПРІКРІПЛЕННЯ СЛУХАЧА ПОДІЙ НА КОНТЕЙНЕР З ЗОБРАЖЕННЯМИ (gallery)
gallery.addEventListener('click', openImage);

// STEP 4. СТВОРЕННЯ ФУНКЦІЇ, ЩО ЗАКРИВАЄ МОДАЛЬНЕ ВІКНО
const closeImage = event => {
  if (event.key === 'Escape') {
    lightbox.close();
    document.removeEventListener('keydown', closeImage);
  }
};
