import { BigInt, store, log } from "@graphprotocol/graph-ts";
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
  User,
  TokenData,
  SellerNFTSetting, 
  SellerAuction, 
  BuyerCampaign, 
  Contract
} from "../generated/schema";

export function handleSellerNFTDeposit(event: SellerNFTDeposit): void {
  let entity = new SellerNFTSetting(event.params.tokenId.toString());
  let tokenData = TokenData.load(event.params.tokenId.toString());
  
  if (tokenData) {
    entity.tokenData = event.params.tokenId.toString();
    entity.seller = event.params.seller;
    entity.autoApprove = event.params.autoApprove == 2 ? true : false;
    entity.inProgressCount = new BigInt(0);
    entity.withdrawn = false;
    entity.save();
  } 
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
  entity.cumulativeVolumeUSDC = new BigInt(0);
  entity.save();
}


export function handleSellerAuctionCreate(event: SellerAuctionCreate): void {
  let entity = new SellerAuction(event.params.sellerAuctionId.toString());

  entity.currency = "usdc";
  entity.sellerNFTSetting = event.params.tokenId.toString();
  entity.seller = event.params.seller;
  entity.auctionTimeStart = event.params.auctionTimeStart;
  entity.auctionTimeEnd = event.params.auctionTimeEnd;
  entity.auctionTimeApprove = new BigInt(0);
  entity.contractTimeStart = event.params.contractTimeStart;
  entity.contractTimeEnd = event.params.contractTimeEnd;
  entity.priceStart = event.params.priceStart;
  entity.pricePending = new BigInt(0);
  entity.priceEnd = new BigInt(0);
  entity.buyerCampaignsPending = [];
  entity.buyerCampaignsApproved = [];
  entity.buyerCampaigns = [];
  entity.buyerCampaignsIdList = [];
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

  if (entity) {
    let entityBuyerCampaigns = entity.buyerCampaigns;
    if (entityBuyerCampaigns) {
      let entityBuyerCampaignsIdList = entity.buyerCampaignsIdList;
      if (entityBuyerCampaignsIdList) {
        if (entityBuyerCampaigns === [] || entityBuyerCampaigns.length === 0) {
          entityBuyerCampaigns = [event.params.buyerCampaignId.toString()];
          entity.buyerCampaigns = entityBuyerCampaigns;
          entity.save();
        } else {
          entityBuyerCampaigns.push(event.params.buyerCampaignId.toString());
          entity.buyerCampaigns = entityBuyerCampaigns;
          entity.save();
        }

        if (entityBuyerCampaignsIdList === [] || entityBuyerCampaignsIdList.length === 0) {
          entityBuyerCampaignsIdList = [event.params.buyerCampaignId.toString()];
          entity.buyerCampaignsIdList = entityBuyerCampaignsIdList;
          entity.save();
        } else {
          entityBuyerCampaignsIdList.push(event.params.buyerCampaignId.toString());
          entity.buyerCampaignsIdList = entityBuyerCampaignsIdList;
          entity.save();
        }
      }
    }

    let entityBuyerCampaignsPending = entity.buyerCampaignsPending;
    if (entityBuyerCampaignsPending) {
      if (entityBuyerCampaignsPending === [] || entityBuyerCampaignsPending.length === 0) {
        entity.buyerCampaignsPending = [true];
        entity.save();
      } else {
        let buyerCampaignsPending = entityBuyerCampaignsPending;
        buyerCampaignsPending.push(true);
        entity.buyerCampaignsPending = buyerCampaignsPending;
        entity.save();
      }
    }

    let entityBuyerCampaignsApproved = entity.buyerCampaignsApproved;
    if (entityBuyerCampaignsApproved) {
      if (entityBuyerCampaignsApproved === [] || entityBuyerCampaignsApproved.length === 0) {
        entity.buyerCampaignsApproved = [false];
        entity.save();
      } else {
        let buyerCampaignsApproved = entityBuyerCampaignsApproved;
        buyerCampaignsApproved.push(false);
        entity.buyerCampaignsApproved = buyerCampaignsApproved;
        entity.save();
      }
    }

    entity.pricePending = event.params.pricePending;
    entity.save();
  }
}

export function handleSellerAuctionBuyerCampaignApprove(
  event: SellerAuctionBuyerCampaignApprove
): void {
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity) {
    let entityBuyerCampaignsPending = entity.buyerCampaignsPending;
    if (entityBuyerCampaignsPending) {
      if (entityBuyerCampaignsPending !== [] || entityBuyerCampaignsPending.length !== 0) {
        let buyerCampaignsPending = entityBuyerCampaignsPending;
        buyerCampaignsPending[buyerCampaignsPending.length - 1] = false;
        entity.buyerCampaignsPending = buyerCampaignsPending;
      }

      let entityBuyerCampaignsApproved = entity.buyerCampaignsApproved;
      if (entityBuyerCampaignsApproved) {
        if (entityBuyerCampaignsApproved !== [] || entityBuyerCampaignsApproved.length !== 0) {
          let buyerCampaignsApproved = entityBuyerCampaignsApproved;
          buyerCampaignsApproved[buyerCampaignsApproved.length - 1] = true;
          entity.buyerCampaignsApproved = buyerCampaignsApproved;
        }

        entity.pricePending = new BigInt(0);
        entity.priceEnd = event.params.priceEnd;
        entity.auctionTimeApprove = event.block.timestamp;

        entity.save();
      }
    }
  }
}

export function handleSellerAuctionBuyerCampaignReject(
  event: SellerAuctionBuyerCampaignReject
): void {
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity) {
    let entityBuyerCampaignsPending = entity.buyerCampaignsPending;
    if (entityBuyerCampaignsPending) {
      if (entityBuyerCampaignsPending !== [] || entityBuyerCampaignsPending.length !== 0) {
        let buyerCampaignsPending = entityBuyerCampaignsPending;
        buyerCampaignsPending[buyerCampaignsPending.length - 1] = false;
        entity.buyerCampaignsPending = buyerCampaignsPending;
      }

      entity.pricePending = new BigInt(0);
      entity.priceEnd = new BigInt(0);
      entity.save();
    }
  }
}

export function handleSellerAuctionBuyerCampaignBuyerCancel(
  event: SellerAuctionBuyerCampaignBuyerCancel
): void {
  let entity = SellerAuction.load(event.params.sellerAuctionId.toString());

  if (entity) {
    let entityBuyerCampaignsPending = entity.buyerCampaignsPending;
    if (entityBuyerCampaignsPending) {
      if (entityBuyerCampaignsPending !== [] || entityBuyerCampaignsPending.length !== 0) {
        let buyerCampaignsPending = entityBuyerCampaignsPending;
        if (buyerCampaignsPending) {
          buyerCampaignsPending[buyerCampaignsPending.length - 1] = false;
          entity.buyerCampaignsPending = buyerCampaignsPending;
        }
      }

      entity.pricePending = new BigInt(0);
      entity.priceEnd = new BigInt(0);
      entity.save();
    }
  }
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
  let contract = Contract.load(event.params.contractId.toString());

  if (contract) {
    contract.withdrawn = true;
    contract.save();

    let contractSellerAuction = contract.sellerAuction;

    if (contractSellerAuction) {
      let sellerAuction = SellerAuction.load(contractSellerAuction);

      if (sellerAuction) {
        let sellerAuctionSellerNFTSetting = sellerAuction.sellerNFTSetting;
        if (sellerAuctionSellerNFTSetting) {
          let sellerNFTSetting = SellerNFTSetting.load(sellerAuctionSellerNFTSetting);
          if (sellerNFTSetting) {
            let sellerNFTSettingTokenData = sellerNFTSetting.tokenData;
            if (sellerNFTSettingTokenData) {
              let tokenData = TokenData.load(sellerNFTSettingTokenData);
    
              if (tokenData) {
                if (sellerAuction.currency == "usdc") {
                  let contractValue = contract.contractValue;
                  if (contractValue) {
                    // token data logic
                    // update cumulative volume usdc
                    let cumulativeVolumeUSDCToken = tokenData.cumulativeVolumeUSDC;
                    if (cumulativeVolumeUSDCToken) {
                      tokenData.cumulativeVolumeUSDC = cumulativeVolumeUSDCToken.plus(contractValue);
                    }
    
                    // update seller auction count
                    let sellerAuctionCompletedCount = tokenData.sellerAuctionCompletedCount; 
                    if (sellerAuctionCompletedCount) {
                      tokenData.sellerAuctionCompletedCount = sellerAuctionCompletedCount.plus(BigInt.fromI32(1));
                    }
    
                    // update seller auction duration
                    let sellerAuctionCompletedTotalDuration = tokenData.sellerAuctionCompletedTotalDuration;
                    if (sellerAuctionCompletedTotalDuration) {
                      let sellerAuctionContractTimeEnd = sellerAuction.contractTimeEnd;
                      let sellerAuctionContractTimeStart = sellerAuction.contractTimeStart;
                      if (sellerAuctionContractTimeEnd) {
                        if (sellerAuctionContractTimeStart) {
                          tokenData.sellerAuctionCompletedTotalDuration = sellerAuctionCompletedTotalDuration.plus(
                            sellerAuctionContractTimeEnd.minus(sellerAuctionContractTimeStart)
                          );
                        }
                      }
                    }
                    
                    // update seller auction mean usdc per count
                    let sellerAuctionCompletedMeanUSDCPerCount = tokenData.sellerAuctionCompletedMeanUSDCPerCount;
                    if (sellerAuctionCompletedMeanUSDCPerCount) {
                      let cumulativeVolumeUSDCToken = tokenData.cumulativeVolumeUSDC;
                      let sellerAuctionCompletedCount = tokenData.sellerAuctionCompletedCount;
                      if (cumulativeVolumeUSDCToken) {
                        if (sellerAuctionCompletedCount) {
                          tokenData.sellerAuctionCompletedMeanUSDCPerCount = cumulativeVolumeUSDCToken.div(
                            sellerAuctionCompletedCount
                          );
                        }
                      }
                    }
    
                    // update seller auction mean usdc per second
                    let sellerAuctionCompletedMeanUSDCPerSecond = tokenData.sellerAuctionCompletedMeanUSDCPerSecond;
                    if (sellerAuctionCompletedMeanUSDCPerSecond) {
                      let cumulativeVolumeUSDCToken = tokenData.cumulativeVolumeUSDC;
                      let sellerAuctionCompletedTotalDuration = tokenData.sellerAuctionCompletedTotalDuration;
                      if (cumulativeVolumeUSDCToken) {
                        if (sellerAuctionCompletedTotalDuration) {
                          tokenData.sellerAuctionCompletedMeanUSDCPerSecond = cumulativeVolumeUSDCToken.times(BigInt.fromI32(1000000)).div(
                            sellerAuctionCompletedTotalDuration
                          );
                        }
                      }
                    }
    
                    tokenData.save();
    
                    let contractBuyerCampaign = contract.buyerCampaign;
                    if (contractBuyerCampaign) {
                      let buyerCampaign = BuyerCampaign.load(contractBuyerCampaign);
                      if (buyerCampaign) {
                        let cumulativeVolumeUSDCCampaign = buyerCampaign.cumulativeVolumeUSDC;
                        if (cumulativeVolumeUSDCCampaign) {
                          buyerCampaign.cumulativeVolumeUSDC = cumulativeVolumeUSDCCampaign.plus(contractValue);
                          buyerCampaign.save();
                        }
    
                        let buyerCampaignBuyer = buyerCampaign.buyer;
    
                        if (buyerCampaignBuyer) {
                          let userBuyer = User.load(buyerCampaignBuyer.toHex());
                          if (userBuyer) {
                            let userBuyerUSDC = userBuyer.USDCSent;
                            if(userBuyerUSDC) {
                              userBuyer.USDCSent = userBuyerUSDC.plus(contractValue);
                              userBuyer.save();
                            }
                          } else {
                            userBuyer = new User(buyerCampaignBuyer.toHex());
                            userBuyer.USDCSent = contractValue;
                            userBuyer.save();
                          }
                        }
    
                        let sellerAuctionSeller = sellerAuction.seller;
                        if (sellerAuctionSeller) {
                          let userSeller = User.load(sellerAuctionSeller.toHex());
                          if (userSeller) {
                            let userSellerUSDC = userSeller.USDCReceived;
                            if (userSellerUSDC) {
                              userSeller.USDCReceived = userSellerUSDC.plus(contractValue);
                              userSeller.save();
                            }
                          } else {
                            userSeller = new User(sellerAuctionSeller.toHex());
                            userSeller.USDCReceived = contractValue;
                            userSeller.save();
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export function handleAuthorizeOperator(event: AuthorizeOperator): void {}
export function handleRevokeOperator(event: RevokeOperator): void {}
export function handleDepositZestyNFT(event: DepositZestyNFT): void {}
export function handleWithdrawZestyNFT(event: WithdrawZestyNFT): void {}

export function handleSellerBan(event: SellerBan): void {}

export function handleSellerUnban(event: SellerUnban): void {}
