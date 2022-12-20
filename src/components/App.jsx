import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { MainPage } from './App.styled';
import { fetchImages } from './services/api';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    const renderGallery = async () => {
      setLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(imageName, page);

        if (hits.length === 0) {
          toast.error('Sorry, we did not find anything for your request 😢');
        }
        setImages(images => [...images, ...hits]);
        setTotalImages(totalHits);
      } catch (error) {
        setError(error);
        toast.error('Oops, something went wrong 🫣 Try again!');
      } finally {
        setLoading(false);
      }
    };

    renderGallery();
  }, [imageName, page]);

  const handleSearchBarSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSelectImage = imageURL => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  const closeModal = event => {
    if (event.target.nodeName === 'DIV' || event.code === 'Escape') {
      setShowModal(false);
    }
  };

  const maxPage = Math.ceil(totalImages / 12);
  const showButton = images.length > 0 && page < maxPage;

  return (
    <MainPage>
      <Searchbar onSubmit={handleSearchBarSubmit} />
      <ImageGallery
        searchName={imageName}
        images={images}
        onSelect={handleSelectImage}
      />
      {error && <p>{error.message}</p>}
      {loading && <Loader />}
      {showButton && <Button onClick={loadMore} />}
      {showModal && <Modal src={selectedImage} onClose={closeModal} />}
      <ToastContainer autoClose={3000} theme="colored" />
    </MainPage>
  );
}
