import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  ZestyMarket_ERC20_V1_1,
  AuthorizeOperator,
  BuyerCampaignCreate,
  ContractCreate,
  ContractWithdraw,
  DepositZestyNFT,
  RevokeOperator,
  SellerAuctionBuyerCampaignApprove,
  SellerAuctionBuyerCampaignBuyerCancel,
  SellerAuctionBuyerCampaignNew,
  SellerAuctionBuyerCampaignReject,
  SellerAuctionCancel,
  SellerAuctionCreate,
  SellerBan,
  SellerNFTDeposit,
  SellerNFTUpdate,
  SellerNFTWithdraw,
  SellerUnban,
  WithdrawZestyNFT
} from "../generated/ZestyMarket_ERC20_V1_1/ZestyMarket_ERC20_V1_1";
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
  entity.inProgressCount = event.params.inProgressCount;
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
  entity.pricePending = new BigInt(0);
  entity.priceEnd = new BigInt(0);
  entity.buyerCampaignsPending = [];
  entity.buyerCampaignsApproved = [];
  entity.buyerCampaigns = [];
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
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity.buyerCampaigns === [] || entity.buyerCampaigns.length === 0) {
    entity.buyerCampaigns = [event.params.buyerCampaignId.toString()];
  } else {
    let buyerCampaigns = entity.buyerCampaigns;
    buyerCampaigns.push(event.params.buyerCampaignId.toString());
    entity.buyerCampaigns = buyerCampaigns;
  }

  if (entity.buyerCampaignsPending === [] || entity.buyerCampaignsPending.length === 0) {
    entity.buyerCampaignsPending = [true];
  } else {
    let buyerCampaignsPending = entity.buyerCampaignsPending;
    buyerCampaignsPending.push(true);
    entity.buyerCampaignsPending = buyerCampaignsPending;
  }

  if (entity.buyerCampaignsApproved === [] || entity.buyerCampaignsApproved.length === 0) {
    entity.buyerCampaignsApproved = [false];
  } else {
    let buyerCampaignsApproved = entity.buyerCampaignsApproved;
    buyerCampaignsApproved.push(false);
    entity.buyerCampaignsApproved = buyerCampaignsApproved;
  }

  entity.pricePending = event.params.pricePending;
  entity.save();
}

export function handleSellerAuctionBuyerCampaignApprove(
  event: SellerAuctionBuyerCampaignApprove
): void {
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity.buyerCampaignsPending !== [] || entity.buyerCampaignsPending.length !== 0) {
    let buyerCampaignsPending = entity.buyerCampaignsPending;
    buyerCampaignsPending[buyerCampaignsPending.length - 1] = false;
    entity.buyerCampaignsPending = buyerCampaignsPending;
  }

  if (entity.buyerCampaignsApproved !== [] || entity.buyerCampaignsApproved.length !== 0) {
    let buyerCampaignsApproved = entity.buyerCampaignsApproved;
    buyerCampaignsApproved[buyerCampaignsApproved.length - 1] = true;
    entity.buyerCampaignsApproved = buyerCampaignsApproved;
  }

  entity.pricePending = new BigInt(0);
  entity.priceEnd = event.params.priceEnd;

  entity.save();
}

export function handleSellerAuctionBuyerCampaignReject(
  event: SellerAuctionBuyerCampaignReject
): void {
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity.buyerCampaignsPending !== [] || entity.buyerCampaignsPending.length !== 0) {
    let buyerCampaignsPending = entity.buyerCampaignsPending;
    buyerCampaignsPending[buyerCampaignsPending.length - 1] = false;
    entity.buyerCampaignsPending = buyerCampaignsPending;
  }

  entity.pricePending = new BigInt(0);
  entity.priceEnd = new BigInt(0);
  entity.save();
}

export function handleSellerAuctionBuyerCampaignBuyerCancel(
  event: SellerAuctionBuyerCampaignBuyerCancel
): void {
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity.buyerCampaignsPending !== [] || entity.buyerCampaignsPending.length !== 0) {
    let buyerCampaignsPending = entity.buyerCampaignsPending;
    buyerCampaignsPending[buyerCampaignsPending.length - 1] = false;
    entity.buyerCampaignsPending = buyerCampaignsPending;
  }

  entity.pricePending = new BigInt(0);
  entity.priceEnd = new BigInt(0);
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

export function handleSellerBan(event: SellerBan): void {}

export function handleSellerUnban(event: SellerUnban): void {}
