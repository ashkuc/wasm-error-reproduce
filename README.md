# Sample Hardhat Project (for error reproduction)

Add your PRIVATE_KEY to `.env` file

```shell
cp .env.example .env
```

```shell
nvm use # ensure node version

yarn # install dependencies

yarn compile # compile contracts

yarn deploy # deploy contracts to hardhat network

yarn deploy:uniqsu # deploy contracts to uniqsu network - will fail

yarn deploy:opal # deploy contracts to opal network - will fail
```
