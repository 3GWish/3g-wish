'use client';

import Link from 'next/link';
import PhantomConnection from './PhantomConnection';
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { connected } = useWallet();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [isMenuOpen]);

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow relative">
            <Link href="/" className="text-2xl font-bold text-pink-400">
                3GWish
            </Link>
           
            <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>

            
            <div className="hidden md:flex items-center gap-4">
                {connected && (
                    <>
                        <Link href="/cards" className="hover:text-pink-400 transition">
                            🎁 Мої листівки
                        </Link>
                        <Link href="/create-flyer" className="hover:text-pink-400 transition">
                            ✨ Створити
                        </Link>
                    </>
                )}
                <div>
                    <PhantomConnection />
                </div>
            </div>

            
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center md:hidden">
                    <div className="absolute top-4 left-4 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-pink-400" onClick={() => setIsMenuOpen(false)}>
                            3GWish
                        </Link>
                    </div>
                    <button
                        className="absolute top-4 right-4 text-pink-400 text-3xl p-2 rounded hover:bg-pink-900/20 focus:outline-none"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Закрыть меню"
                    >
                        ✕
                    </button>
                    <div className="flex flex-col items-center space-y-6 mt-16">
                        {connected && (
                            <>
                                <Link 
                                    href="/cards" 
                                    className="hover:text-pink-400 transition text-lg font-semibold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🎁 Мої листівки
                                </Link>
                                <Link 
                                    href="/create-flyer" 
                                    className="hover:text-pink-400 transition text-lg font-semibold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ✨ Створити
                                </Link>
                            </>
                        )}
                        <div className="w-full flex justify-center">
                            <PhantomConnection />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
