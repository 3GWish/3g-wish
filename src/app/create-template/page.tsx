'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function CreateCustomTemplate() {
  const [templateName, setTemplateName] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName || !imageUrl) {
      toast.error('Заповніть назву та зображення шаблону.');
      return;
    }

    const existingTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');

    const newTemplate = {
      name: templateName,
      message,
      image: imageUrl,
    };

    localStorage.setItem('customTemplates', JSON.stringify([...existingTemplates, newTemplate]));
    toast.success('Шаблон збережено!');
    setTemplateName('');
    setMessage('');
    setImageUrl('');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">Створити власний шаблон</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Превʼю</h2>
          <div className="relative w-full aspect-[4/5] max-w-sm border-4 border-pink-400 rounded-xl overflow-hidden bg-white">
            {imageUrl ? (
              <img src={imageUrl} alt="Custom Template" className="absolute w-full h-full object-cover" />
            ) : (
              <div className="absolute w-full h-full flex items-center justify-center text-black bg-white">
                Завантаж зображення
              </div>
            )}
            <p className="absolute bottom-4 left-4 right-4 text-black text-lg font-bold bg-white bg-opacity-70 rounded p-2">
              {message || 'Напиши щось тепле...'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Назва шаблону:</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              placeholder="Наприклад: Весілля, День мами"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Привітання:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
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
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              placeholder="https://example.com/image.png"
            />
          </div>

          <button
            onClick={handleSaveTemplate}
            className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-xl text-white text-lg shadow"
          >
            Зберегти шаблон
          </button>
        </div>
      </div>
    </main>
  );
}