import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={styles.Galery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          imagesUrl={image.webformatURL}
          imageAlt={image.tags}
          imageId={image.id}
          onClick={() => {
            onOpenModal(image);
          }}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
