'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { GiftNFT } from '@/app/lib/gift-nft';
import { toast } from 'sonner';
import ActivityRewardModal from '@/app/components/ActivityRewardModal';

type UserTemplate = {
  id: string;
  name: string;
  message: string;
  image: string;
};

type CustomTemplate = {
  image: string;
  message: string;
  name: string;
};

const templates = {
  birthday: '/templates/birthday.png',
  valentine: '/templates/valentine.png',
  newyear: '/templates/newyear.png',
  custom: '',
  user: '',
  customTemplate: '',
} as const;

type TemplateKey = keyof typeof templates;

export default function CreateCard() {
  const wallet = useWallet();
  const [message, setMessage] = useState('');
  const [recipientWallet, setRecipientWallet] = useState('');
  const [template, setTemplate] = useState<TemplateKey>('birthday');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [userTemplates, setUserTemplates] = useState<UserTemplate[]>([]);
  const [selectedUserTemplateId, setSelectedUserTemplateId] = useState<string | null>(null);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [selectedCustomTemplateIndex, setSelectedCustomTemplateIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [daysVisited, setDaysVisited] = useState(0);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [projectId] = useState('nft-greetings-app');

  useEffect(() => {
    const storedUser = localStorage.getItem('user-templates');
    if (storedUser) {
      setUserTemplates(JSON.parse(storedUser));
    }
    const storedCustom = localStorage.getItem('customTemplates');
    if (storedCustom) {
      setCustomTemplates(JSON.parse(storedCustom));
    }
  }, []);

  useEffect(() => {
    const savedDates = JSON.parse(localStorage.getItem('visit_dates') || '[]');
    const today = new Date().toISOString().split('T')[0];

    const alreadyVisitedToday = savedDates.includes(today);

    if (!alreadyVisitedToday) {
      savedDates.push(today);
      localStorage.setItem('visit_dates', JSON.stringify(savedDates));
    }

    setDaysVisited(savedDates.length);


    if (!alreadyVisitedToday && savedDates.length >= 1) {
      setShowRewardModal(true);
    }
  }, []);

  const handleCloseRewardModal = () => {
    setShowRewardModal(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCustomImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUserTemplateChange = (id: string) => {
    setSelectedUserTemplateId(id);
    setSelectedCustomTemplateIndex(null);
    const template = userTemplates.find((t) => t.id === id);
    if (template) {
      setMessage(template.message);
      setCustomImage(template.image);
    }
  };

  const handleCustomTemplateChange = (index: number) => {
    setSelectedCustomTemplateIndex(index);
    setSelectedUserTemplateId(null);
    const template = customTemplates[index];
    if (template) {
      setMessage(template.message);
      setCustomImage(template.image);
    }
  };

  const handleMint = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error('Підключіть гаманець перед мінтом!');
      return;
    }

    if (!recipientWallet) {
      toast.error('Введіть адресу гаманця отримувача.');
      return;
    }

    let imageUrl = '';

    if (template === 'custom' && customImage) {
      imageUrl = customImage;
    } else if (template === 'user' && selectedUserTemplateId) {
      const t = userTemplates.find((t) => t.id === selectedUserTemplateId);
      imageUrl = t?.image || '';
    } else if (template === 'customTemplate' && selectedCustomTemplateIndex !== null) {
      imageUrl = customTemplates[selectedCustomTemplateIndex].image;
    } else {
      imageUrl = templates[template];
    }

    if (!imageUrl) {
      toast.error('Оберіть шаблон або завантажте зображення.');
      return;
    }

    setLoading(true);
    try {
      const nftAddress = await GiftNFT(wallet, message || 'Напиши щось тепле...', recipientWallet, imageUrl);
      toast.success(`NFT успішно створено! Адреса: ${nftAddress}`);
    } catch (err) {
      console.error(err);
      toast.error('Сталася помилка під час мінта.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-4 sm:mb-6">Створити NFT-листівку</h1>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
        <div className="bg-gray-900 p-3 sm:p-4 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Превʼю</h2>
          <div className="relative w-full max-w-[280px] sm:max-w-sm border-4 border-pink-400 rounded-xl overflow-hidden bg-white flex justify-center items-center">
            <div className="w-full h-auto max-h-[500px]"> 
              <img
                src={
                  template === 'custom'
                    ? customImage || ''
                    : template === 'user'
                      ? userTemplates.find((t) => t.id === selectedUserTemplateId)?.image || ''
                      : template === 'customTemplate' && selectedCustomTemplateIndex !== null
                        ? customTemplates[selectedCustomTemplateIndex]?.image || ''
                        : templates[template]
                }
                alt="Template"
                className="w-full h-auto object-contain" 
              />
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-black text-base sm:text-lg font-bold bg-white bg-opacity-70 rounded p-2">
              {message || 'Напиши щось тепле...'}
            </p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Привітання:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
              rows={4}
              placeholder="Напиши щось тепле..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Шаблон:</label>
            <select
              value={template}
              onChange={(e) => {
                setTemplate(e.target.value as TemplateKey);
                if (e.target.value !== 'user') setSelectedUserTemplateId(null);
                if (e.target.value !== 'customTemplate') setSelectedCustomTemplateIndex(null);
              }}
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
            >
              <option value="birthday">🎉 День народження</option>
              <option value="valentine">💖 Валентинка</option>
              <option value="newyear">🌟 Новий рік</option>
              <option value="custom">📁 Завантажити своє</option>
              {userTemplates.length > 0 && <option value="user">👤 Мої шаблони</option>}
              {customTemplates.length > 0 && <option value="customTemplate">🖼️ Мої завантажені</option>}
            </select>
          </div>

          {template === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Ваше зображення:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm"
              />
            </div>
          )}

          {template === 'user' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Оберіть свій шаблон:</label>
              <select
                value={selectedUserTemplateId || ''}
                onChange={(e) => handleUserTemplateChange(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
              >
                <option value="" disabled>
                  -- Оберіть --
                </option>
                {userTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    🖼️ {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {template === 'customTemplate' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Оберіть завантажений шаблон:</label>
              <select
                value={selectedCustomTemplateIndex !== null ? selectedCustomTemplateIndex : ''}
                onChange={(e) => handleCustomTemplateChange(parseInt(e.target.value))}
                className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
              >
                <option value="" disabled>
                  -- Оберіть --
                </option>
                {customTemplates.map((t, index) => (
                  <option key={index} value={index}>
                    🖼️ {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Адреса гаманця отримувача:</label>
            <input
              type="text"
              value={recipientWallet}
              onChange={(e) => setRecipientWallet(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
              placeholder="Введіть адресу гаманця..."
            />
          </div>

          <button
            onClick={handleMint}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? 'Створення...' : 'Створити NFT-листівку'}
          </button>
        </div>
      </div>

      {showRewardModal && (
        <ActivityRewardModal
          daysVisited={daysVisited}
          onClose={handleCloseRewardModal}
          projectId={projectId}
        />
      )}
    </main>
  );
}