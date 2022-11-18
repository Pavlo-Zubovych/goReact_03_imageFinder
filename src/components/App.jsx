import React from 'react';
import { PureComponent } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// + Container і ImageGallery посилаються на один і той же компонент
import fetchImagesApi from "../services/pixabay.js";
import Container from "../components/Container";
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

// https://stackoverflow.com/questions/41340697/react-component-vs-react-purecomponent
// https://reactjs.org/docs/react-api.html#reactpurecomponent
class App extends PureComponent {
  state = {
    searchQuery: "car",
    page: 1,
    imagesArray: [],
    isModalOpen: false,
    imagesModal: {},
    status: Status.IDLE,
    error: null,
  };

  // компонент не обновляється (після першого рендеру немає оновлення пропсів/стейту) - як наслідок, componentDidUpdate не викликається
  // ? перший фетч даних краще робити на componentDidMount (або useEffect з пустим масивом залежностей якщо це не класовий, а функціональний компонент)


  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevSearchQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (prevSearchQuery !== searchQuery || prevPage !== page) {
      this.setState({ status: Status.PENDING });

      fetchImagesApi(searchQuery, page)
        .then((images) => {
          // console.log(images)
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
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      imagesModal: imagesArray,
    }));
  };

  render() {
    const { imagesArray, status, isModalOpen, imagesModal } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
  
        {/*{imagesArray.length && (*/}
        {imagesArray.length >= 1 && (
        <ImageGallery images={imagesArray} onOpenModal={this.toggleModal} />
        )}

        {status === "pending" && <LoaderSpinner />}

        {/* https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad */}
        {imagesArray.length >= 12 && (
          <Button onClickLoadMore={this.handleLoadMoreBtn} />
        )}

        {/* + для змінних, які набувають значень true/false, краще використовувати неймінг, що починається з "is", "has" і т.п.*/}
        {/* "showModal" => "isModalOpen" */}
        
        {/* + "onCloseModal" можна назвати просто "onClose", так як це пропс модалки, і тут зрозуміло, що річ про модалку, а не щось інше */}
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img src={imagesModal.largeImageURL} alt={imagesModal.tags} />
          </Modal>
        )}

        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}

export default App;
