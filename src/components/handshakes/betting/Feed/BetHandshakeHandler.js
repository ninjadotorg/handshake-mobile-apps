import { MasterWallet } from '@/models/MasterWallet';
import { BettingHandshake } from '@/services/neuron';
import { connect } from 'react-redux';
import { HANDSHAKE_ID, API_URL, APP } from '@/constants';

import local from '@/services/localStore';
import { uninitItem, collect, refund, rollback } from '@/reducers/handshake/action';
import store from '@/stores';


/*
'STATUS_MAKER_UNINIT_PENDING': -8,
    'STATUS_COLLECT_PENDING': -7,
    'STATUS_REFUND_PENDING': -6,
    'STATUS_DISPUTE_PENDING': -5,
    'STATUS_BLOCKCHAIN_PENDING': -4,
    'STATUS_NEW': -3,
    'STATUS_TRANSACTION_FAILED': -2,

    'STATUS_PENDING': -1,
    'STATUS_INITED': 0,
    'STATUS_MAKER_UNINITED': 1,
    'STATUS_SHAKER_SHAKED': 2,
    'STATUS_REFUND': 3,
    'STATUS_DISPUTE': 4,
    'STATUS_RESOLVE': 5,
    'STATUS_DONE': 6,
    */

export const MESSAGE = {
  BET_PROGRESSING: 'Your bet is creating. Please wait',
  CREATE_BET_SUCCESSFUL: 'Success! You placed a bet.',
  NOT_ENOUGH_BALANCE: 'Go to wallet to request free ETH',
  CHOOSE_MATCH: 'Please choose match and outcome',
  ODD_LARGE_THAN: 'Please enter odds greater than 1',
  AMOUNT_VALID: 'Please place a bet larger than 0.',
  MATCH_OVER: 'Time travel is hard. Please bet on a future or ongoing match.',
};

export const BET_BLOCKCHAIN_STATUS = {
  STATUS_PENDING: -1,
  STATUS_INITED: 0,
  STATUS_MAKER_UNINITED: 1,
  STATUS_SHAKER_SHAKED: 2,
  STATUS_REFUNDING: 3,
  STATUS_REFUND: 4,
  STATUS_DONE: 5,
  STATUS_BLOCKCHAIN_PENDING: -4,
};

export const ROLE = {
  INITER: 1,
  SHAKER: 2,
};

export const SIDE = {
  SUPPORT: 1,
  AGAINST: 2,
};

export const BETTING_STATUS = {
  INITED: -1,
  DRAW: 0,
  SUPPORT_WIN: 1,
  AGAINST_WIN: 2,
};

export const BETTING_STATUS_LABEL =
    {
      INITING: 'Your bet is being placed',
      CANCEL: 'Cancel this bet',
      LOSE: 'Better luck next time.',
      WIN: `You're a winner!`,
      DONE: 'Completed',
      WITHDRAW: 'Withdraw winnings',
      CANCELLING: 'Your bet is being cancelled.',
      PROGRESSING: 'Your bet is progressing.',
      WAITING_RESULT: 'Waiting for the outcome',
      REFUND: 'Refund your bet',
      CANCELLED: 'Your bet was cancelled.',
      REFUNDING: 'Your coin is being refunded to you.',
      REFUNDED: 'Your coin has been refunded.',
    };

export class BetHandshakeHandler {
  constructor() {

  }
  getChainIdDefaultWallet(){
    const wallet = MasterWallet.getWalletDefault('ETH');
    const chainId = wallet.chainId;
    console.log('ChainId:', chainId);
    return chainId;
  }
  getStatusLabel(blockchainStatus, resultStatus, role, side, isMatch) {
    let label = null;
    let strStatus = null;
    let isAction = false;
    console.log('getStatusLabel Role:', role);
    console.log('getStatusLabel isMatch:', isMatch);
    console.log('getStatusLabel Blockchain status:', blockchainStatus);
    if (blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_PENDING) {
      strStatus = BETTING_STATUS_LABEL.INITING;
      isAction = false;
    } else if (blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_MAKER_UNINITED) {
      strStatus = BETTING_STATUS_LABEL.CANCELLED;
      isAction = false;
    } else if (blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_REFUND) {
      strStatus = BETTING_STATUS_LABEL.REFUNDED;
      isAction = false;
    } else if (blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_DONE && resultStatus === BETTING_STATUS.SUPPORT_WIN && side === SIDE.SUPPORT) {
      strStatus = BETTING_STATUS_LABEL.WIN;
      isAction = false;
    } else if (blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_DONE && resultStatus === BETTING_STATUS.SUPPORT_WIN && side === SIDE.AGAINST) {
      strStatus = BETTING_STATUS_LABEL.WIN;
      isAction = false;
    } else if (blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_BLOCKCHAIN_PENDING) {
      // TO DO: scan txhash and rollback after a few minutes
      strStatus = BETTING_STATUS_LABEL.PROGRESSING;
      isAction = false;
    } else if (!isMatch && role === ROLE.INITER && blockchainStatus !== BET_BLOCKCHAIN_STATUS.STATUS_SHAKER_SHAKED) {
      label = BETTING_STATUS_LABEL.CANCEL;
      strStatus = BETTING_STATUS_LABEL.WAITING_RESULT;
      isAction = true;
    } else if (isMatch && resultStatus === BETTING_STATUS.DRAW) {
      label = BETTING_STATUS_LABEL.REFUND;
      strStatus = BETTING_STATUS_LABEL.REFUNDING;
      isAction = true;
    } else if (isMatch && resultStatus === BETTING_STATUS.SUPPORT_WIN && side === SIDE.SUPPORT) {
      label = BETTING_STATUS_LABEL.WITHDRAW;
      strStatus = BETTING_STATUS_LABEL.WIN;
      isAction = true;
    } else if (isMatch && resultStatus === BETTING_STATUS.SUPPORT_WIN && side === SIDE.AGAINST) {
      // label = BETTING_STATUS_LABEL.LOSE;
      strStatus = BETTING_STATUS_LABEL.LOSE;
      isAction = false;
    } else if (isMatch && resultStatus === BETTING_STATUS.AGAINST_WIN && side === SIDE.SUPPORT) {
      // label = BETTING_STATUS_LABEL.LOSE;
      strStatus = BETTING_STATUS_LABEL.LOSE;
      isAction = false;
    } else if (isMatch && resultStatus === BETTING_STATUS.AGAINST_WIN && side === SIDE.AGAINST) {
      label = BETTING_STATUS_LABEL.WITHDRAW;
      strStatus = BETTING_STATUS_LABEL.WIN;
      isAction = true;
    } else if (isMatch || blockchainStatus === BET_BLOCKCHAIN_STATUS.STATUS_SHAKER_SHAKED) {
      strStatus = BETTING_STATUS_LABEL.WAITING_RESULT;
      isAction = false;
    }
    return { title: label, isAction, status: strStatus };
  }

  getId(idOffchain) {
    const array = idOffchain.split('_');
    if (array.length > 1) {
      const secondItem = array[1];
      if (secondItem) {
        const strId = secondItem.substring(1);
        console.log(strId);
        console.log(secondItem);
        return parseInt(strId);
      }
    }
  }

  async getBalance() {
    const wallet = MasterWallet.getWalletDefault('ETH');
    const balance = await wallet.getBalance();
    console.log('Balance:', balance);
    return balance;
  }
  async getEstimateGas(){
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    const result = await bettinghandshake.getEstimateGas();
    return result;
  }
  getAddress(){
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    return bettinghandshake.address;
  }

  foundShakeItemList(dict, offchain) {
    const shakerList = [];
    const profile = local.get(APP.AUTH_PROFILE);
    const { shakers, outcome_id, from_address } = dict;
    console.log('Shakers:', shakers);
    const idOffchain = this.getId(offchain);
    const foundShakedItem = shakers.find(element => element.shaker_id === profile.id && element.id === idOffchain);
    console.log('foundShakedItem:', foundShakedItem);
    if (foundShakedItem) {
      foundShakedItem.outcome_id = outcome_id;
      foundShakedItem.from_address = from_address;
      shakerList.push(foundShakedItem);
    }
    return shakerList;
  }

  isInitBet(dict) {
    const { shakers } = dict;
    if (shakers.length == 0) {
      const profile = local.get(APP.AUTH_PROFILE);
      console.log('User Profile Id:', profile.id);
      const { user_id } = dict;
      if (user_id && profile.id === user_id) {
        return true;
      }
    }
    return false;
  }
  addContract = async (item, hid) => {
    console.log('initContract, hid:', item, hid);

    const {
      amount, odds, side, offchain,
    } = item;
    const stake = Math.round(amount * 10 ** 18) / 10 ** 18;
    // const payout = stake * odds;
    // const payout = Math.round(stake * odds * 10 ** 18) / 10 ** 18;
    // const maker = from_address;
    // const hid = outcome_id;
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    const dataBlockchain = await bettinghandshake.initBet(hid, side, stake, odds, offchain);
    return dataBlockchain;
  };

  async shakeContract(item, hid, markerOdds) {
    console.log('shakeContract, hid:', item, hid);

    const {
      amount, id, odds, side, from_address,
    } = item;
    // hid = 10000;
    const stake = Math.round(amount * 10 ** 18) / 10 ** 18;
    // const payout = stake * odds;
    // const payout = Math.round(stake * odds * 10 ** 18) / 10 ** 18;
    const offchain = `cryptosign_s${id}`;
    console.log('offchain:', offchain);
    const maker = from_address;
    // const hid = outcome_id;
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    
    const result = await bettinghandshake.shake(
      hid,
      side,
      stake,
      odds,
      maker,
      markerOdds,
      offchain,
    );
    const { hash } = result;
    if (hash === -1) {
      this.rollback(offchain);
    }
    return result;
  }


  handleContract(element, hid, i) {
    setTimeout(() => {
      console.log('Time out:');
      const { offchain, odds } = element;
      const isInitBet = this.isInitBet(element);
      console.log('isInitBet:', isInitBet);
      if (isInitBet) {
        this.addContract(element, hid);
      } else {
        const foundShakeList = this.foundShakeItemList(element, offchain);
        console.log('Found shake List:', foundShakeList);
        for (let i = 0; i < foundShakeList.length; i++) {
          const shakedItem = foundShakeList[i];
          this.shakeContract(shakedItem, hid, odds);
        }
      }
    }, 3000 * i);
  }
  controlShake = async (list, hid) => {
    const result = null;

    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      console.log('Element:', element);

      this.handleContract(element, hid, i);
    }
  };


  rollback(offchain) {
    console.log('Rollback:', offchain);
    const params = {
      offchain,
    };
    store.dispatch(rollback({
      PATH_URL: API_URL.CRYPTOSIGN.ROLLBACK,
      METHOD: 'POST',
      data: params,
      successFn: this.rollbackSuccess,
      errorFn: this.rollbackFailed,
    }));
  }
  rollbackSuccess = async (successData) => {
    console.log('rollbackSuccess', successData);
  }
  rollbackFailed = (error) => {
    console.log('rollbackFailed', error);
  }
  async cancelBet(hid, side, stake, odds, offchain){
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    const result = await bettinghandshake.cancelBet(hid, side, stake, odds, offchain);
    return result;
  }
  async withdraw(hid, offchain){
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    const result = await bettinghandshake.withdraw(hid, offchain);
    return result;
  }
  async refund(hid, offchain){
    const chainId = this.getChainIdDefaultWallet();
    const bettinghandshake = new BettingHandshake(chainId);
    const result = await bettinghandshake.refund(hid, offchain);
    return result;
  }
}

export default BetHandshakeHandler;

