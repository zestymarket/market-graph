import { BigInt, store } from "@graphprotocol/graph-ts";
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
} from "../generated/ZestyMarket_ERC20_V1/ZestyMarket_ERC20_V1";
import { 
  TokenData, 
  SellerNFTSetting, 
  SellerAuction, 
  BuyerCampaign, 
  Contract
} from "../generated/schema";

export function handleSellerNFTDeposit(event: SellerNFTDeposit): void {
  let entity = new SellerNFTSetting(event.params.tokenId.toString());

  entity.tokenData = event.params.tokenId.toString();
  entity.seller = event.params.seller;
  entity.autoApprove = event.params.autoApprove == 2 ? true : false;
  entity.inProgressCount = new BigInt(0);
  entity.save();
}

export function handleSellerNFTUpdate(event: SellerNFTUpdate): void {
  let entity = new SellerNFTSetting(event.params.tokenId.toString());
  entity.autoApprove = event.params.autoApprove == 2 ? true : false;
  entity.inProgressCount = new BigInt(0);
  entity.save();
}

export function handleSellerNFTWithdraw(event: SellerNFTWithdraw): void {
  let id = event.params.tokenId.toString();
  store.remove("SellerNFTSetting", id);
}

export function handleWithdrawZestyNFT(event: WithdrawZestyNFT): void {}

export function handleBuyerCampaignCancel(event: BuyerCampaignCancel): void {}

export function handleBuyerCampaignCreate(event: BuyerCampaignCreate): void {}

export function handleContractCreate(event: ContractCreate): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}


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

