import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryBox } from './ImageGallery.styled';

export const ImageGallery = ({ images, searchName, onSelect }) => (
  <>
    <ImageGalleryBox searchName={searchName}>
      {images && <ImageGalleryItem images={images} onSelect={onSelect} />}
    </ImageGalleryBox>
  </>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  searchName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
