import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      
      <section className="grid md:grid-cols-2 items-center px-4 sm:px-6 py-12 md:py-20 gap-8 max-w-6xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6 text-pink-400 drop-shadow-lg">
            3GWish
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Цифрові NFT-листівки для свят, днів народження та особливих моментів. Анімовані, персоналізовані, з крипто-подарунками.
          </p>          
        </div>
        
      </section>

      
      <section className="bg-gray-800 py-12 md:py-16 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10">Чому NFT-листівки?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto text-gray-200">
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 shadow-md">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Подарунок назавжди</h3>
            <p className="text-sm sm:text-base">На відміну від тимчасових онлайн-листівок, NFT зберігаються в гаманці назавжди.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 shadow-md">
            <div className="text-2xl mb-2">💌</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Персональне привітання</h3>
            <p className="text-sm sm:text-base">Ти можеш додати текст, анімацію й навіть невеликий крипто-бонус.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 shadow-md">
            <div className="text-2xl mb-2">🌐</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Web3-досвід</h3>
            <p className="text-sm sm:text-base">Підключення через гаманець. Жодної реєстрації, усе децентралізовано.</p>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 text-center text-sm mt-8">
        <p className="mb-2">&copy; {new Date().getFullYear()} 3GWish. Всі права захищено.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <a href="https://twitter.com/3gwish" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            Twitter
          </a>
          <a href="https://t.me/threegwish" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            Telegram
          </a>
          <a href="mailto:team@3gwish.xyz" className="hover:text-pink-400">
            Email
          </a>
        </div>
      </footer>
    </main>
  );
}
