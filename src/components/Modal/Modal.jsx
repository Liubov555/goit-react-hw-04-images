import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from "./Modal.styled";

export default class Modal extends Component {
    static propTypes = {
        toggleModal: PropTypes.func.isRequired,
        largeImage: PropTypes.string.isRequired
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = evt => {
        evt.code === 'Escape' && this.props.toggleModal();
    };

    handleBackdropClick = evt => {
        evt.target === evt.currentTarget && this.props.toggleModal();
    };

    render() {
        const { handleBackdropClick } = this;
        const { largeImage } = this.props;

        return (
            <Overlay onClick={handleBackdropClick}>
                <ModalImg>
                    <img src={largeImage} alt="" />
                </ModalImg>
            </Overlay>
        );
    };
};

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.string
};