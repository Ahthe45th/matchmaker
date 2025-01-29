import sys
import json
import RAHIB.UTILS.storage.Location as Location

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'

halaallove = "/var/www/lovehalaal/"

chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def set_allowance(email, guy_name):
    file_ = data_locale + '/' + guy_name + '.json'
    raw = open(file_).read()
    data = json.loads(raw)

    if 'allowed_chats' in data:
        data['allowed_chats'].append(email)
    else:
        data['allowed_chats'] = [email]

    with open(file_, 'w') as file:
        data2 = json.dumps(data, indent=2)
        file.write(data2)

    print('Sin problemas senor')
    return data, file_

def main():
    if len(sys.argv) >= 3:
        email = sys.argv[1]
        guy_name = sys.argv[2]
        data, file_ = set_allowance(email, guy_name)
    else:
        print('args: 1 email 2 guy_name ')

if __name__ == '__main__':
    main()
