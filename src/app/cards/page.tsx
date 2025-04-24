export default function Cards() {
    const mockCards = [
      {
        id: 1,
        title: "🎉 Happy Birthday!",
        message: "Бажаю щастя, радості та незабутніх моментів у цей особливий день!",
        date: "2025-04-24",
      },
      {
        id: 2,
        title: "💖 Valentine's NFT",
        message: "Ти — найкращий подарунок у моєму житті. Love you to the Moon and back!",
        date: "2025-02-14",
      },
      {
        id: 3,
        title: "🌟 New Year 2025",
        message: "Нехай новий рік принесе ще більше Web3-натхнення та здійснення мрій!",
        date: "2025-01-01",
      },
    ];
  
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold text-pink-400 mb-6">Мої NFT-листівки</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCards.map((card) => (
            <div key={card.id} className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-pink-600 transition">
              <h2 className="text-xl font-semibold text-pink-300 mb-2">{card.title}</h2>
              <p className="text-gray-300 mb-3">{card.message}</p>
              <span className="text-sm text-gray-500">📅 {card.date}</span>
            </div>
          ))}
        </div>
      </main>
    );
  }
  