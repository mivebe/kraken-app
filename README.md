# Kraken App

This is a tiny React/Node Rest application implementing the Kraken crypto trader API.
It features only public endpoints so you dont need any registration or API keys.

## Installation

Npm install in the root directory
```bash
npm install
```

Use the provided scripts:
"start": starting the frontend
```bash
npm start
```
in addition to
"server": starting the backend
```bash
npm run server
```
or the combined script "dev": to do both
```bash
npm run dev
```

## Usage

The initial home screen is the only screen. This is SPA after all right? :)\
There is a dropdown section where the user can see all the tradable assets by expanding.\
Clicking on an asset starting with X exmpl.(XETH) will put it in the crypto search field.\
Clicking on an asset startitng with Z exmpl.(ZUSD) will put it in the currency search field.\
There are crypto and currency input fields which on press of the search button will
gather data for the stated asset pair exmpl.(ETH/USD ETH/EUR).\
While waiting search button becomes a spinner to indicate that data is being processed.\
When data is present a bar with fields represents the searched asset data.\
Asset price is calculated bby the median of the trades with the highest price\
There is also a quantity and a price which is affected by it to ease the user with how much of the currecy would he/she buy and how much will that cost.\
Asset Data is refreshed eveery 5 seconds to keep the user in track.\
By going to a domain like {domainName}/{assetPair} one could also get data for the specified asset pair

## Technologies
React.js   ReactRouter  MaterialUI\
Node.js Express.js

## License
Have fun :P