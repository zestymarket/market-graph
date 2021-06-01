import { BigInt, store } from "@graphprotocol/graph-ts"
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

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBurn(event: Burn): void {
  let id = event.params.id.toString();
  store.remove("TokenData", id);
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
  entity.timeCreated = event.params.timeCreated;
  entity.uri = event.params.uri;
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

  entity.owner = event.params.to;
  entity.save();
}
