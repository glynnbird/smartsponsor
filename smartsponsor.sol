// Smart contract to allow someone to organise a sponsored event for charity
// Glynn Bird - 2016

contract smartSponsor {
  address owner;
  bool public refunded; 
  bool public complete;
  uint public numPledges;
  struct Pledge {
    uint amount;
    address eth_address;
    bytes32 message;
  }
  mapping(uint => Pledge) pledges;
  
  // constructor
  function smartSponsor() {
    owner = msg.sender;
    numPledges = 0;
    refunded = false;
    complete = false;
  }

  // add a new pledge
  function pledge(bytes32 message) {
    if (msg.value == 0 || complete || refunded) throw;
    numPledges++;
    pledges[numPledges] = Pledge(msg.value, msg.sender, message);
  }

  function getPot() constant returns (uint) {
    return this.balance; 
  }

  // refund the backers
  function refund() {
    if (msg.sender != owner || complete || refunded) throw;
    for (uint i = 0; i < numPledges; ++i) {
      pledges[i].eth_address.send(pledges[i].amount);
    }
    refunded = true;
    complete = true;
  }

  // send funds to the contract owner
  function drawdown() {
    if (msg.sender != owner || complete || refunded) throw;
    owner.send(this.balance);
    complete = true;
  }
}
