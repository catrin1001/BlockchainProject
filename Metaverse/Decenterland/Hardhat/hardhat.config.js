require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { Ropsten_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [
      {
        solc,
        version: "0.4.24",
        settings: {
         optimizer: {
           enabled: true,
           runs: 999999
         }
        },
         evmVersion: "byzantium", 
         outputSelection: {
          "*": {
            "": [
              "ast"
            ],
            "*": [
              "evm.bytecode.object",
              "evm.deployedBytecode.object",
              "abi",
              "evm.bytecode.sourceMap",
              "evm.deployedBytecode.sourceMap",
              "metadata"
            ]
          },
        }
      }     
    ]
  },
   networks: {
    hardhat: {},
    Ropsten: {
      url: process.env.Ropsten_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
}
