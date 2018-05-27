
import localStore from '@/services/localStore';
import {Bitcoin} from '@/models/Bitcoin.1.js' 
import {BitcoinTestnet} from '@/models/BitcoinTestnet.js' 
import {Ethereum} from '@/models/Ethereum.js' 
import {Wallet} from '@/models/Wallet.js' 
var bip39 = require('bip39');

export class MasterWallet{

    // list coin is supported, can add some more ...
    static ListCoin = {Ethereum, Bitcoin, BitcoinTestnet};
    
    static KEY = "wallets";

    // Create an autonomous wallet:
    static createMasterWallet(){        

        // let mnemonic = 'canal marble trend ordinary rookie until combine hire rescue cousin issue that';
        let mnemonic = 'book trial moral hunt riot ranch yard trap tool horse good barely';
        // var bip39 = require('bip39');
        // mnemonic = bip39.generateMnemonic(); //generates string        
        let masterWallet = []        
        for (var k1 in MasterWallet.ListCoin){                
            for (var k2 in MasterWallet.ListCoin[k1].Network){
                // init a wallet:
                let wallet = new MasterWallet.ListCoin[k1];
                // set mnemonic, if not set then auto gen.
                wallet.mnemonic = mnemonic;  
                wallet.network = MasterWallet.ListCoin[k1].Network[k2];                           
                //create address, private-key ...
                wallet.createAddressPrivatekey();
                masterWallet.push(wallet);                
            }            
        }

        // Save to local store:
        console.log("masterWallet", masterWallet);
        localStore.save(MasterWallet.KEY, masterWallet);

        return masterWallet;
    }
    
    // Get list wallet from store local:
    static getMasterWallet(){
        let wallets = localStore.get(MasterWallet.KEY);      
        let listWallet = [];     
        wallets.forEach(walletJson => {
                    
            let wallet = new MasterWallet.ListCoin[walletJson.className](); 
            
            wallet.mnemonic = walletJson.mnemonic;
            wallet.address = walletJson.address;
            wallet.privateKey = walletJson.privateKey;
            wallet.coinType = walletJson.coinType;
            wallet.default = walletJson.default;
            wallet.balance = walletJson.balance;
            wallet.network = walletJson.network;
            wallet.name = walletJson.name;
            wallet.title = walletJson.title;
            wallet.protected = walletJson.protected;

            listWallet.push(wallet);
        });
        return listWallet;
        
    }

    static log(data, key=MasterWallet.KEY){
        console.log('%c ' + '{0}: '.format(key), 'background: #222; color: #bada55', data)
    }
}