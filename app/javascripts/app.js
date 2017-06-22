// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import rating_artifacts from '../../build/contracts/Rating.json'

var Rating = contract(rating_artifacts);

var accounts;
var account;
var account1;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Rating.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      account1 = accounts[1];

      self.refreshRating();
      self.refreshRatingForAccount1();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshRating: function() {
    var self = this;

    var ratingInstance;
    Rating.deployed().then(function(instance) {
      ratingInstance = instance;
      //return the rating for account
      return ratingInstance.getAverageRating.call(account, {from: account});

    }).then(function(value) {

      var rating_element = document.getElementById("balance");
      rating_element.innerHTML = value.valueOf();

    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  refreshRatingForAccount1: function() {
    var self = this;

    var ratingInstance;
    Rating.deployed().then(function(instance) {
      ratingInstance = instance;
      //return the rating for account
      return ratingInstance.getAverageRating.call(account1, {from: account});

    }).then(function(value) {

      var rating_element = document.getElementById("account1");
      rating_element.innerHTML = value.valueOf();

    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });

    Rating.deployed().then(function(instance) {
      ratingInstance = instance;
      //return the rating for account
      return ratingInstance.getTotalRator.call(account1, {from: account});

    }).then(function(value) {

      var rating_element = document.getElementById("account1rator");
      rating_element.innerHTML = value.valueOf();

    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });

  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    Rating.deployed().then(function(instance) {
      var ratingInstance = instance;
      return ratingInstance.addRating(receiver, amount, {from: account});
    }).then(function(value) {
      self.setStatus("Transaction complete!");
      self.refreshRatingForAccount1();
      alert(value.valueOf())
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
