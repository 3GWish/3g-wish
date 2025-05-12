import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl text-center max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Дякуємо за вашу активність!</h2>
        <p className="mb-6">Ви можете отримати NFT від проекту за вашу активність.</p>
        <button
          onClick={onConfirm}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg mr-4"
        >
          Отримати NFT
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
        >
          Закрити
        </button>
      </div>
    </div>
  );
};

export default Modal;
