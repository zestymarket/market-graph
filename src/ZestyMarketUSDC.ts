import { BigInt } from "@graphprotocol/graph-ts"
import {
  ZestyMarket_ERC20_V1,
  AuthorizeOperator,
  BuyerCampaignCancel,
  BuyerCampaignCreate,
  ContractCreate,
  ContractWithdraw,
  DepositZestyNFT,
  OwnershipTransferred,
  RevokeOperator,
  SellerAuctionBuyerCampaignApprove,
  SellerAuctionBuyerCampaignNew,
  SellerAuctionBuyerCampaignReject,
  SellerAuctionCancel,
  SellerAuctionCreate,
  SellerNFTDeposit,
  SellerNFTUpdate,
  SellerNFTWithdraw,
  WithdrawZestyNFT
} from "../generated/ZestyMarket_ERC20_V1/ZestyMarket_ERC20_V1"
import { ExampleEntity } from "../generated/schema"

export function handleAuthorizeOperator(event: AuthorizeOperator): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.depositor = event.params.depositor
  entity.operator = event.params.operator

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getBuyerCampaign(...)
  // - contract.getContract(...)
  // - contract.getDepositor(...)
  // - contract.getERC20Address(...)
  // - contract.getOperator(...)
  // - contract.getSellerAuction(...)
  // - contract.getSellerAuctionPrice(...)
  // - contract.getSellerNFTSetting(...)
  // - contract.getZestyNFTAddress(...)
  // - contract.isDepositor(...)
  // - contract.isOperator(...)
  // - contract.onERC721Received(...)
  // - contract.owner(...)
}

export function handleBuyerCampaignCancel(event: BuyerCampaignCancel): void {}

export function handleBuyerCampaignCreate(event: BuyerCampaignCreate): void {}

export function handleContractCreate(event: ContractCreate): void {}

export function handleContractWithdraw(event: ContractWithdraw): void {}

export function handleDepositZestyNFT(event: DepositZestyNFT): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRevokeOperator(event: RevokeOperator): void {}

export function handleSellerAuctionBuyerCampaignApprove(
  event: SellerAuctionBuyerCampaignApprove
): void {}

export function handleSellerAuctionBuyerCampaignNew(
  event: SellerAuctionBuyerCampaignNew
): void {}

export function handleSellerAuctionBuyerCampaignReject(
  event: SellerAuctionBuyerCampaignReject
): void {}

export function handleSellerAuctionCancel(event: SellerAuctionCancel): void {}

export function handleSellerAuctionCreate(event: SellerAuctionCreate): void {}

export function handleSellerNFTDeposit(event: SellerNFTDeposit): void {}

export function handleSellerNFTUpdate(event: SellerNFTUpdate): void {}

export function handleSellerNFTWithdraw(event: SellerNFTWithdraw): void {}

export function handleWithdrawZestyNFT(event: WithdrawZestyNFT): void {}
