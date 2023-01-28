
import { useState, useEffect } from "react";
import fetchImages from "../API/Api";
import Searchbar from "../Searchbar/Searchbar";
import { Loader } from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";


export default function App() {

  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!page) {
      return;
    };
    try {
      setIsLoading(true);
      setShowModal(false);
      const response = fetchImages(searchData, page);

      response.then(data => {
        if (data.data.hits.length === 0) {
          toast.error('Nothing was found');
        }

        setImages(images => [...images, ...data.data.hits]);
        setIsLoading(false);
        setShowButton(
          page < Math.ceil(data.data.totalHits / 12)
            ? true
            : false
        );
      });
    } catch (error) {
      // setError(error);
      setIsLoading(false);
    }
  }, [page, searchData]);


  const onSubmit = newSearchData => {
    if (newSearchData === '') {
      return toast.error('Write something');
    } else if (newSearchData === searchData) {
      return;
    }
    setSearchData(newSearchData);
    setPage(1);
    setImages([])
  };

  const nextPage = () => {
    setPage(page => page + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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

