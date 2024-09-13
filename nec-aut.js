import NeucronSDK from "neucron-sdk";
import readline from 'readline';

const neucron = new NeucronSDK();
const authModule = neucron.authentication;
const walletModule = neucron.wallet;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user for input
function promptUser(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Prompt user for signup or login
    const action = await promptUser('Do you want to sign up (s) or login (l)? ');

    if (action.toLowerCase() === 's') {
      // Sign Up
      const email = await promptUser('Enter your email: ');
      const password = await promptUser('Enter your password: ');

      const signUpResponse = await authModule.signUp({ email, password });
      console.log("SignUp Response:", signUpResponse);
    } else if (action.toLowerCase() === 'l') {
      // Login
      const email = await promptUser('Enter your email: ');
      const password = await promptUser('Enter your password: ');

      const loginResponse = await authModule.login({ email, password });
      console.log("Login Response:", loginResponse);
    } else {
      console.log("Invalid choice. Exiting...");
      rl.close();
      return;
    }

    // Wallet module operations based on user input
    const walletId = await promptUser('Enter your wallet ID: ');

    const walletKeys = await walletModule.getWalletKeys({});
    console.log("Wallet Keys:", walletKeys);

    const walletBalance = await walletModule.getWalletBalance({});
    console.log("Default Wallet Balance:", walletBalance);

    const addresses = await walletModule.getAddressesByWalletId({ walletId });
    console.log("Addresses:", addresses);

    // Prompt user for transaction details
    const transactionAddress = await promptUser('Enter transaction address: ');
    const transactionNote = await promptUser('Enter transaction note: ');
    const transactionAmount = await promptUser('Enter transaction amount: ');

    // Construct options object with user input
    const options = {
      outputs: [
        {
          address: transactionAddress,
          note: transactionNote,
          amount: parseInt(transactionAmount)  // Convert amount to integer if necessary
        }
      ]
    };

    // Perform transaction spend
    const payResponse = await neucron.pay.txSpend(options);
    console.log("Pay Response:", payResponse);

    const walletHistory = await walletModule.getWalletHistory({ walletId });
    console.log("Wallet History:", walletHistory);

    console.log('Initiating wallet creation');
    const walletName = await promptUser('Enter wallet name: ');
    const walletCreationResponse = await walletModule.createWallet({ walletName });
    console.log("Wallet Creation Response:", walletCreationResponse);

    const newWalletBalance = await walletModule.getWalletBalance({ walletId: walletCreationResponse.walletID });
    console.log("New Wallet Balance:", newWalletBalance);

    const newAddresses = await walletModule.getAddressesByWalletId({ walletId: walletCreationResponse.walletID });
    console.log("New Addresses:", newAddresses);

    const mnemonic = await walletModule.getMnemonic({ walletId: walletCreationResponse.walletID });
    console.log("Mnemonic:", mnemonic);

    const allUtxos = await walletModule.getAllUtxos({ walletId: walletCreationResponse.walletID });
    console.log("All UTXOs:", allUtxos);

    const xPubKeys = await walletModule.getXPubKeys({ walletId: walletCreationResponse.walletID });
    console.log("Extended Public Keys:", xPubKeys);

    // Close the readline interface
    rl.close();
  } catch (error) {
    console.error("Error:", error);
    rl.close();
  }
}

// Call main function to start the script
main();
