import requests
import json

cookies = {}
URL = 'http://localhost:8000'
text_headers = {
    "accept": "application/json",
    "Content-Type": "application/json"
}

while True:
    if not cookies:
        logorreg = input('log or reg?')

        if logorreg == 'log':
            username = input('enter your username: ')
            password = input('enter your password: ')

        elif logorreg == 'reg':
            username = input('enter your username: ')
            password = input('enter your password: ')
            response = requests.post(URL + '/auth/register',
                                     json={"username": username, "hashed_password": "adin", "is_admin": False},
                                     headers=text_headers)

        else:
            continue

        response = requests.post(URL + '/auth/log',
                                 json={'username': username, 'password': password},
                                 headers=text_headers)
        cookies = response.cookies.get_dict().copy()
        print(cookies)
