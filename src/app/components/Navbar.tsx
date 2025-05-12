'use client';

import Link from 'next/link';
import PhantomConnection from './PhantomConnection';
import { useWallet } from "@solana/wallet-adapter-react";

export default function Navbar() {

    const { connected } = useWallet();

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
            <Link href="/" className="text-2xl font-bold text-pink-400">
                3GWish
            </Link>

            <div className="flex items-center gap-4">
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
        </nav>
    );
}
