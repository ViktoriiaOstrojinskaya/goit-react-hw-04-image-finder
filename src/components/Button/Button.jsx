import PropTypes from 'prop-types';
import { ButtonEl } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonEl type="button" onClick={onClick}>
      Load more
    </ButtonEl>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
