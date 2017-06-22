var Rating = artifacts.require("./Rating.sol");

contract('Rating', function(accounts) {
  
  it("should rate correctly", function() {
    
    var rating = Rating.new();

    //Get initial ratings of first and second account.
    var rater1 = accounts[0];
    var rater2 = accounts[2];
    var rater3 = accounts[3];
    var ratee = accounts[1];

    var ratee_starting_rate;
    var ratee_ending_rate;
    var ratee_num_raters;

    var rate1 = 5;
    var rate2 = 3;

    return Rating.deployed().then(function(instance) {

      rating = instance;
      return rating.getAverageRating.call(ratee);

    }).then(function(start_rate) {

      ratee_starting_rate = start_rate.toNumber();
      assert.equal(ratee_starting_rate, 0, "Wrong initialized rating");

      //rator1 rates
      return rating.addRating(ratee, rate1, {from: rater1});

    }).then(function() {
      
      return rating.getAverageRating.call(ratee);

    }).then(function(first_rate) {

      assert.equal(first_rate, rate1, "Wrong first rate");
      //rator2 rates
      return rating.addRating(ratee, rate2, {from: rater2});

    }).then(function() {
      
      return rating.getAverageRating.call(ratee);

    }).then(function(end_rate) {
      
      ratee_ending_rate = end_rate.toNumber();
      var correct_end_rate = (rate1 + rate2) / 2;
      assert.equal(ratee_ending_rate, correct_end_rate, "Wrong end rate");

      //check total rators
      return rating.getTotalRator.call(ratee);

    }).then(function(total_rators) {
  
      assert.equal(total_rators.toNumber(), 2, "Wrong total rators");
      //valid rater1
      return rating.validRator.call(rater1, ratee);

    }).then(function(is_rator1_valid) {
  
      assert.equal(is_rator1_valid, false, "Failed to validate rator1");
      //valid rater3 
      return rating.validRator.call(rater3, ratee);

    }).then(function(is_rator3_valid) {
  
      assert.equal(is_rator3_valid, true, "Failed to validate rator3");
      //check ratee list
      return rating.getRateeList.call();

    }).then(function(ratee_list) {
      assert.equal(ratee_list[0], ratee, "Failed to add ratee to list");
      
    });

    
  });

});
