import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import fetchImagesApi from "../services/pixabay.js";
import Container from "../components/ImageGallery";
import Searchbar from "../components/Searchbar";
import ImageGallery from "../components/ImageGallery";
import Button from "../components/Button";
import LoaderSpinner from "../components/LoaderSpinner";
import Modal from "../components/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    imagesArray: [],
    showModal: false,
    imagesModal: {},
    status: Status.IDLE,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevSearchQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (prevSearchQuery !== searchQuery || prevPage !== page) {
      this.setState({ status: Status.PENDING });

      fetchImagesApi(searchQuery, page)
        .then((images) => {
          if (images.hits.length === 0) {
            toast.error("Requested images not found!");
            this.resetPage();
          }

          this.setState((prevState) =>
            page > 1
              ? {
                  imagesArray: [...prevState.imagesArray, ...images.hits],
                  status: Status.RESOLVED,
                }
              : { imagesArray: images.hits, status: Status.RESOLVED }
          );
        })
        .catch((error) => {
          this.setState({ error, status: Status.REJECTED });
          toast.error("Requested images not found!");
        });
    }
  }

  handleFormSubmit = (searchQuery) => {
    this.resetPage();
    this.setState({ searchQuery });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  handleLoadMoreBtn = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  toggleModal = (imagesArray) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      imagesModal: imagesArray,
    }));
  };

  render() {
    const { imagesArray, status, showModal, imagesModal } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {imagesArray.length >= 1 && (
        <ImageGallery images={imagesArray} onOpenModal={this.toggleModal} />
        )}

        {status === "pending" && <LoaderSpinner />}

        {imagesArray.length >= 12 && (
          <Button onClickLoadMore={this.handleLoadMoreBtn} />
        )}

        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={imagesModal.largeImageURL} alt={imagesModal.tags} />
          </Modal>
        )}

        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}

export default App;