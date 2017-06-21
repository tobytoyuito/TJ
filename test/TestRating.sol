pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rating.sol";

contract TestRating {

  function testInitialRatingUsingDeployedContract() {
    Rating rating = Rating(DeployedAddresses.Rating());

    uint expected = 0;

    Assert.equal(rating.getAverageRatingFor(tx.origin), expected, "Owner should have 0 rating");
  }

}
