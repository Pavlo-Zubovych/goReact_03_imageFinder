import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '76488069e41fd1f93b60a63a2';

const fetchImagesApi = (serchQuery, page) => {
  return fetch(
    `${BASE_URL}?q=${serchQuery}&${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return PromiseRejectionEvent.reject(
      new Error('Requested image not found!')
    );
  });
};

fetchImagesApi.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default fetchImagesApi;
