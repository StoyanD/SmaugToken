module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4600000 // bug in truffle v4.0.1 check for update later
    }
  }
};
