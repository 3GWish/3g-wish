import { WalletContextState } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity, toMetaplexFile } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import axios from "axios";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");



export async function GiftNFT(
  wallet: WalletContextState,
  message: string,
  recipientWallet: string,
  templateUrl: string
) {
  if (!wallet.publicKey || !wallet.wallet?.adapter) {
    throw new Error("Wallet not connected");
  }

  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet.wallet.adapter));

  
  const imageRes = await axios.get(templateUrl, { responseType: "blob" });
  const imageFile = new File([imageRes.data], "template.png", { type: "image/png" });

  
  const formData = new FormData();
  formData.append("file", imageFile);

  const uploadedImage = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxContentLength: Infinity,
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  const imageUrl = `https://gateway.pinata.cloud/ipfs/${uploadedImage.data.IpfsHash}`;

  const metadata = {
    name: `Gift NFT Card`,
    description: message,
    image: imageUrl,
    attributes: [
      { trait_type: "Message", value: message },
      { trait_type: "Template", value: templateUrl }
    ]
  };

  const metadataRes = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    metadata,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    }
  );

  const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataRes.data.IpfsHash}`;

  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: "Gift NFT Card",
    symbol: "GIFT",
    sellerFeeBasisPoints: 0,
    tokenOwner: new PublicKey(recipientWallet),
  });

  return nft.address.toBase58();
}

