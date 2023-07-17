import { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img
            src={this.props.largeImageURL}
            alt=""
            width={1100}
            height={800}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: propTypes.func,
  largeImageURL: propTypes.string.isRequired,
};
