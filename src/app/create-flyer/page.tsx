"use client"
import { useState } from 'react';

const templates = {
  birthday: '/templates/birthday.png',
  valentine: '/templates/valentine.png',
  newyear: '/templates/newyear.png',
} as const;

type TemplateKey = keyof typeof templates;

export default function CreateCard() {
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState<TemplateKey>('birthday');

  const handleMint = () => {
    const metadata = {
      template: templates[template],
      message: message || 'Напиши щось тепле...',
      recipientWallet: 'Адреса гаманця отримувача',
      createdAt: new Date().toISOString(),
    };

    alert(`Мета-дані для мінта NFT:
    Шаблон: ${metadata.template}
    Повідомлення: ${metadata.message}
    Адресат: ${metadata.recipientWallet}
    Дата створення: ${metadata.createdAt}`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">Створити NFT-листівку</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Превʼю</h2>
          <div className="relative w-full aspect-[4/5] max-w-sm border-4 border-pink-400 rounded-xl overflow-hidden bg-white">
            <img
              src={templates[template]}
              alt="Template"
              className="absolute w-full h-full object-cover"
            />
            <p className="absolute bottom-4 left-4 right-4 text-black text-lg font-bold bg-white bg-opacity-70 rounded p-2">
              {message || 'Напиши щось тепле...'}
            </p>
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
            </select>
          </div>

          <button
            onClick={handleMint}
            className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-xl text-white text-lg shadow"
          >
            Створити NFT 
          </button>
        </div>
      </div>
    </main>
  );
}
