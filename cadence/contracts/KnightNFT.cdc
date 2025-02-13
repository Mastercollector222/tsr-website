import NonFungibleToken from 0x631e88ae7f1d7c20

access(all) contract KnightNFT: NonFungibleToken {
    // Events
    access(all) event ContractInitialized()
    access(all) event Withdraw(id: UInt64, from: Address?)
    access(all) event Deposit(id: UInt64, to: Address?)
    access(all) event Minted(id: UInt64, recipient: Address)

    // Total supply of NFTs
    access(all) var totalSupply: UInt64

    // NFT resource
    access(all) resource NFT: NonFungibleToken.INFT {
        access(all) let id: UInt64
        access(all) let metadata: {String: String}

        init(id: UInt64, metadata: {String: String}) {
            self.id = id
            self.metadata = metadata
        }
    }

    // Collection interface
    access(all) resource interface KnightNFTCollectionPublic {
        access(all) fun getIDs(): [UInt64]
        access(all) fun borrowNFT(id: UInt64): &NFT
        access(all) fun deposit(token: @NonFungibleToken.NFT)
        access(all) fun getMetadata(id: UInt64): {String: String}
    }

    // Collection resource
    access(all) resource Collection: KnightNFTCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        // Dictionary of NFT conforming tokens
        access(self) var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        // Withdraw removes an NFT from the collection and moves it to the caller
        access(all) fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) 
                ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        // Deposit takes a NFT and adds it to the collections dictionary
        access(all) fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @KnightNFT.NFT

            let id: UInt64 = token.id

            // Add the new token to the dictionary
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        // GetIDs returns an array of the IDs that are in the collection
        access(all) fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // BorrowNFT gets a reference to an NFT in the collection
        access(all) fun borrowNFT(id: UInt64): &NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?) as! &NFT
        }

        access(all) fun getMetadata(id: UInt64): {String: String} {
            let ref = self.borrowNFT(id: id)
            return ref.metadata
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // Minter resource
    access(all) resource NFTMinter {
        // Mints a new NFT with a new ID and metadata
        access(all) fun mintNFT(metadata: {String: String}): @NFT {
            let currentID = KnightNFT.totalSupply
            KnightNFT.totalSupply = KnightNFT.totalSupply + 1

            let nft <- create NFT(id: currentID, metadata: metadata)
            emit Minted(id: currentID, recipient: self.owner?.address)
            return <-nft
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = 0

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()
        self.account.save(<-minter, to: /storage/KnightNFTMinter)

        emit ContractInitialized()
    }

    // Creates a new empty Collection resource and returns it
    access(all) fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }
}
