import { PrivateKey } from '@bsv/sdk';

async function main() {
  try {
    // Generate a random private key
    const privKey = PrivateKey.fromRandom();

    // Convert private key to WIF (Wallet Import Format)
    const WIF = privKey.toWif();
    console.log("Private Key WIF format is ", WIF);

    // Derive Bitcoin address (P2PKH address) from the private key
    const address = privKey.toAddress();
    console.log("Your bitcoin address is ", address);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the main function to execute
main();
