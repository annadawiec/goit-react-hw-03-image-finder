import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './SearchImage/SearchImage';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { animateScroll } from 'react-scroll';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    per_page: 12,
    loading: false,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.getImages(imageName, page);
    }
  }

  getImages = async (im, page) => {
    this.setState({ loading: true });
    if (!im) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(im, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreButton();
  };

  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, loading, loadMore, page, showModal, largeImageURL } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {loading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {loadMore && <Button onLoadMore={this.onLoadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
