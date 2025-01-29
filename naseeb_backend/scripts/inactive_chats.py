import json
import datetime

import RAHIB.UTILS.storage.Location as Location

import halaallove.utils.general as general_utils
import halaallove.utils.chats as chats_utils

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = "/var/www/lovehalaal/"
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def main():
    date = '1/11/2022'
    datetime_object = datetime.datetime.strptime(date, "%d/%m/%Y")
    datetime_timesamp = datetime_object.timestamp()

    all_women_files = general_utils.get_all_women_past_timestamp(datetime_timesamp)

    women_data = [chats_utils.get_data(x, begin_timestamp=datetime_timesamp) for x in all_women_files]

    inactive_women = [x for x in women_data if not x['in']]
    json_data = inactive_women
    parsed = [f'{x["data"]["name"]}: ({x["data"]["EMAIL"]})' for x in inactive_women]

    with open(storage+'/inactive_women.json', 'w') as target:
        data = json.dumps(json_data, indent=3)
        target.write(data)

    with open(storage+'/inactive_women.txt', 'w') as target:
        data = "\n".join(parsed)
        target.write(data)

if __name__ == '__main__':
    main()
