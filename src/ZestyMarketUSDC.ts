import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  ZestyMarket_ERC20_V1,
  AuthorizeOperator,
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
  entity.withdrawn = false;
  entity.save();
}

export function handleSellerNFTUpdate(event: SellerNFTUpdate): void {
  let entity = new SellerNFTSetting(event.params.tokenId.toString());
  entity.autoApprove = event.params.autoApprove == 2 ? true : false;
  entity.inProgressCount = new BigInt(0);
  entity.save();
}

export function handleSellerNFTWithdraw(event: SellerNFTWithdraw): void {
  let entity = new SellerNFTSetting(event.params.tokenId.toString());
  entity.withdrawn = true;
  entity.save();
}

export function handleBuyerCampaignCreate(event: BuyerCampaignCreate): void {
  let entity = new BuyerCampaign(event.params.buyerCampaignId.toString());
  entity.buyer = event.params.buyer;
  entity.uri = event.params.uri;
  entity.save();
}


export function handleSellerAuctionCreate(event: SellerAuctionCreate): void {
  let entity = new SellerAuction(event.params.sellerAuctionId.toString());

  entity.currency = "usdc";
  entity.sellerNFTSetting = event.params.tokenId.toString();
  entity.seller = event.params.seller;
  entity.auctionTimeStart = event.params.auctionTimeStart;
  entity.auctionTimeEnd = event.params.auctionTimeEnd;
  entity.contractTimeStart = event.params.contractTimeStart;
  entity.contractTimeEnd = event.params.contractTimeEnd;
  entity.priceStart = event.params.priceStart;
  entity.priceEnd = new BigInt(0);
  entity.buyerCampaignApproved = event.params.buyerCampaignApproved == 2 ? true : false;
  entity.cancelled = false;

  entity.save();
}

export function handleSellerAuctionCancel(event: SellerAuctionCancel): void {
  let entity = new SellerAuction(event.params.sellerAuctionId.toString());
  entity.cancelled = true;
  entity.save();
}

export function handleSellerAuctionBuyerCampaignNew(
  event: SellerAuctionBuyerCampaignNew
): void {
  let entity = new SellerAuction(event.params.sellerAuctionId.toString());
  entity.buyerCampaign = event.params.buyerCampaignId.toString();
  entity.priceEnd = event.params.priceEnd;
  entity.save();
}

export function handleSellerAuctionBuyerCampaignApprove(
  event: SellerAuctionBuyerCampaignApprove
): void {
  let entity = new SellerAuction(event.params.sellerAuctionId.toString());
  entity.buyerCampaignApproved = true;
  entity.save();
}


export function handleSellerAuctionBuyerCampaignReject(
  event: SellerAuctionBuyerCampaignReject
): void {
  let entity = new SellerAuction(event.params.sellerAuctionId.toString());
  entity.buyerCampaignApproved = false;
  entity.save();
}

export function handleContractCreate(event: ContractCreate): void {
  let entity = new Contract(event.params.contractId.toString());
  entity.sellerAuction = event.params.sellerAuctionId.toString();
  entity.buyerCampaign = event.params.buyerCampaignId.toString();
  entity.contractTimeStart = event.params.contractTimeStart;
  entity.contractTimeEnd = event.params.contractTimeEnd;
  entity.contractValue = event.params.contractValue;
  entity.withdrawn = false;
  entity.save();
}
export function handleContractWithdraw(event: ContractWithdraw): void {
  let entity = new Contract(event.params.contractId.toString());
  entity.withdrawn = true;
  entity.save();
}

export function handleAuthorizeOperator(event: AuthorizeOperator): void {}
export function handleRevokeOperator(event: RevokeOperator): void {}
export function handleDepositZestyNFT(event: DepositZestyNFT): void {}
export function handleWithdrawZestyNFT(event: WithdrawZestyNFT): void {}
export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
