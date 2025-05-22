'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity, Nft } from '@metaplex-foundation/js';

export default function Cards() {
  const { publicKey, connected, wallet } = useWallet();
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey || !wallet) return;
    
      const connection = new Connection(clusterApiUrl('devnet'));
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet.adapter));
    
      const allNfts = await metaplex.nfts().findAllByOwner({ owner: publicKey });
    
      const detailedNfts = await Promise.all(
        allNfts
          .filter((nft) => nft.model === 'metadata')
          .map(async (nft) => await metaplex.nfts().load({ metadata: nft }))
      );    
      
      const onlyGiftNfts = detailedNfts.filter(
        (nft) => nft.model === 'nft' && nft.symbol === 'GIFT'
      ) as Nft[];
    
      setNfts(onlyGiftNfts);
    };
    

    fetchNFTs();
  }, [publicKey, wallet]);

  if (!connected) {
    return (
      <main className="min-h-screen bg-black text-white p-4 sm:p-6">
        <p className="text-center text-gray-400 text-lg sm:text-xl">🔌 Підключи гаманець, щоб переглянути NFT-листівки.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-4 sm:mb-6">Мої NFT-листівки</h1>
      {nfts.length === 0 ? (
        <p className="text-gray-400 text-center sm:text-left">У цьому гаманці ще немає NFT-листівок 😔</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {nfts.map((nft) => (
            <div key={nft.address.toBase58()} className="bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg">
              <div className="aspect-[4/3] relative mb-3 sm:mb-4">
                <img 
                  src={nft.json?.image || ''} 
                  alt={nft.name} 
                  className="rounded-lg object-cover w-full h-full" 
                />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-pink-300 mb-2">{nft.name}</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-2 line-clamp-2">{nft.json?.description}</p>
              <span className="text-xs sm:text-sm text-gray-500 block truncate">
                Mint: {nft.address.toBase58().slice(0, 6)}...
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
