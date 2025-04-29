import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      
      <section className="grid md:grid-cols-2 items-center px-6 py-20 gap-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-5xl font-extrabold mb-6 text-pink-400 drop-shadow-lg">
            3GWish
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Цифрові NFT-листівки для свят, днів народження та особливих моментів. Анімовані, персоналізовані, з крипто-подарунками.
          </p>          
        </div>

        <div className="flex justify-center">
          <Image
            src="/nft-card-preview.png"
            alt="NFT листівка"
            width={400}
            height={300}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      
      <section className="bg-gray-800 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">Чому NFT-листівки?</h2>
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
