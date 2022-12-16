import { Vortex } from 'react-loader-spinner';
import { VortexBox } from './Loader.styled';

export const Loader = () => {
  return (
    <VortexBox>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['yellow', 'blue', 'yellow', 'blue', 'yellow', 'blue']}
      />
    </VortexBox>
  );
};
