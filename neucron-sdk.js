import NeucronSDK from "neucron-sdk";

const neucron = new NeucronSDK();

const authModule = neucron.authentication;
const walletModule = neucron.wallet;

//const signUpResponse = await authModule.signUp({ email: "yashrajput7014@gmail.com", password: "yashrajputq2p" });
//console.log(signUpResponse);

const loginResponse = await authModule.login({ email: "yashrajput7014@gmail.com", password: "yashrajputq2p" });
console.log(loginResponse);

const walletKeys = await walletModule.getWalletKeys({});
console.log(walletKeys);


// For Default wallet balance
const DefaultWalletBalance = await walletModule.getWalletBalance({});
console.log(DefaultWalletBalance);

const addresses = await walletModule.getAddressesByWalletId({});
console.log(addresses);

const options = {
   outputs: [
     {
       address: 'yashrajput7014@dev.neucron.io',
       note: 'First Transaction',
       amount: 100
     }
   ]
};

//const payResponse = await neucron.pay.txSpend(options)
//console.log(payResponse)

//const walletHistory = await walletModule.getWalletHistory({ });
//console.log(walletHistory);


console.log('initiating wallet')
const walletCreation1 = await walletModule.createWallet({ walletName: 'Yash Rathore' });
console.log(walletCreation1);

const walletBalance = await walletModule.getWalletBalance({ walletId: walletCreation1.walletID });
console.log(walletBalance);

//const addresses = await walletModule.getAddressesByWalletId({ walletId: walletCreation1.walletID });
//console.log(addresses);

// const mnemonic = await walletModule.getMnemonic({ walletId: walletCreation1.walletID });
// console.log(mnemonic);

// const allUtxos = await walletModule.getAllUtxos({ walletId: walletCreation1.walletID });
// console.log(allUtxos);

// const xPubKeys = await walletModule.getXPubKeys({ walletId: walletCreation1.walletID });
// console.log(xPubKeys);
