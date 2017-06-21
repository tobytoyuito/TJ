var Rating = artifacts.require("./Rating.sol");

contract('Rating', function(accounts) {
  
  it("should rate correctly", function() {
    
    var rating = Rating.new();

    //    Get initial balances of first and second account.
    var rater = accounts[0];
    var ratee = accounts[1];

    var ratee_starting_rate;
    var ratee_ending_rate;
    var ratee_num_raters;

    var rate = 4;

    rating.getAverageRating.call(ratee).then(function (rate) {
      console.log(rate)
    });

    /*

    return Rating.new().then(function(instance) {

      rating = instance;
      console.log(instance.address);

      return rating.getAverageRating.call(ratee);

    }).then(function(start_rate) {

      console.log(rating.address);

      assert.equal(start_rate.toNumber(), 0, "Wrong initialized rating")
      ratee_starting_rate = start_rate.toNumber();

      return rating.addRating.call(ratee, rate, {from: rator});

    }).then(function(res) {

      console.log(rating.address);

      assert.equal(res.toNumber(), 1, "Cannot add rating as rator may have already rated ratee")
      return rating.getAverageRating.call(ratee);

    }).then(function(end_rate) {

      console.log(rating.address);

      console.log(end_rate.toNumber());
      //ratee_ending_rate = end_rate.toNumber();
      //assert.equal(ratee_starting_rate, ratee_ending_rate - rate, "Rate was not correctly add to ratee");
    });
    */
  });
});
