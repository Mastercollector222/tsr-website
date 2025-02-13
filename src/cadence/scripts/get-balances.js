export const getTSRBalance = `
  import FungibleToken from 0xf233dcee88fe0abe
  import TopShotRewardsCommunity from 0xbb39f0dae1547256
  import FungibleTokenMetadataViews from 0xf233dcee88fe0abe

  access(all) fun main(address: Address): UFix64 {
    let vaultData = TopShotRewardsCommunity.resolveContractView(
      resourceType: nil, 
      viewType: Type<FungibleTokenMetadataViews.FTVaultData>()
    ) as! FungibleTokenMetadataViews.FTVaultData?
      ?? panic("Could not get FTVaultData view for the TopShotRewardsCommunity contract")

    return getAccount(address).capabilities
      .borrow<&{FungibleToken.Balance}>(vaultData.metadataPath)
      ?.balance
      ?? panic("Could not borrow Balance reference to the TSR Vault in account "
        .concat(address.toString())
        .concat(" at path ")
        .concat(vaultData.metadataPath.toString())
        .concat(". Make sure you have a TSR Vault set up properly."))
  }
`;

export const getFlowBalance = `
  access(all) fun main(address: Address): UFix64 {
    let acc = getAccount(address)
    let balance = acc.availableBalance
    return balance
  }
`;
