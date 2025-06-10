'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface TopTemplate {
  id: string;
  name: string;
  image_url: string;
  wallet_address: string;
  usage_count: number;
}

export default function TopTemplates() {
  const [templates, setTemplates] = useState<TopTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTemplates = async () => {
      try {
        const response = await fetch('/api/templates/top');
        const data = await response.json();
        if (response.ok) {
          setTemplates(data);
        } else {
          throw new Error(data.error || 'Failed to fetch top templates');
        }
      } catch (error) {
        console.error(error);
        toast.error('Не вдалося завантажити топ шаблонів');
      } finally {
        setLoading(false);
      }
    };

    fetchTopTemplates();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-4 sm:mb-6">Топ шаблонів</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : templates.length === 0 ? (
        <p className="text-gray-400 text-center py-8">Немає даних про шаблони</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {templates.map((template, index) => (
            <div 
              key={template.id} 
              className="bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-pink-400/20 transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-pink-400 font-bold text-lg">#{index + 1}</span>
                <span className="text-gray-300 text-sm">
                  Використано: <span className="text-pink-400 font-bold">{template.usage_count}</span> разів
                </span>
              </div>
              
              <div className="relative w-full border-4 border-pink-400 rounded-xl overflow-hidden bg-white mb-3">
                <img
                  src={template.image_url}
                  alt={template.name}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.png';
                  }}
                />
              </div>
              
              <h3 className="text-lg font-semibold text-white truncate">{template.name}</h3>
              <p className="text-gray-400 text-sm truncate">
                Автор: {template.wallet_address.slice(0, 6)}...{template.wallet_address.slice(-4)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}