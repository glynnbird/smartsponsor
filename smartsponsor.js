var src="   contract smartSponsor {   address public owner;   address public benefactor;   bool public refunded;    bool public complete;   uint public numPledges;   struct Pledge {     uint amount;     address eth_address;     bytes32 message;   }   mapping(uint => Pledge) pledges;         function smartSponsor(address _benefactor) {     owner = msg.sender;     numPledges = 0;     refunded = false;     complete = false;     benefactor = _benefactor;   }       function pledge(bytes32 _message) {     if (msg.value == 0 || complete || refunded) throw;     pledges[numPledges] = Pledge(msg.value, msg.sender, _message);     numPledges++;   }    function getPot() constant returns (uint) {     return this.balance;    }       function refund() {     if (msg.sender != owner || complete || refunded) throw;     for (uint i = 0; i < numPledges; ++i) {       pledges[i].eth_address.send(pledges[i].amount);     }     refunded = true;     complete = true;   }       function drawdown() {     if (msg.sender != owner || complete || refunded) throw;     benefactor.send(this.balance);     complete = true;   }       function getPledge(uint _id) constant returns (uint amount, address eth_address, bytes32 message) {     var p = pledges[_id];     amount = p.amount;     eth_address = p.eth_address;     message = p.message;   } } ";

var srcCompiled = web3.eth.compile.solidity(src);

var smartSponsor = web3.eth.contract(srcCompiled.smartSponsor.info.abiDefinition);

var theminer = eth.accounts[0];
var therunner = eth.accounts[1];
var thesponsor = eth.accounts[2];
var thebenefactor = eth.accounts[3];

var ss = smartSponsor.new(thebenefactor,
  {
    from: therunner,
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

