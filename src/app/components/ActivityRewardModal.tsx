import React, { useState } from 'react';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  projectId?: string;
  activeDays: number; 
}

const ActivityRewardModal: React.FC<ModalProps> = ({ 
  isVisible, 
  onClose, 
  projectId,
  activeDays 
}) => {
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  if (!isVisible) return null;

  
  const getImageForDays = () => {
    if (activeDays >= 30) {
      return 'https://'; // додати пінату 
    } else if (activeDays >= 15) {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl text-center max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Дякуємо за вашу активність!</h2>
        
        <div className="mb-4">
          <p>Ваш рівень активності: <strong>
            {activeDays >= 30 ? 'Gold' : 
             activeDays >= 15 ? 'Silver' : 'Bronze'}
          </strong></p>
          <p className="text-sm text-gray-600">
            {activeDays} {activeDays === 1 ? 'day' : 'days'} активності
          </p>
        </div>

        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <p>Ви отримуєте ексклюзивне NFT:</p>
          <p className="font-semibold">
            {activeDays >= 30 ? 'Gold Tier Collector' : 
             activeDays >= 15 ? 'Silver Supporter' : 'Bronze Participant'}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={mintNFT}
            disabled={isLoading}
            className={`bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Мінт NFT...' : 'Отримати NFT'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityRewardModal;