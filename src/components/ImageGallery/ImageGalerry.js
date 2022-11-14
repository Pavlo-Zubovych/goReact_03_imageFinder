// хорошою практикою вважається сортування імпорту
// спочатку зовнішні бібліотеки, а потім як ти собі сам вже визначиш, але так, щоб один і той же порядок був у всьому проекті
// Так легче з першого погляду розуміти що тут використовується. Наприклад, посортувати так:

// import React from 'react';
// import propTypes from 'prop-types';
//
// import ImageGalleryItem from '../ImageGalleryItem';
//
// import styles from './ImageGallery.module.css';

import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';
import propTypes from 'prop-types';

// 1. компонент на вхід як аргументи приймає тільки props (якщо там ніякого forwardRef не було, але це не той випадок). Тож має бути:
// const ImageGallery = (props) => {
// або
// const ImageGallery = ({ images, onOpenModal }) => {

// 2. ImageGallery краще нічого не знати про те, що є зовні нього. Тобто, він не має знати про модалку, яка знаходиться зовні (в компоненті App), а не всередині (в ImageGallery).
// Так як "onOpenModal" це дія, яка має виконатися по кліку на зображення, но краще назвати цей пропс "onImageClick" або "onItemClick" - так ти робиш компонент більш універсальним і прибираєш його зв'язанність з іншими компонентами.
// Наприклад, якщо тобі треба буде така сама галерея на іншій сторінці, але по кліку на зображення треба буде його видалити, а не відкрити в модалці,
// ти зможеш використати цей же компонент:
// <ImageGallery images={imagesArray} onImageClick={this.deleteImage} />
// <ImageGallery images={imagesArray} onImageClick={this.toggleModal} />
// по можливості краще робити назви пропсів одночасно і зрозумілими, і більш універсальними, не заточеними під одне місце використання
// https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9 - корисна стаття по темі

const ImageGallery = (images, onOpenModal) => {
  // https://learn.javascript.ru/object-methods - про this
  console.log(2, this.images);
  return (
    <ul className={styles.Gallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          imagesUrl={image.webformatURL}
          imagesAlt={image.tags}
          imageId={image.id}
          onClick={() => {
            onOpenModal(image);
          }}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onOpenModal: propTypes.func,
  images: propTypes.array,
};

export default ImageGallery;
