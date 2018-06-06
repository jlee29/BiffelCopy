function app() {
	if (typeof web3 == 'undefined') throw 'No web3 detected. Is Metamask/Mist being used?';
	web3 = new Web3(web3.currentProvider); // MetaMask injected Ethereum provider
    console.log("Using web3 version: " + Web3.version); // why doesn't this work
    console.log(web3.version)

    var contract;
    var userAccount;
    var contractAddress;

    var contractDataPromise = $.getJSON('build/contracts/Biffel.json');
    var networkIdPromise = web3.eth.net.getId(); // resolves on the current network id
    var accountsPromise = web3.eth.getAccounts(); // resolves on an array of accounts

    Promise.all([contractDataPromise, networkIdPromise, accountsPromise])
        .then(function initApp(results) {
            var contractData = results[0];  // resolved value of contractDataPromise
            var networkId = results[1];     // resolved value of networkIdPromise
            var accounts = results[2];      // resolved value of accountsPromise
            userAccount = accounts[0];
            console.log("printing userAccount in metamask.js: " + userAccount);

            if (!(networkId in contractData.networks)) {
                throw new Error("Contract not found in selected Ethereum network on MetaMask.");
            }

            contractAddress = contractData.networks[networkId].address;
            contract = new web3.eth.Contract(contractData.abi, contractAddress);
        }).catch(console.error);

    $("#create").click(function() {

    });
}

$(document).ready(app);
