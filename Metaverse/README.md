
# Metaverse

**Deploy the land registry smart contract**
For deploying smart contract, I want to use Hardhat.
Setting up hardhat project, we need to do as follow:
```shell
mkdir yourproject
cd yourproject
npx hardhat
```
 
1. npm install "dotenv" and "@nomiclabs/hardhat-ethers" and “@nomiclabs/hardhat-waffle”and "openzeppelin-zos" 
2. Create Deploy.js to deploy contract.
3. Create .env and put your “Ropsten_URL” and “PRIVATE_KEY”.

- Ropsten_URL = "https://ropsten.infura.io/v3/24i9tSxUEU9Js56K8CTjuuks7GA"
- PRIVATE_KEY = "a6d5460cdb06a99dc098858ad58364fdaa7cf7a47989c0bca8784eb0abbde933"

4. Update Harhat.config file with .env const
5. update config file with multiple compilers to match contract files.
6. npx hardhat run scripts/deploy.js --network ropsten

faced this error: max code size exceeded
Solved: Update compiler file compilers
```javascript
compilers: 
[
      {
        version: "0.4.24",
        settings: {
         optimizer: {
           enabled: true,
           runs: 999999
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
```

# Install catalyst
Setting up a Catalyst Node on Ubuntu 20.4 using Azure VM.
### Install Docker
```shell
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$  echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Install Docker-Compose
```shell
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

### Add $USER to Docker Group
```shell
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
$ newgrp docker
```
### Verify Docker Install
```shell
$ docker run hello-world
```

### Verify Docker-Compose Install
```shell
$ docker-compose --version
docker-compose version 1.28.5, build 1110ad01
```
### Stop Apache2
```shell
$ sudo systemctl disable apache2 && sudo systemctl stop apache2
```

### Install Git
```shell
$ sudo apt-get update
$ sudo apt-get install git
```
### Create Directory for Catalyst Source Code
```shell
1-	$ mkdir catalyst
$ cd catalyst
```
### Download Catalyst-Owner from Decentraland's Github
```shell
$ git clone https://github.com/decentraland/catalyst-owner
```
### Delete .example extensions from environment files
```shell
$ mv .env.example .env
$ mv .env-advanced.example .env-advanced
```
### Edit Environment File .env
```shell
$ nano .env
EMAIL=katrin@gmail.com
CONTENT_SERVER_STORAGE=./storage
CATALYST_URL=http://localhost
```
### Create Storage Folder
```shell
mkdir storage
```

### Run Catalyst Server
```shell
$ ./init.sh
```
Final message to confirm that the server is functioning:
// Catalyst server is up and running at http://localhost


------------

![(image)](https://i.postimg.cc/Sscbdhf3/8.jpg)

