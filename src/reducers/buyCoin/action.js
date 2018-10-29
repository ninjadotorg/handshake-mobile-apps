import { createAPI } from '@/reducers/action';

export const BUY_COIN_ACTIONS = {
  BUY_CRYPTO_ORDER: 'BUY_CRYPTO_ORDER',
  BUY_CRYPTO_GET_COIN_INFO: 'BUY_CRYPTO_GET_COIN_INFO',
  BUY_CRYPTO_GET_BANK_INFO: 'BUY_CRYPTO_GET_BANK_INFO',
  BUY_CRYPTO_SAVE_RECEIPT: 'BUY_CRYPTO_SAVE_RECEIPT',
  BUY_CRYPTO_QUOTE_REVERSE: 'BUY_CRYPTO_QUOTE_REVERSE',
  BUY_CRYPTO_GET_PACKAGE: 'BUY_CRYPTO_GET_PACKAGE',
};

export const buyCryptoGetPackage = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_GET_PACKAGE);
export const buyCryptoQuoteReverse = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_QUOTE_REVERSE);
export const buyCryptoSaveRecipt = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_SAVE_RECEIPT);
export const buyCryptoGetBankInfo = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_GET_BANK_INFO);
export const buyCryptoGetCoinInfo = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_GET_COIN_INFO);
export const buyCryptoOrder = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_ORDER);

