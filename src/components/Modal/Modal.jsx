import { useEffect } from 'react';
import { Overlay, ModalImage } from './Modal.styled';

export default function Modal({ src, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <ModalImage>
        <img src={src} alt="bigsize" />
      </ModalImage>
    </Overlay>
  );
}
