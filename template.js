var src="$SRC";

var srcCompiled = web3.eth.compile.solidity(src);

var smartSponsor = web3.eth.contract(srcCompiled.smartSponsor.info.abiDefinition);

var theminer = eth.accounts[0];
var therunner = eth.accounts[1];
var thesponsor = eth.accounts[2];

var ss = smartSponsor.new(
  {
    from: web3.eth.accounts[0],
    data: srcCompiled.smartSponsor.code, 
    gas: 3000000
  }, function(e, contract){
       if(!e) { if(!contract.address) {
         console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
       } else {
         console.log("Contract mined! Address: " + contract.address);
         console.log(contract);
       } 
     }
});

