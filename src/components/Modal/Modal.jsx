import { Component } from 'react';
import { Overlay, ModalImage } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    const { onClose } = this.props;
    window.addEventListener('keydown', onClose);
  }
  componentWillUnmount() {
    const { onClose } = this.props;
    window.removeEventListener('keydown', onClose);
  }

  render() {
    const { src, onClose } = this.props;
    return (
      <Overlay onClick={onClose}>
        <ModalImage>
          <img src={src} alt="bigsize" />
        </ModalImage>
      </Overlay>
    );
  }
}
