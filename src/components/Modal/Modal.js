import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#madal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hsndleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={styles.Backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
