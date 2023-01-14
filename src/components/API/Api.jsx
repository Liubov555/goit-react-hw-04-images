import PropTypes from 'prop-types';
import axios from 'axios';


const API_KEY = '30298675-ee042d282ae1492461b2ba167';
const BASE_URL = 'https://pixabay.com/api/';

export default function fetchImages(searchQuery, page) {
    const response = axios.get(
        `${BASE_URL}?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    );

    return response;
}

fetchImages.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired
};