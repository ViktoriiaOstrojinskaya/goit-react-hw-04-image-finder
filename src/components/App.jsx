import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { MainPage } from './App.styled';
import { fetchImages } from './services/api';
import { Modal } from './Modal/Modal';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    totalImages: 0,
    showModal: false,
    selectedImage: null,
  };

  handleSearchBarSubmit = imageName => {
    this.setState({
      imageName,
      page: 1,
      images: [],
    });
  };

  async componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ loading: true });
      try {
        const response = await fetchImages(nextName, nextPage);

        if (response.data.hits.length === 0) {
          return toast.error(
            'Sorry, we did not find anything for your request 😢'
          );
        }

        this.setState({
          totalImages: response.data.totalHits,
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      } catch (error) {
        return toast.error('Oops, something went wrong 🫣 Try again!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectImage = imageURL => {
    this.setState({ selectedImage: imageURL });
    this.setState({ showModal: true });
  };

  closeModal = event => {
    if (event.target.nodeName === 'DIV' || event.code === 'Escape') {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { images, imageName, loading, page, selectedImage, showModal } =
      this.state;

    const maxPage = Math.ceil(this.state.totalImages / 12);
    const showButton = images.length > 0 && page < maxPage;

    return (
      <MainPage>
        <h1>hw-4</h1>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        <ImageGallery
          searchName={imageName}
          images={images}
          onSelect={this.handleSelectImage}
        />
        {loading && <Loader />}
        {showButton && <Button onClick={this.loadMore} />}
        {showModal && <Modal src={selectedImage} onClose={this.closeModal} />}
        <ToastContainer autoClose={3000} theme="colored" />
      </MainPage>
    );
  }
}

export default App;
