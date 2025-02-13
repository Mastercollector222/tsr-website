import * as fcl from "@onflow/fcl";

// Contract addresses
const NFT_ADDRESS = "0x631e88ae7f1d7c20"; // NonFungibleToken contract
const KNIGHT_NFT_ADDRESS = "YOUR_CONTRACT_ADDRESS"; // You'll need to deploy this

export const setupUserNFTCollection = `
  import NonFungibleToken from 0x${NFT_ADDRESS}



  import KnightNFT from 0x${KNIGHT_NFT_ADDRESS}

  transaction {
    prepare(acct: AuthAccount) {
      // Check if the user already has a collection
      if acct.borrow<&KnightNFT.Collection>(from: /storage/KnightNFTCollection) == nil {
        // Create a new empty collection
        let collection <- KnightNFT.createEmptyCollection()
        
        // Save it to the account
        acct.save(<-collection, to: /storage/KnightNFTCollection)

        // Create a public capability for the collection
        acct.link<&{NonFungibleToken.CollectionPublic, KnightNFT.KnightNFTCollectionPublic}>(
          /public/KnightNFTCollection,
          target: /storage/KnightNFTCollection
        )
      }
    }
  }
`;

export const mintKnightNFT = `
  import NonFungibleToken from 0x${NFT_ADDRESS}
  import KnightNFT from 0x${KNIGHT_NFT_ADDRESS}

  transaction(recipient: Address, metadata: {String: String}) {
    let minter: &KnightNFT.NFTMinter
    let recipientCollection: &{NonFungibleToken.CollectionPublic}

    prepare(admin: AuthAccount) {
      // Get the minter reference from the admin account
      self.minter = admin.borrow<&KnightNFT.NFTMinter>(from: /storage/KnightNFTMinter)
        ?? panic("Could not borrow minter reference")
+      // Get the recipient's public collection reference
      self.recipientCollection = getAccount(recipient)
        .getCapability(/public/KnightNFTCollection)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow recipient collection reference")
    }

    execute {
      // Mint the NFT and deposit it to the recipient's collection
      let nft <- self.minter.mintNFT(metadata: metadata)
      self.recipientCollection.deposit(token: <-nft)
    }
  }
`;

export async function setupCollection() {
  try {
    const transactionId = await fcl.mutate({
      cadence: setupUserNFTCollection,
      limit: 9999
    });

    return fcl.tx(transactionId).onceSealed();
  } catch (error) {
    console.error("Error setting up NFT collection:", error);
    throw error;
  }
}

export async function mintNFT(recipientAddress, metadata) {
  try {
    const transactionId = await fcl.mutate({
      cadence: mintKnightNFT,
      args: (arg, t) => [
        arg(recipientAddress, t.Address),
        arg(metadata, t.Dictionary({ key: t.String, value: t.String }))
      ],
      limit: 9999
    });

    return fcl.tx(transactionId).onceSealed();
  } catch (error) {
    console.error("Error minting Knight NFT:", error);
    throw error;
  }
}
