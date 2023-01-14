import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { ImageGallerylist } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => (
    <ImageGallerylist>
        {images.map(({ id, webformatURL }, index) => (
            <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                index={index}
                openModal={openModal}
            />
        ))}
    </ImageGallerylist>
);

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
        })
    ),
    openModal: PropTypes.func.isRequired
};