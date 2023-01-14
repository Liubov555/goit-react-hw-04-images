
import { Component } from "react";
import fetchImages from "../API/Api";
import { Searchbar } from "../Searchbar/Searchbar";
import { Loader } from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";


export class App extends Component {
  state = {
    searchData: '',
    images: [],
    page: 1,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
    totalResults: [],
    showButton: false,
  };

  componentDidUpdate(_, prevState) {
    const prevPage = prevState.page;
    const prevSearchData = prevState.searchData;
    const { searchData, page } = this.state;

    if (prevPage !== page || prevSearchData !== searchData) {
      try {
        this.setState({ isLoading: true, showButton: false });
        const response = fetchImages(searchData, page);

        response.then(data => {
          if (data.data.hits.length === 0) {
            toast.error('Nothing was found');
          }

          this.setState(({ images }) => ({
            images: [...images, ...data.data.hits]
          }));

          this.setState({
            isLoading: false,
            showButton:
              this.state.page < Math.ceil(data.data.totalHits / 12)
                ? true
                : false
          });
        });
      } catch (error) {
        this.setState({ error, isLoading: false, showButton: false });
      }
    }
  }

  onSubmit = (searchData) => {
    if (searchData === '') {
      return toast.error('Write something');
    } else if (searchData === this.state.searchData) {
      return;
    }
    this.setState({
      searchData,
      images: [],
      page: 1,
    });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { onSubmit, nextPage, openModal, toggleModal } = this;
    const {
      images,
      largeImage,
      showModal,
      isLoading,
      showButton } = this.state;

    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2500} />
        {showButton && <Button nextPage={nextPage} />}
      </>
    );
  };
}
