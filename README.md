# Zesty Market Graph

[Link to production's graphQL](https://thegraph.com/hosted-service/subgraph/zestymarket/zesty-market-graph-matic)

## Deploy to production
**Deploy to Hosted Service**
1. Obtain the access token from the hosted service and run `graph auth` to set the deploy key.
2. Create mappings with `yarn codegen`.
3. Set up `config/matic.json` and `config/rinkeby.json` with relevant details.
4. Prepare the updated `subgraph.yaml` file with `yarn prepare:matic` or `yarn prepare:rinkeby` for the relevant networks.
5. Deploy using `yarn deploy:matic` or `yarn deploy:rinkeby` for the relevant networks. 

## Running local graph

### Requirements
1. [Docker and docker compose](https://docs.docker.com/get-docker/)
2. [NodeJS and NPM](https://nodejs.org/en/download/)
3. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
4. Clone [Graph-node](https://github.com/graphprotocol/graph-node) repo
5. [Ganache](https://github.com/trufflesuite/ganache/releases)
6. [Hardhat](https://hardhat.org/getting-started/)
7. Clone [Zesty contracts v2](https://github.com/zestymarket/contracts-v2) repo
8. Clone this [Zest market graph](https://github.com/zestymarket/market-graph) repo

### Steps
1. Run `Ganache`, ensure the server port number is `8545`.
2. In terminal, `cd` to `graph-node` repo, `cd` to `/docker` and execute `docker-compose up -d`.
3. In terminal, deploy `contracts-v2` to Ganache by executing: `npx hardhat run scripts/deploy-dev-ZestyMarketV1_1.js --network ganache`.
4. Copy the addresses for `ZestyToken` and `ZestyNFT` and update them in `market-graph`'s `config/local.json`.
5. In terminal, `cd market-graph` repo and execute `yarn codegen`, `yarn prepare:local`, `yarn create-local` and `yarn deploy-local`.

### Troubleshootings
1. Issue with `graph-node`, do a fresh `docker-compose down -v`, remove everything within `docker/data/ipfs`, `docker/data/postgres` and `docker-compose up -d` again.
2. Type issues when executing `yarn deploy-local` in `market-graph`, redeploy `contract-v2` to Ganache, make sure the deploy goes through and `yarn codegen` has been run sucessfully.
