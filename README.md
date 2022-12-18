
# Bitcoin Project

Please first clone the project from the repo

in the project you will see to folders 

1)block-chain app

2)hardhat

the frontend is in block-chain folder with react code



# Demo url
https://www.loom.com/share/62087b15f7284ed891b23285b2073715


## Run Locally

Clone the project

```bash
  git clone https://github.com/alikazmi2000/bitcoin-project.git
```

Backend setup


Go to the project directory

```bash
  cd hardhat
```

Install dependencies

```bash
  npm install
```

update the .env file

```bash
  add your contract url on your .env file of the project
  you can get your private key  through metamask extension

  you can get your chain url from alchmey or infuria upto your liking i used alchmey
  
```
```
PRIVATE_KEY = ""
CHAIN_URL="https://eth-goerli.alchemyapi.io/v2/--ey----"

```


To compile contract use

```bash
 npx hardhat compile
```

To run test cases
```bash
  npx hardhat test

```
To run Locally

First activate your hardhat node

```
npx hardhat node

```

To deploy on Local Network use this command
```
 npx hardhat run --network localhost scripts/deploy.ts

```


To deploy on live network use the following command
```bash
    npx hardhat run scripts/deploy.js  --network goerli
```

Frontend setup

Go to the project directory

```bash
  cd blockchain-app
```

Install dependencies

```bash
  npm install
```



  add your contract address which you get after deploying your contract
   on your blockchain inside the  .env file of the project




```Start Server
  npm run start
````



