import sys
import datetime
import shutil

import RAHIB.UTILS.storage.Location as Location

import halaallove.utils.general as general_utils

def main():
    if len(sys.argv) == 2:
        start_date = sys.argv[1]
        the_timestamp = datetime.datetime.strptime(start_date, '%d/%m/%Y').timestamp()
        print(f"Going for users after {start_date}: {the_timestamp}")   
        thewomen = [{'pth':x,'datos':general_utils.safejsonloads(x)} for x in general_utils.get_all_women_before_timestamp(the_timestamp)]

        print(f"Number of users that match: {len(thewomen)}")
        for woman in thewomen:
            woman_date = datetime.datetime.fromtimestamp(woman['datos']['timestamp']).strftime('%d/%m/%Y')
            if 'name2' in woman['datos']:
                print(f"Name: {woman['datos']['name']} {woman['datos']['name2']}")
            else:
                print(f"Name: {woman['datos']['name']}")
            print(f"Email: {woman['datos']['EMAIL']} Date: {woman_date}")
            print(f"Path: {woman['pth']}")
            delete = input("Move?")
            if delete:
                shutil.move(woman['pth'], Location.general_storage() + '/purgatory/')
                shutil.move(woman['pth'].replace('.json', 'dir'), Location.general_storage() + '/purgatory/')
                print("Done")

if __name__ == '__main__':
    main()
