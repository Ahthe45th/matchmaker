import sys
import json

import RAHIB.UTILS.storage.Location as Location

from halaallove.utils.general import safejsonloads

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = "/home/lovehalaal/public_html"
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def add_param(nameoremail, param):
    file_ = data_locale + '/' + nameoremail + '.json'
    data = safejsonloads(file_)

    if 'allowed_chats' in data:
        data['allowed_chats'].append(param)
    else:
        data['allowed_chats'] = [param]

    with open(file_, 'w') as file:
        data2 = json.dumps(data, indent=2)
        file.write(data2)
    print('Sin problemas senor')

def main():
    if len(sys.argv) == 3:
        nameofman = sys.argv[1]
        email = sys.argv[2]
        add_param(nameofman, email)
    else:
        print('args: name of man, email of woman')

if __name__ == '__main__':
    main()
