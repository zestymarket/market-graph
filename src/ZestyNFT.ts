import { BigInt, Bytes, Entity, store } from "@graphprotocol/graph-ts"
import {
  ZestyNFT,
  Approval,
  ApprovalForAll,
  Burn,
  LockZestyToken,
  Mint,
  ModifyToken,
  NewZestyTokenAddress,
  OwnershipTransferred,
  Transfer
} from "../generated/ZestyNFT/ZestyNFT"
import { TokenData } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = new TokenData(event.params.tokenId.toString());
  entity.approved = event.params.approved;
  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBurn(event: Burn): void {
  let entity = new TokenData(event.params.id.toString()); 
  entity.burned = true;
  entity.save();
}

export function handleLockZestyToken(event: LockZestyToken): void {
  let entity = new TokenData(event.params.id.toString()); 

  entity.zestyTokenValue = event.params.zestyTokenValue;
  entity.save();
}

export function handleMint(event: Mint): void {
  let entity = new TokenData(event.params.id.toString());

  entity.id = event.params.id.toString();
  entity.creator = event.params.creator;
  entity.owner = event.params.creator;
  entity.approved = new Bytes(0);
  entity.timeCreated = event.params.timeCreated;
  entity.uri = event.params.uri;
  entity.burned = false;
  entity.zestyTokenValue = new BigInt(0);
  entity.cumulativeVolumeUSDC = new BigInt(0);
  entity.sellerAuctionCompletedCount = new BigInt(0);
  entity.sellerAuctionCompletedTotalDuration = new BigInt(0);
  entity.sellerAuctionCompletedMeanUSDCPerCount = new BigInt(0);
  entity.sellerAuctionCompletedMeanUSDCPerSecond = new BigInt(0);
  entity.save();
}

export function handleModifyToken(event: ModifyToken): void {
  let entity = new TokenData(event.params.id.toString());

  entity.uri = event.params.uri;

  entity.save();
}

export function handleNewZestyTokenAddress(event: NewZestyTokenAddress): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
  let entity = new TokenData(event.params.tokenId.toString());
  entity.approved = new Bytes(0);
  entity.owner = event.params.to;
  entity.save();
}
