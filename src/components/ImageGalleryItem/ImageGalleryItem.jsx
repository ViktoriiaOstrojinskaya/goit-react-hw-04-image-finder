import PropTypes from 'prop-types';
import { ImageBox, ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onSelect }) => (
  <>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageBox key={id}>
        <ImageItem
          src={webformatURL}
          alt={tags}
          onClick={() => onSelect(largeImageURL)}
        />
      </ImageBox>
    ))}
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
