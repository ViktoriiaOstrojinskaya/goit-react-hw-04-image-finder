import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (imageName, page) => {
  const response = await axios.get('', {
    params: {
      key: '30725538-60cf17fec7c19eff2b1d4a894',
      q: imageName,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page: page,
    },
  });
  console.log(response.data);
  return response.data;
};

fetchImages.propTypes = {
  imageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
