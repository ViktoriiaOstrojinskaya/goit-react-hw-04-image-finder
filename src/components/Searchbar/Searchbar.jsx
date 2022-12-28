import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import {
  SearchbarItem,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleChangeName = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };
  

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.warn('Please, enter a request! 🕵️‍♀️');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <SearchbarItem>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size="30" />
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleChangeName}
        />
      </SearchForm>
    </SearchbarItem>
  );
}
