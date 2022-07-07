import styles from './Button.module.css';

const Button = ({ onClickLoadMore }) => {
  return (
    <button
      tupe='button'
      className={styles.Button}
      onClick={() => onClickLoadMore()}
    >
      Load more
    </button>
  );
};

export default Button;
