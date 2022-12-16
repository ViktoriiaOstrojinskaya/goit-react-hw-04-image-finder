import { FcSearch } from 'react-icons/fc';
import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarItem,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChangeName = event => {
    this.setState({
      imageName: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { imageName } = this.state;

    if (imageName.trim() === '') {
      toast.warn('Please, enter a request! 🕵️‍♀️');
      return;
    }
    this.props.onSubmit(imageName);
    this.setState({
      imageName: '',
    });
  };

  render() {
    const { imageName } = this.state;
    return (
      <SearchbarItem>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size="30" />
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            placeholder="Search images and photos"
            value={imageName}
            onChange={this.handleChangeName}
          />
        </SearchForm>
      </SearchbarItem>
    );
  }
}

export default Searchbar;
