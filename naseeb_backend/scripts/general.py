'''Runs a flask endpoint'''
import os
import json
import csv

import RAHIB.UTILS.storage.Location as Location

storage = Location.general_storage()

def write_to_csv():
    thepath = storage + '/nikahmubasit/'
    files = [x for x in os.listdir(thepath)]
    absolute_paths = [thepath + x for x in files]
    jsons = [x for x in absolute_paths if x.endswith('.json')]
    women = [x for x in jsons if '@' in x]
    women_data_raw = [open(x).read() for x in women]
    women_data = [json.loads(x) for x in women_data_raw]
    for data in women_data:
        theindex = women_data.index(data)
        try:
            data.pop('__id')
        except:
            pass
        data.pop('password')
        data.pop('confirmpassword')
        data.pop('MPESAconfirmation')
        data.pop('spouseworkstatus')
        data.pop('twitterhandle')
        data.pop('insta')
        data.pop('facebook')
        try:
            data.pop('images_destination_dir')
        except:
            pass
        try:
            data.pop('profile_pic_url')
        except:
            pass
        try:
            data.pop('profile_url')
        except:
            pass
        try:
            data.pop('personal_page_profile_url')
        except:
            pass
        data.pop('title')
        data.pop('package')
        data.pop('settleplace')
        women_data[theindex] = data
    all_keys = list(women_data[0].keys())
    with open(storage + '/CUSTOMER DATA.csv', 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, all_keys)
        dict_writer.writeheader()
        dict_writer.writerows(women_data)

if __name__ == '__main__':
    write_to_csv()
