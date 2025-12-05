import json

import requests

cd = ''
cookies = {}
URL = 'http://localhost:8000'
text_headers = {
    "accept": "application/json",
    "Content-Type": "application/json"
}

while True:
    if not cookies:
        logorreg = input('log or reg? ')

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
    me = requests.get(URL + '/users/current',
                      cookies=cookies).content.decode('utf-8')

    action = input(cd + ' ~ ')
    if action == 'me':
        print(me)

    elif action.startswith('cd'):
        response = requests.get(URL + '/users/files',
                                cookies=cookies).content.decode('utf-8')
        arg = action.split(' ')[1]
        if arg == '..':
            cd = '/'.join(arg.split('/')[0:-1])
        elif arg == '/':
            cd = ''
        else:
            cd = cd + '/' + arg
        cd = ''.join(cd[1:]) if cd[0] == '/' else cd

    elif action == 'ls':
        if cd:
            response = json.loads(
                requests.get(URL + f'/folders/items?filter_value={cd}&filter_type=name',
                             cookies=cookies).content.decode('utf-8'))['content']
        else:
            response = json.loads(
                requests.get(URL + '/users/files',
                             cookies=cookies).content.decode('utf-8')
            )
        for file in response:
            print(file)
        print('\n')
