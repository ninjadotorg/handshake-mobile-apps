export default {
  HELLO: 'hello {name}',
  buy: 'Buy',
  sell: 'Sell',
  amount: 'amount',
  askUsingCreditCard: 'for {total} {fiatCurrency} using card?',
  change: 'Change',
  ccNumber: 'Number',
  ccExpire: 'Expiry',
  ccCVC: 'CVC',
  overCCLimit: 'Your limit is {currency}{limit}. You have already used {currency}{amount} ',

  required: 'Required',
  ccExpireTemplate: 'MM/YY',
  securityCode: '325',
  shakeNow: 'Shake',
  offerHandShakeContent: '{offerType} {amount} {currency} for {total} {currency_symbol} in {payment_method}?',
  offerHandShakeContentMe: '{offerType} {amount} {currency} for {total} {currency_symbol} ({payment_method})',
  offerHandShakeContentMeDone: '{offerType} {amount} {currency} for {total} {currency_symbol} ({payment_method})',
  instantOfferHandShakeContent: 'You{just}{offerType} {amount} {currency} for {total} {currency_symbol} on your card - fee {fee}%',
  offerDistanceContent: '{distanceKm} km ({distanceMiles} miles) away',
  transactonOfferInfo: 'Successful ({success}) / Failed ({failed})',
  createOfferConfirm: 'You are about to {type} {amount} {currency} for {total} {currency_symbol}',
  handshakeOfferConfirm: 'You are about to {type} {amount} {currency} for {total} {currency_symbol}',
  rejectOfferConfirm: 'Do you want to Reject this handshake? You will not be able to make transactions for 4 hours.',
  completeOfferConfirm: 'Do you want to Complete this handshake?',
  withdrawOfferConfirm: 'Do you want to Withdraw this handshake?',
  cancelOfferConfirm: 'Do you want to Cancel this handshake?',
  acceptOfferConfirm: 'Do you want to Accept this handshake?',
  createOfferSuccessMessage: 'Create offer success',
  shakeOfferSuccessMessage: 'Shake offer success',
  closeOfferSuccessMessage: 'Close offer success',
  completeShakedfferSuccessMessage: 'Complete shaked offer success',
  cancelShakedfferSuccessMessage: 'Cancel shaked offer success',
  withdrawShakedfferSuccessMessage: 'Withdraw shaked offer success',
  buyUsingCreditCardSuccessMessge: 'Buy using Card success',
  notEnoughCoinInWallet: 'You only have {amount}({currency}) in default wallet {currency}. Fee ~ {fee}({currency}). Please add more',

  createOfferStoreConfirm: 'Do you want to create offer Buy {amountBuy} {currency} - Sell {amountSell} {currency}?',
  notEnoughCoinInWalletStores: 'You only have {amount}({currency}) in default wallet {currency}. Fee ~ {fee}({currency}). Please add more',
  addOfferItemSuccessMassage: 'Add offer item success',
  deleteOfferItemSuccessMassage: 'Delete offer item success',
  shakeOfferItemSuccessMassage: 'Shake offer item success',
  acceptOfferItemSuccessMassage: 'Accept offer item success',
  cancelOfferItemSuccessMassage: 'Cancel offer item success',
  rejectOfferItemSuccessMassage: 'Reject offer item success',
  completeOfferItemSuccessMassage: 'Complete offer item success',
  offerStoresAlreadyCreated: 'You have already create offer',
  offerStoreHandShakeContent: '{offerTypeBuy} {amountBuy} {currency} at {fiatAmountBuy} {fiatAmountCurrency}. {offerTypeSell} {amountSell} {currency} at {fiatAmountSell} {fiatAmountCurrency}',
};
