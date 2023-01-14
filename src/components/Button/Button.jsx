import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export const Button = ({ nextPage }) => {
    return (
        <>
            <ButtonLoadMore type='button' onClick={nextPage}>
                Load more
            </ButtonLoadMore>
        </>
    );
};

Button.propTypes = {
    nextPage: PropTypes.func.isRequired
};