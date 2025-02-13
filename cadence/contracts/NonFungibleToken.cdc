/**
## The Flow Non-Fungible Token standard
*/

access(all) contract interface NonFungibleToken {

    access(all) var totalSupply: UInt64

    access(all) event ContractInitialized()

    access(all) event Withdraw(id: UInt64, from: Address?)

    access(all) event Deposit(id: UInt64, to: Address?)

    access(all) resource interface INFT {
        access(all) let id: UInt64
    }

    access(all) resource interface Provider {
        access(all) fun withdraw(withdrawID: UInt64): @NFT {
            post {
                result.id == withdrawID: "The ID of the withdrawn token must be the same as the requested ID"
            }
        }
    }

    access(all) resource interface Receiver {
        access(all) fun deposit(token: @NFT)
    }

    access(all) resource interface CollectionPublic {
        access(all) fun deposit(token: @NFT)
        access(all) fun getIDs(): [UInt64]
        access(all) fun borrowNFT(id: UInt64): &NFT
    }

    access(all) resource NFT: INFT {
        access(all) let id: UInt64
    }

    access(all) resource Collection: Provider, Receiver, CollectionPublic {
        access(all) var ownedNFTs: @{UInt64: NFT}
        access(all) fun withdraw(withdrawID: UInt64): @NFT
        access(all) fun deposit(token: @NFT)
        access(all) fun getIDs(): [UInt64]
        access(all) fun borrowNFT(id: UInt64): &NFT
    }

    access(all) fun createEmptyCollection(): @Collection {
        post {
            result.getIDs().length == 0: "The created collection must be empty!"
        }
    }
}
