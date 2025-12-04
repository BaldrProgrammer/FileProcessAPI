import requests

cookies = {}
URL = 'http://localhost:8000/'


while True:
    print(requests.get(URL))
