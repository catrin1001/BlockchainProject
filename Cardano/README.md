
# CARDANO BLOCKCHAIN
Setting up a Cardano node:

Installing cardano-node and cardano-cli from source | Cardano Developer Portal
I’m using Linux for your operating system. 
Here is step by step for creating VM in Azure.
## Create virtual machine in Azure
1.	Type virtual machines in the search.
2.	Under Services, select Virtual machines.
3.	In the Virtual machines page, select Create and then Virtual machine. The Create a virtual machine page opens.
4.	In the Basics tab, under Project details, make sure the correct subscription is selected and then choose to Create new resource group. 
5.	Under Instance details, type your Virtual machine name, and choose Ubuntu 20.04 LTS - Gen2 for your Image. Leave the other defaults. The default size and pricing are only shown as an example. Size availability and pricing is dependent on your region and subscription.
6.	Under Administrator account, select SSH public key.
7.	In Username type azureuser.
8.	For SSH public key source, leave the default of Generate new key pair, and then type your Key pair name.
9.	Under Inbound port rules > Public inbound ports, choose Allow selected ports and then select SSH (22) and HTTP (80) from the drop-down.
10.	Leave the remaining defaults and then select the Review + create button at the bottom of the page.
11.	On the Create a virtual machine page, you can see the details about the VM you are about to create. When you are ready, select Create.
12.	When the Generate new key pair window opens, select Download private key and create resource. Your key file will be download as yourname.pem. Make sure you know where the .pem file was downloaded, you will need the path to it in the next step.
13.	When the deployment is finished, select Go to resource.
14.	On the page for your new VM, select the public IP address and copy it to your clipboard.

------------

#### Connect to VM
1. With putty Generator upload your yourname.pem
2. With Putty connect to your Ubuntu machine.


## Steps to setup own Cardano Node Testnet on Ubuntu:
### Installing Operating System dependencies
Run this command:
1. 
```shell
sudo apt update
sudo apt upgrade
```
2. 
```shell
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install automake build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev make g++ tmux git jq wget libncursesw5 libtool autoconf -y
```
### Installing GHC and Cabal
```shell
Run this command:
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
```
**Note:**
ghcup will try to detect your shell and ask you to add it to the environment variables. Please restart your shell/terminal after installing ghcup.
```shell
ghc --version
cabal –version
```
You should see something like this:
```shell
cabal-install version 3.6.2.0
compiled using version 3.6.2.0 of the Cabal library
```

### Downloading & Compiling

```shell
mkdir -p $HOME/cardano-src
cd $HOME/cardano-src
```

```shell
git clone https://github.com/input-output-hk/libsodium
cd libsodium
git checkout 66f017f1
./autogen.sh
./configure
make
sudo make install
```
then you need to change your .bashrc. so run these commands:

```shell
la
cd $HOME/.bashrc
```
add these lines at the end of .bashrc and then save the file.
```shell
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"
```
Now we are ready to download, compile and install cardano-node and cardano-cli. To do:

```shell
cd $HOME/cardano-src
git clone https://github.com/input-output-hk/cardano-node.git
cd cardano-node
git fetch --all --recurse-submodules –tags
git checkout $(curl -s https://api.github.com/repos/input-output-hk/cardano-node/releases/latest | jq -r .tag_name)
```
### Configuring the build options
```shell
cabal configure --with-compiler=ghc-8.10.7
sudo apt install llvm-9
sudo apt install clang-9 libnuma-dev
sudo ln -s /usr/bin/llvm-config-9 /usr/bin/llvm-config
sudo ln -s /usr/bin/opt-9 /usr/bin/opt
sudo ln -s /usr/bin/llc-9 /usr/bin/llc
sudo ln -s /usr/bin/clang-9 /usr/bin/clang
```

### Building and installing the node

```shell
cabal build cardano-node cardano-cli
```
```shell
mkdir -p $HOME/.local/bin
cp -p "$(./scripts/bin-path.sh cardano-node)" $HOME/.local/bin/
cp -p "$(./scripts/bin-path.sh cardano-cli)" $HOME/.local/bin/
```

then you need to change your .bashrc. so run these commands:
```shell
la
cd $HOME/.bashrc
```

add these lines at the end of .bashrc and then save the file.

```shell
export PATH="$HOME/.local/bin/:$PATH"
```

Check the version that has been installed:

```shell
cardano-cli --version
cardano-node --version
```

 you have successfully installed Cardano components into your Linux system!
 
![(image)](https://i.postimg.cc/J4c5j2Vn/2.jpg)


## Running a Cardano node

First cardano folder, to do:
```shell
mkdir -p $HOME/cardano
```
You can download the current Cardano blockchain Testnet network configuration, run following command in cardano directory:

```shell
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-topology.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-shelley-genesis.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-config.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-byron-genesis.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-alonzo-genesis.json

```

Create directory for db
```shell
mkdir -p $HOME/cardano/db
```
go to “cd cardano-src/cardano-node” and then run these commands:
```shell
cardano-node run \
--config $HOME/cardano/testnet-config.json \
--database-path $HOME/cardano/db/ \
--socket-path $HOME/cardano/db/node.socket \
--host-addr 127.0.0.1 \
--port 1337 \
--topology $HOME/cardano/testnet-topology.json
```

wait to Sync the blockchain from zero. (It takes much time).

![(image)](https://i.postimg.cc/PqhG2cNR/Cardano1.jpg)

### Querying the Cardano Blockchain:

First we need to set environment variable for CARDANO_NODE_SOCKET_PATH, to do:
```shell
cd $HOME/.bashrc
```

add these lines at the end of .bashrc and then save the file.
```shell
export CARDANO_NODE_SOCKET_PATH="$HOME/cardano/db/node.socket"
```

First, run cardano-node in a separate terminal for it to start syncing (if not already).
Open another terminal and run the following command
```shell
cardano-cli query tip --testnet-magic 1097911063.
```
## Install wallet
### Downloading & Compiling
First you must connect your cardano-node to the testnet network and make sure it is fully synchronized
```shell
curl -sSL https://get.haskellstack.org/ | sh
```
To check for version:
```shell
stack –version
```
go to cardano-src directory:
```shell
cd $HOME/cardano-src
```
download the cardano-wallet source-code:

```shell
git clone https://github.com/input-output-hk/cardano-wallet.git 
cd ./cardano-wallet/
```

```shell
TAG=$(git describe --tags --abbrev=0) && echo latest tag $TAG 
git checkout $TAG
```
### Building and installing the node
```shell
stack build --test --no-run-tests
```
```shell
stack install
```
```shell
cardano-wallet version
```

you have successfully installed cardano-wallet into your Linux system


