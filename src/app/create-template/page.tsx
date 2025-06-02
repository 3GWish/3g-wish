'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';

export default function CreateCustomTemplate() {
  const { publicKey } = useWallet();
  const [templateName, setTemplateName] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveTemplate = async () => {
    if (!templateName || !imageUrl) {
      toast.error('Заповніть назву та зображення шаблону.');
      return;
    }

    if (!publicKey) {
      toast.error('Будь ласка, підключіть гаманець');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: templateName,
          message,
          image: imageUrl,
          wallet_address: publicKey.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка збереження шаблону');
      }

      toast.success('Шаблон успішно збережено!');
      setTemplateName('');
      setMessage('');
      setImageUrl('');
    } catch (error) {
      console.error(error);
      toast.error('Не вдалося зберегти шаблон');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-4 sm:mb-6">Створити власний шаблон</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Превʼю</h2>
          <div className="relative w-full aspect-[4/5] max-w-xs sm:max-w-sm border-4 border-pink-400 rounded-xl overflow-hidden bg-white">
            {imageUrl ? (
              <img src={imageUrl} alt="Custom Template" className="absolute w-full h-full object-cover" />
            ) : (
              <div className="absolute w-full h-full flex items-center justify-center text-black bg-white">
                Завантаж зображення
              </div>
            )}
            <p className="absolute bottom-4 left-4 right-4 text-black text-base sm:text-lg font-bold bg-white bg-opacity-70 rounded p-2">
              {message || 'Напиши щось тепле...'}
            </p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Назва шаблону:</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              placeholder="Наприклад: Весілля, День мами"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Привітання:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              rows={4}
              placeholder="Напиши щось тепле..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">URL зображення:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              placeholder="https://example.com/image.png"
            />
          </div>

          <button
            onClick={handleSaveTemplate}
            disabled={isLoading}
            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 transition px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white text-base sm:text-lg shadow disabled:opacity-50"
          >
            {isLoading ? 'Збереження...' : 'Зберегти шаблон'}
          </button>
        </div>
      </div>
    </main>
  );
}