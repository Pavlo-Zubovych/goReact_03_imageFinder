import styles from './Button.module.css';

// те ж саме, що і в компоненті ImageGallery, пункт 2
const Button = ({ onClickLoadMore }) => {
  return (
    <button
      type='button'
      className={styles.Button}
      onClick={() => onClickLoadMore()}
    >
      Load more
    </button>
  );
};

export default Button;
