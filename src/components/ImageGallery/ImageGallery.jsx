import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: propTypes.array,
  id: propTypes.number,
  webformatURL: propTypes.string,
  tags: propTypes.string,
  largeImageURL: propTypes.string,
  openModal: propTypes.func,
};

export default ImageGallery;
