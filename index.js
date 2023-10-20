//Wallet Status::
const networkDiv = document.getElementById('network');
const getAccountsResult = document.getElementById('getAccountsResult');
let accounts = undefined;

MetaMask = { 
    web3Provider: null,

    //>>>>>>  
    initWeb3: async function() {
        
        // Modern dapp browsers...
        if (window.ethereum) {
            MetaMask.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        MetaMask.displayAccount();
        //MetaMask.displayCurrent();
        MetaMask.displayNetwork();
    },
  
    displayAccount: async function() {    
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        getAccountsResult.innerHTML = account;
    },

    displayCurrent: async function() {  
        const currentWallet = await ethereum.request({ method: 'eth_accounts' });  
        getAccountsResult.innerHTML = currentWallet;
    },
        
    displayNetwork: async function() { 
        const networkId = await ethereum.request({ method: 'net_version' });
        networkDiv.innerHTML = networkId;
        if (networkId === '1') {
        $('#network').text('1: Ethereum - Mainnet');
        }
        if (networkId === '5') {
        $('#network').text('5: Goerli - Eth Testnet');
        }
        if (networkId === '10') {
        $('#network').text('10: Optimism - Mainnet');
        }
        if (networkId === '56') {
        $('#network').text('56: BNB Smart Chain - Mainnet');
        }
        if (networkId === '137') {
        $('#network').text('137: Polygon - Mainnet');
        }
        if (networkId === '5777') {
        $('#network').text('5777: Ganache - Localhost');
        }
        if (networkId === '42161') {
        $('#network').text('42161: Arbitrum One');
        }
        if (networkId === '43114') {
        $('#network').text('43114: Avalanche - C-Chain');
        }
        if (networkId === '80001') {
        $('#network').text('80001: Mumbai - Matic Testnet');
        }
        if (networkId === '11155111') {
        $('#network').text('11155111: Sepolia - Eth Testnet');
        }
    },
};
    
    const metamaskButton = document.getElementById("btn-metamask");
        metamaskButton.addEventListener("click", MetaMask.initWeb3);

        //MetaMask.displayCurrent();
        MetaMask.displayAccount();
        MetaMask.displayNetwork();

/////////////////
////////////////
///////////////

// let web3 = new Web3(Web3.givenProvider);
// let instance;


$(document).ready(async () => {
    ethereum.on('accountsChanged', (accounts) => {
        //MetaMask.displayCurrent();
        MetaMask.displayAccount();
        MetaMask.displayNetwork();
    });
    
    ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
    });
});

    









