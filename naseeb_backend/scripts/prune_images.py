import os
import shutil

import RAHIB.UTILS.storage.Location as Location

import halaallove.utils.general as general_utils

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'

def unneeded_women_images(files):
    unneeded_images_women = [file for file in files if file.endswith('.json')]
    unneeded_images_women = [file for file in unneeded_images_women if general_utils.safejsonloads(file)]
    unneeded_images_women = [file for file in unneeded_images_women if 'advisory' in general_utils.safejsonloads(file)]
    unneeded_images_women = [file.replace('.json', 'dir') for file in unneeded_images_women]
    return unneeded_images_women

def unneeded_men_images(files):
    picurl = 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'
    unneeded_images_men = [file for file in files if file.endswith('.json')]
    unneeded_images_men = [file for file in unneeded_images_men if general_utils.safejsonloads(file)]
    unneeded_images_men = [file for file in unneeded_images_men if 'profile_pic_url' in general_utils.safejsonloads(file)]
    unneeded_images_men = [file for file in unneeded_images_men if picurl not in general_utils.safejsonloads(file)['profile_pic_url']]
    unneeded_images_men = [file.replace('.json', 'dir') for file in unneeded_images_men]
    return unneeded_images_men
    
def main():
    all_files = [data_locale + '/' + entry for entry in os.listdir(data_locale)]
    bakupdirs = [x for x in all_files if x.endswith('.bak')]
    unneeded_women = unneeded_women_images(all_files)
    unneeded_men = unneeded_men_images(all_files)
    print(', '.join(bakupdirs))
    input('These are the backup dirs')

    print(', '.join(unneeded_women))
    input('These are the women image directories no longer needed')

    print(', '.join(unneeded_men))
    input('These are the men image directories no longer needed')

    m = input('Backup dirs')
    if m:
        for file in bakupdirs:
            shutil.rmtree(file)
        print('Backup directories removed')

    m = input('Women image directories no longer needed')
    if m:
        for file in unneeded_women:
            shutil.rmtree(file)
        print('Unneeded women directories removed')
    m = input('Men image directories no longer needed')
    if m:
        for file in unneeded_men:
            shutil.rmtree(file)
        print('Unneeded men directories removed')

if __name__ == '__main__':
    main()
