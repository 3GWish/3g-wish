import { NextResponse } from 'next/server';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { createMintToInstruction } from '@solana/spl-token';
import { Metaplex, keypairIdentity, toMetaplexFile } from '@metaplex-foundation/js';

export async function POST(request: Request) {
  try {
    const { imageUrl, recipientWallet, projectId } = await request.json();

    
    const connection = new Connection(clusterApiUrl('devnet'));
    
    
    const projectKeypair = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(process.env.PROJECT_PRIVATE_KEY!))
    );

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(projectKeypair));

    
    const { uri } = await metaplex
      .nfts()
      .uploadMetadata({
        name: `Community NFT #${Date.now()}`,
        description: `Reward for activity in project ${projectId}`,
        image: imageUrl,
        attributes: [
          { trait_type: "Project", value: projectId },
          { trait_type: "Reward Type", value: "Activity" }
        ]
      });

    
    const { nft } = await metaplex
      .nfts()
      .create({
        uri,
        name: `Community Reward #${Date.now()}`,
        sellerFeeBasisPoints: 0, 
        tokenOwner: recipientWallet,
      });

    return NextResponse.json({
      success: true,
      nftAddress: nft.address.toString(),
      explorerUrl: `https://explorer.solana.com/address/${nft.address.toString()}`
    });

  } catch (error) {
    console.error('Mint NFT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mint NFT' },
      { status: 500 }
    );
  }
}