import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';
import propTypes from 'prop-types';

const ImageGallery = (images, onOpenModal) => {
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
