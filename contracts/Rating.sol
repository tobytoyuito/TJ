
pragma solidity ^0.4.6;
// We have to specify what version of compiler this code will compile with
contract Rating {
  
  mapping (address => uint8) totalRates;
  mapping (address => uint8) numOfRaters;
  mapping (address => mapping (address => uint8)) isRated;

  address[] rateeList;

  function Rating() {
    
  }

  function getAverageRating(address ratee) returns(uint8) {
    if (numOfRaters[ratee] == 0) {
      return 0;
    }
    return totalRates[ratee] / numOfRaters[ratee];
  }

  function getTotalRator(address ratee) returns(uint8) {
    
    return numOfRaters[ratee];

  }

  function addRating(address ratee, uint8 rating) returns(uint8) {
    if (validRator(msg.sender, ratee)) {
      totalRates[ratee] = totalRates[ratee] + rating;
      numOfRaters[ratee] = numOfRaters[ratee] + 1;
      isRated[ratee][msg.sender] = 1;
      addRatee(ratee);
      return 1;
    } else {
      return 0;
    }
  }

  function validRator(address rator, address ratee) returns (bool) {
    if (isRated[ratee][rator] == 1) {
      return false;
    } else {
      return true;
    }
  }
  
  //add ratee
  function addRatee(address ratee){
    for(uint i = 0; i < rateeList.length; i++) {
      if (rateeList[i] == ratee) {
        return;
      } 
    }
    rateeList.push(ratee);
  }

  //get ratee list
  function getRateeList() returns(address[]) {
    return rateeList;
  }
}
