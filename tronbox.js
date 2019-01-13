module.exports = {
  networks: {
    shasta: {
      privateKey: 'your-tron-private-key',
      consume_user_resource_percent: 30,
      fee_limit: 1000000000,
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",
      network_id: "*"
    },

  }
};
