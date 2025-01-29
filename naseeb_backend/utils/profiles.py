import os
import json
import traceback

import RAHIB.UTILS.storage.Location as Location

import halaallove.utils.general as general_utils

from RAHIB.UTILS.misc.other import generate_fake_id

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = "/var/www/lovehalaal/"
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def process_individual_profile(profile_data, images_destination_dir):
    if profile_data['spouseworkstatus']:
        if 'NONE' in profile_data['spouseworkstatus']:
            profile_data['spouseworkstatus'] = False
    if profile_data['spousereligiousstatus']:
        if 'NONE' in profile_data['spousereligiousstatus']:
            profile_data['spousereligiousstatus'] = False
    if profile_data['spouse_education_level']:
        if 'NONE' in profile_data['spouse_education_level']:
            profile_data['spouse_education_level'] = False

    try:
        profile_pic_path = images_destination_dir + '/' + os.listdir(halaallove + images_destination_dir)[0]
    except Exception as e:
        print(traceback.format_exc())
        profile_pic_path = images_destination_dir + '/idontreallyexist'

    profile_pic_path = profile_pic_path.replace(' ', '%20')
    profile_data['profile_pic_url'] = f"https://expatelitesingles.com/profilepic/0?EMAIL={profile_data['name']}&__id={profile_data['__id']}"
    profile_data['profile_url'] = f"https://expatelitesingles.com/profile/{profile_data['name']}"
    print(f'profile pic url {profile_pic_path} {profile_data["profile_url"]}')
    return profile_data

def get_inactive_women():
    thejsonpth = Location.general_storage() + '/inactive_women.json'
    if os.path.exists(thejsonpth):
        data = general_utils.safejsonloads(thejsonpth)
        return data
    else:
        return []

def profiles_data_preprocess(data_entries, profiles_locale, data=None):
    profiles = []
    unavailable_profiles = []

    if data:
        for entry in data_entries:
            image_dir = entry.replace('.json','') + 'dir'
            images_destination_dir = '/assets/img/profiles/' + image_dir.split('/')[-1].replace('dir','')
            print(f'Origin {image_dir} - Destination {images_destination_dir}')

            profile_data = general_utils.safejsonloads(entry)

            profile_data = process_individual_profile(profile_data, images_destination_dir)
            
            if profile_data['MANS_PACKAGE'] == data['package']:
                profiles.append(profile_data)
            else:
                profiles.append(profile_data)
    else:
        for entry in data_entries:
            image_dir = entry.replace('.json','') + 'dir'
            images_destination_dir = '/assets/img/profiles/' + image_dir.split('/')[-1].replace('dir','')
            print(f'Origin {image_dir} - Destination {images_destination_dir}')

            profile_data = json.loads(open(entry).read())

            profile_data = process_individual_profile(profile_data, images_destination_dir)
            profiles.append(profile_data)
    return profiles, unavailable_profiles

def add_id(data, entry):
    if '__id' not in data:
        data['__id'] = generate_fake_id()
    else:
        if not data['__id']:
            data['__id'] = generate_fake_id()
    with open(entry, 'w') as target:
        thedump = json.dumps(data, indent=3)
        target.write(thedump)
    return data

def change_package(entry, package):
    data = json.loads(open(entry).read())
    data['package'] = package
    with open(entry, 'w') as target:
        thedump = json.dumps(data, indent=3)
        target.write(thedump)
    return {'response':'ok'}
