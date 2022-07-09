import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import fetchImagesApi from "../services/picsabay";
import Container from "./Container";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import LoaderSpinner from "./LoadSpiner";
import Modal from "./Modal";


const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
}

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
    const {searchQuery, page} = this.state;
    const prevStateQuery = prevState.serchQuery;
    const prevPage = prevState.page;
    
    if(prevStateQuery !==  searchQuery || prevPage !== page) {
      this.setState({status: Status.PENDING});

      fetchImagesApi(searchQuery, page)
      .then ((images) => {
        if (images.hits.length === 0) {
          toast.error("Requested images not found!");
          this.resetPage();
        }

        this.setState((prevState) =>
        page >1
          ? {
            imagesArray: [...prevState.imagesArray, ...images.hits], 
            status: Status.REJECTED,
          }
          :{imagesArray:images.hits, status: Status.REJECTED}
        );
      })
      .catch((error) => {
        this.setState({error, status: Status.REJECTED});
        toast.error("Requested images not found!");
      });
    }
  }

handleFormSabmit = (searchQuery) => {
  this.resetPage();
  this.setState({searchQuery});
};

resetPage= () => {
  this.setState ({page: 1});
};

handlerLoadMoreBtn = (imagesArray) => {
  this.setState(({showModal}) => ({
    showModal: !showModal,
    imagesModal:imagesArray,
  }));
};

render() {
  const {imagesArray, status, showModal, imagesModal} = this.state;
  return (
    <Container>
      <Searchbar onSubmit={this.handleFormSabmit} />
      <ImageGallery images={imagesArray} onOpenModal={this.toggleModal} />
      {status === "penduling" && <LoaderSpinner />}
      {imagesArray.length >= 12 && (
        <Button onClickLoadMore={this.handlerLoadMoreBtn} />
      )}
      {showModal && (
        <Modal onCloseModal={this.toggleModal}>
          <img src={imagesModal.largeImageURL} alt={imagesModal.tags} />
        </Modal>
      )}
      <ToastContainer autoClose={1500} />
    </Container>
  )
  }
}


export default  App;