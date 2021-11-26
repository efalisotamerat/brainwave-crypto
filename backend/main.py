import json
from fastapi import FastAPI
import requests
from requests import api
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

baseApiBinance = 'https://api.binance.com/api/v3'
baseApi = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency'
apiKey = 'b5779bb7-4d1a-4fe5-84f7-2818dba556c5'
allCoins = ["BTC", "ETH", "DOT", "ADA", "DOGE", "RUNE", "SOL"]

# https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=btc&convert=EUR&CMC_PRO_API_KEY=b5779bb7-4d1a-4fe5-84f7-2818dba556c5


@app.get('/api/')
def home():
    return 'This is the home path of the API'


# getting all 7 coins
@app.get('/api/coins')
async def get_coins():
    coins = []
    for val in allCoins:
        response = requests.get(
            f'{baseApi}/quotes/latest?symbol={val}&convert=EUR&CMC_PRO_API_KEY={apiKey}')
        for c in response.json()['data']:
            json_path = response.json()['data'][f'{c}']
            json_path_quote = response.json()['data'][f'{c}']['quote']['EUR']
            coin_object = {
                'symbol': json_path['symbol'],
                'name': json_path['name'],
                'max_supply': json_path['max_supply'],
                'circulating_supply': json_path['circulating_supply'],
                'price': json_path_quote['price'],
                'volume_24h': json_path_quote['volume_24h'],
                'volume_change_24h': json_path_quote['volume_change_24h'],
                'market_cap': json_path_quote['market_cap'],
                'market_cap_dominance': json_path_quote['market_cap_dominance'],
                'percent_change_1h': json_path_quote['percent_change_1h'],
                'percent_change_24h': json_path_quote['percent_change_24h'],
                'percent_change_7d': json_path_quote['percent_change_7d'],
                'percent_change_30d': json_path_quote['percent_change_30d'],
                'percent_change_60d': json_path_quote['percent_change_60d'],
                'percent_change_90d': json_path_quote['percent_change_90d'],
            }
            coins.append(coin_object)
    return coins


@app.get('/api/coins/{symbol}')
async def get_coin(symbol):
    response = requests.get(
        f'{baseApi}/quotes/latest?symbol={symbol}&convert=EUR&CMC_PRO_API_KEY={apiKey}')
    return_object = []
    for coin in response.json()['data']:
        json_path = response.json()['data'][f'{coin}']
        json_path_quote = response.json()['data'][f'{coin}']['quote']['EUR']
        return_object.append({
            'symbol': json_path['symbol'],
            'name': json_path['name'],
            'max_supply': json_path['max_supply'],
            'circulating_supply': json_path['circulating_supply'],
            'price': json_path_quote['price'],
            'volume_24h': json_path_quote['volume_24h'],
            'volume_change_24h': json_path_quote['volume_change_24h'],
            'market_cap': json_path_quote['market_cap'],
            'market_cap_dominance': json_path_quote['market_cap_dominance'],
            'percent_change_1h': json_path_quote['percent_change_1h'],
            'percent_change_24h': json_path_quote['percent_change_24h'],
            'percent_change_7d': json_path_quote['percent_change_7d'],
            'percent_change_30d': json_path_quote['percent_change_30d'],
            'percent_change_60d': json_path_quote['percent_change_60d'],
            'percent_change_90d': json_path_quote['percent_change_90d'],
        })

    return return_object


@app.get('/api/trades')
def trades(symbol: str):

    response = requests.get(f'{baseApiBinance}/trades?symbol={symbol}')
    return response.json()


@app.get('/api/avgPrice')
def trades(symbol: str):

    response = requests.get(f'{baseApiBinance}/avgPrice?symbol={symbol}')
    return response.json()
