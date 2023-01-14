import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from "./Modal.styled";

export default function Modal({ toggleModal, largeImage }) {

    useEffect(() => {
        const handleKeyDown = evt => evt.code === 'Escape' && toggleModal();
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', this.handleKeyDown);
        }
    }, [toggleModal]);

    const handleBackdropClick = evt => {
        evt.target === evt.current.Target && toggleModal();
    };

    return (
        <Overlay onClick={handleBackdropClick}>
            <ModalImg>
                <img src={largeImage} alt="" />
            </ModalImg>
        </Overlay>
    );
};

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired
};