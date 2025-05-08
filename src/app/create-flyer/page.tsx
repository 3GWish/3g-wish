'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { GiftNFT } from '@/app/lib/gift-nft'
import { toast } from 'sonner'; 

const templates = {
  birthday: '/templates/birthday.png',
  valentine: '/templates/valentine.png',
  newyear: '/templates/newyear.png',
  custom: '', 
} as const;

type TemplateKey = keyof typeof templates;

export default function CreateCard() {
  const wallet = useWallet();
  const [message, setMessage] = useState('');
  const [recipientWallet, setRecipientWallet] = useState('');
  const [template, setTemplate] = useState<TemplateKey>('birthday');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCustomImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Підключіть гаманець перед мінтом!");
      return;
    }

    if (!recipientWallet) {
      toast.error("Введіть адресу гаманця отримувача.");
      return;
    }

    const imageUrl =
      template === 'custom' && customImage ? customImage : templates[template];

    if (!imageUrl) {
      toast.error("Оберіть шаблон або завантажте зображення.");
      return;
    }

    setLoading(true);
    try {
      const nftAddress = await GiftNFT(
        wallet,
        message || 'Напиши щось тепле...',
        recipientWallet,
        imageUrl
      );

      toast.success(`NFT успішно створено! Адреса: ${nftAddress}`);
    } catch (err) {
      console.error(err);
      toast.error("Сталася помилка під час мінта.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">Створити NFT-листівку</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Превʼю</h2>
          <div className="relative w-full aspect-[4/5] max-w-sm border-4 border-pink-400 rounded-xl overflow-hidden bg-white">
            <img
              src={template === 'custom' ? customImage || '' : templates[template]}
              alt="Template"
              className="absolute w-full h-full object-cover"
            />            
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Привітання:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              rows={5}
              placeholder="Напиши щось тепле..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Шаблон:</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateKey)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
            >
              <option value="birthday">🎉 День народження</option>
              <option value="valentine">💖 Валентинка</option>
              <option value="newyear">🌟 Новий рік</option>
              <option value="custom">📁 Завантажити своє</option>
            </select>
          </div>

          {template === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Ваше зображення:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Гаманець отримувача:</label>
            <input
              type="text"
              value={recipientWallet}
              onChange={(e) => setRecipientWallet(e.target.value)}
              placeholder="Наприклад: 5Dk...kLu"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <button
            onClick={handleMint}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-xl text-white text-lg shadow disabled:opacity-50"
          >
            {loading ? 'Мінтимо...' : 'Створити NFT'}
          </button>
        </div>
      </div>
    </main>
  );
}
