const { createPublicClient, http } = require('viem');
const { base } = require('viem/chains');

const client = createPublicClient({ chain: base, transport: http() });

async function findPaymasters() {
    const block = await client.getBlock({ blockTag: 'latest', includeTransactions: true });
    for (let tx of block.transactions) {
        if (tx.to === '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789') {
            console.log("PAYMASTER ENTRY DETECTED: ", tx.hash);
            // Send calldata to Groq for decompilation...
        }
    }
}
findPaymasters();
