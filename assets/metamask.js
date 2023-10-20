//Wallet Status::
const networkDiv = document.getElementById('network');
//const chainIdDiv = document.getElementById('chainId');
const getAccountsResult = document.getElementById('getAccountsResult');


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
                    //method: 'eth_requestAccounts',
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        MetaMask.displayAccount();
        //MetaMask.displayChain();
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
    
//    displayChain: async function() { 
//        const chainId = await ethereum.request({ method: 'eth_chainId' });
//        chainIdDiv.innerHTML = chainId;
//    },
        
    displayNetwork: async function() { 
        const networkId = await ethereum.request({ method: 'net_version' });
        networkDiv.innerHTML = networkId;
        if (networkId === '1') {
        $('#network').text('1: Ethereum - Mainnet');
        }
        if (networkId === '5') {
        $('#network').text('5: Goerli - Testnet');
        }
        if (networkId === '10') {
        $('#network').text('10: Optimism - Mainnet');
        }
        if (networkId === '137') {
        $('#network').text('137: Polygon - Mainnet');
        }
        if (networkId === '43114') {
        $('#network').text('43114: Avalanche - C-Chain');
        }
        if (networkId === '5777') {
        $('#network').text('5777: Ganache - Localhost');
        }
        if (networkId === '11155111') {
        $('#network').text('11155111: Sepolia - Testnet');
        }
    },
};
    
    ethereum.on('accountsChanged', (accounts) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
        MetaMask.displayAccount();
        //MetaMask.displayChain();
        MetaMask.displayNetwork();
        //updateNetworkName();
    });
    
    ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
    });


const metamaskButton = document.getElementById("btn-metamask");
        metamaskButton.addEventListener("click", MetaMask.initWeb3);


        MetaMask.displayCurrent();
        //MetaMask.displayChain();
        MetaMask.displayNetwork();
        