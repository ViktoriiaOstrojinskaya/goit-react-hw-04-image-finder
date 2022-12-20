import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { MainPage } from './App.styled';
import { fetchImages } from './services/api';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';

// class App extends Component {
//   state = {
//     imageName: '',
//     images: [],
//     loading: false,
//     error: null,
//     page: 1,
//     totalImages: 0,
//     showModal: false,
//     selectedImage: null,
//   };

//   handleSearchBarSubmit = imageName => {
//     this.setState({
//       imageName,
//       page: 1,
//       images: [],
//     });
//   };

//   async componentDidUpdate(_, prevState) {
//     const prevName = prevState.imageName;
//     const nextName = this.state.imageName;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevName !== nextName || prevPage !== nextPage) {
//       this.setState({ loading: true });
//       try {
//         const response = await fetchImages(nextName, nextPage);

//         if (response.data.hits.length === 0) {
//           return toast.error(
//             'Sorry, we did not find anything for your request 😢'
//           );
//         }

//         this.setState({
//           totalImages: response.data.totalHits,
//         });
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.data.hits],
//         }));
//       } catch (error) {
//         return toast.error('Oops, something went wrong 🫣 Try again!');
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleSelectImage = imageURL => {
//     this.setState({ selectedImage: imageURL });
//     this.setState({ showModal: true });
//   };

//   closeModal = event => {
//     if (event.target.nodeName === 'DIV' || event.code === 'Escape') {
//       this.setState({ showModal: false });
//     }
//   };

//   render() {
//     const { images, imageName, loading, page, selectedImage, showModal } =
//       this.state;

//     const maxPage = Math.ceil(this.state.totalImages / 12);
//     const showButton = images.length > 0 && page < maxPage;

//     return (
//       <MainPage>
//         <h1>hw-4</h1>
//         <Searchbar onSubmit={this.handleSearchBarSubmit} />
//         <ImageGallery
//           searchName={imageName}
//           images={images}
//           onSelect={this.handleSelectImage}
//         />
//         {loading && <Loader />}
//         {showButton && <Button onClick={this.loadMore} />}
//         {showModal && <Modal src={selectedImage} onClose={this.closeModal} />}
//         <ToastContainer autoClose={3000} theme="colored" />
//       </MainPage>
//     );
//   }
// }

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

    const renderGallery = () => {
      setLoading(true);

      try {
        const { hits, totalHits } = fetchImages(imageName, page);

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

  const maxPage = Math.ceil(setTotalImages / 12);
  const showButton = images.length > 0 && setPage < maxPage;

  return (
    <MainPage>
      <h1>hw-4</h1>
      <Searchbar onSubmit={handleSearchBarSubmit} />
      <ImageGallery
        searchName={imageName}
        images={images}
        onSelect={handleSelectImage}
      />
      {loading && <Loader />}
      {showButton && <Button onClick={loadMore} />}
      {showModal && <Modal src={selectedImage} onClose={closeModal} />}
      <ToastContainer autoClose={3000} theme="colored" />
    </MainPage>
  );
}
