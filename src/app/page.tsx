import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-pink-400 drop-shadow-lg">3GWish</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-6">
          Цифрові NFT-листівки для свят, днів народження та особливих моментів. Анімовані, персоналізовані, з крипто-подарунками.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-xl text-white text-lg shadow-lg mb-4">
          🔗 Підключити гаманець
        </button>
        <Link
          href="/cards"
          className="text-pink-400 underline hover:text-pink-300 transition"
        >
          Переглянути мої листівки →
        </Link>
      </section>

      
      <section className="bg-gray-800 py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">Чому NFT-листівки?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-gray-200">
          <div className="bg-gray-900 rounded-xl p-6 shadow-md">
            🎁 <h3 className="text-xl font-bold mb-2">Подарунок назавжди</h3>
            <p>На відміну від тимчасових онлайн-листівок, NFT зберігаються в гаманці назавжди.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-md">
            💌 <h3 className="text-xl font-bold mb-2">Персональне привітання</h3>
            <p>Ти можеш додати текст, анімацію й навіть невеликий крипто-бонус.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-md">
            🌐 <h3 className="text-xl font-bold mb-2">Web3-досвід</h3>
            <p>Підключення через гаманець. Жодної реєстрації, усе децентралізовано.</p>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 text-center text-sm mt-8">
        <p className="mb-2">&copy; {new Date().getFullYear()} 3GWish. Всі права захищено.</p>
        <div className="flex justify-center space-x-4">
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
