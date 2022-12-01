require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
console.log(process.env.INFURIA_KEY)

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.INFURIA_URL,
      accounts: [process.env.INFURIA_KEY],
    }
  }
};
