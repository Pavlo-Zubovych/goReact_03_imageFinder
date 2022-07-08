import Loader from './react-loader-spiner';
import styles from './Loader.modules.css';

const LoaderSpiner = () => {
  return (
    <Loader
      className={styles.Loader}
      type='TreeDots'
      color='#000000'
      height={80}
      width={80}
      timeout={3000}
    />
  );
};
