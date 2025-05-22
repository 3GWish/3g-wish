import React, { useState } from 'react';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

interface ModalProps {
  onClose: () => void;
  projectId?: string;
  daysVisited: number; 
}

const ActivityRewardModal: React.FC<ModalProps> = ({ 
  onClose, 
  projectId,
  daysVisited 
}) => {
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const getImageForDays = () => {
    if (daysVisited >= 30) {
      return 'https://'; // додати пінату 
    } else if (daysVisited >= 15) {
      return 'https://';
    } else {
      return 'https://';
    }
  };

  const mintNFT = async () => {
    if (!publicKey) return;

    setIsLoading(true);
    try {
      const imageUrl = getImageForDays();
      
      const response = await axios.post('/api/mint-nft', {
        imageUrl,
        recipientWallet: publicKey.toString(),
        projectId
      });

      if (response.data.success) {
        alert(`NFT успішно замінчено! Переглянути: ${response.data.explorerUrl}`);
      } else {
        throw new Error(response.data.error || 'Unknown error');
      }
      
      onClose();
    } catch (error) {
      console.error('Помилка при мінті NFT:', error);
      alert('Помилка при мінті NFT: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-xs w-full mx-4 text-center border-2 border-pink-400 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-400 text-2xl p-1 rounded hover:bg-pink-900/20 focus:outline-none"
          aria-label="Закрити"
        >
          ✕
        </button>
        <h2 className="text-2xl font-extrabold mb-4 text-pink-400 drop-shadow">Дякуємо за вашу активність!</h2>
        <div className="mb-4">
          <p className="text-base text-gray-200">Ваш рівень активності: <strong className="text-pink-300">
            {daysVisited >= 30 ? 'Gold' : 
             daysVisited >= 15 ? 'Silver' : 'Bronze'}
          </strong></p>
          <p className="text-xs text-gray-400">
            {daysVisited} {daysVisited === 1 ? 'день' : 'днів'} активності
          </p>
        </div>
        <div className="mb-4 p-4 bg-gray-800 rounded-xl border border-pink-400">
          <p className="text-gray-100">Ви отримуєте ексклюзивне NFT:</p>
          <p className="font-semibold text-pink-300 text-lg">
            {daysVisited >= 30 ? 'Gold Tier Collector' : 
             daysVisited >= 15 ? 'Silver Supporter' : 'Bronze Participant'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
          <button
            onClick={mintNFT}
            disabled={isLoading}
            className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base shadow ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? 'Мінт NFT...' : 'Отримати NFT'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-6 rounded-lg border border-gray-500 transition-colors text-base shadow"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityRewardModal;