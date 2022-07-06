import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handeleSubmit = (event) => {
    event.preventDefault();

    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      return toast.error('Enter something');
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleImput = (event) => {
    this.setState({ searchQuery: event.curentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={styles.Serchbar}>
        <form className={styles.Form} onSubmit={this.handeleSubmit}>
          <button type='submit' className={styles.Button}>
            <BsSearch style={{ width: 20, heigth: 20 }} />
          </button>

          <input
            className={styles.Input}
            type='text'
            value={this.state.searchQuery}
            autocomplete='off'
            autofocus
            placeholder='Search images and photos'
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
