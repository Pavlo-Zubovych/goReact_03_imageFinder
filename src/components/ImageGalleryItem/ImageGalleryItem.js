import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

// + пропси краще назвати "imagesUrl" => "url", "imagesAlt" => "alt", "imageId" => "id"
const ImageGalleryItem = ({ url, alt, id, onClick }) => {
  return (
    <li className={styles.GalleryItem} onClick={onClick}>
      <img className={styles.GalleryImage} src={url} alt={alt} id={id} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
