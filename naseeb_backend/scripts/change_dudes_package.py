import json
import sys

import RAHIB.UTILS.storage.Location as Location

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = "/home/lovehalaal/public_html"
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def change_package(nameoremail, package):
    file_ = data_locale + '/' + nameoremail + '.json'
    raw = open(file_).read()
    data = json.loads(raw)
    if 'package' in data:
        data['package'] = package
    else:
        data['MANS_PACKAGE'] = package
    with open(file_, 'w') as file:
        data = json.dumps(data, indent=2)
        file.write(data)
    print('Sin problemas senor')

def main():
    nameoremail = sys.argv[1]
    package = sys.argv[2]
    change_package(nameoremail, package)

if __name__ == '__main__':
    main()
