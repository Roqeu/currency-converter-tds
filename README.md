# Project Setup
After cloning project you will need to set up you npm environment and provide a currencybeacon api key. Please follow the instructions bellow.

## Currency beacon api key setup
For this project to run you will need an api key for Currency Beacon. To get an api key follow these steps:
1. You will need to register for a free account to get access to your `API_KEY`. (https://currencybeacon.com/register)
2. Once you have your api key please edit the .env folder and replace <api key goes here> as the value for CURRENCY_BEACON_KEY

## npm environment setup
```bash
npm i
npm run dev
```
This will run a dev build and open a browser window automatically. 

## Assumptions
1. Assumed currency conversion was for fiat currency only (currency beacon was returning fiat currecy when provided crypto query tag anyway)
2. Currency conversion app was standalone and was not integrated inside anything else
3. No user tracking or login/register functionality
4. Currency conversion is 1 way and no quick-swap of source->conversion was required
5. Deduplication of same source and converted currency can be handed by currency beacon (api handles this by default)
6. Removal of selected currency from opposite list not required
7. No requirement for SEO
8. Security concerns such as DDoS would be handled by host
9. MaterialUI (chosen component framework) handles accessibility in a WCAG 2.0 compliant manner. No additional testing was performed (fixing any issues discovered could be time-consuming)
10. No requirement for comprehensive error handling (only basic api error handling was implemented)

**THIS PROJECT REQUIRES A WORKING INTERNET CONNECTION**
