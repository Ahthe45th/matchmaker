#!/usr/bin/python3
import json
import os
import shutil

import RAHIB.UTILS.storage.Location as Location

from flask import Flask, render_template
from flask_cors import CORS

import halaallove.utils.general as general_utils
import halaallove.utils.profiles as profiles_utils

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = "/var/www/lovehalaal/"
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

app = Flask('ORGANIZATION', template_folder='/home/ec2-user/halaallove/halaallove/templates')
app.secret_key = "V1"

CORS(app, resources={r"/*": {"origins": "*"}})

def prepare_testimonials():
    data_locale = storage + '/nikahmubasit_testimonials/'
    testimonial_image_locale = halaallove + '/assets/img/testimonials'

    data_entries = [data_locale + '/' + entry for entry in os.listdir(data_locale) if entry.endswith('.json')]
    img_entries = [data_locale + '/' + entry for entry in os.listdir(data_locale) if entry.endswith('dir')]
    data_files = [open(entry).read() for entry in data_entries]
    data = [json.loads(entry) for entry in data_files]
    data = {item['name']:item for item in data}

    for img_entry in img_entries:
        full_path = img_entry + '/' + os.listdir(img_entry)[-1]
        print(full_path)
        name = img_entry.replace('dir','').split('/')[-1]
        extension = full_path.split('.')[-1]
        print(name)
        destination_path = testimonial_image_locale + '/' + name + '.' + extension
        url_path = destination_path.split('/dating_site')[-1]
        data[name]['img_url'] = url_path.split('/var/www/lovehalaal/')[-1]
        shutil.copy(full_path, destination_path)

    print(json.dumps(data,indent=3))
    with app.app_context():
        thepage = render_template('testimonials.html', len=len(list(data.keys())),names=list(data.keys()),data=data)
        with open(halaallove + '/html/testimonials.html', 'w') as file:
            file.write(thepage)

def check_in_list(item, secondlist):
    variable = False
    for x in secondlist:
        if x in item:
            variable = True
    return variable

def main():
    Muslims = general_utils.sort_by_timestamp_files(files=general_utils.get_muslims())

    if len(Muslims) > 30 :
        Muslims = Muslims[:30]

    lenMuslims = len(Muslims)

    mprofiles, nonprofiles = profiles_utils.profiles_data_preprocess(Muslims, '/profiles/')

    with app.app_context():
        prepare_testimonials()

        theEnglishindexpage = render_template('indexpage.html', len = lenMuslims, data=mprofiles)
        thewrongEnglishindexpage = render_template('wrongindexpage.html')
        thematchmakingpg = render_template('matchmaking.html')
        thepasspg = render_template('password_wrong.html')

        thesignup_form_pg = render_template('signup_form.html')
        thepasspage = render_template('reset_pass_form.html')
        thesentpage = render_template('sent_pass_reset.html')
        thetermpage = render_template('terms.html')

        the_matches_page = render_template('utils/matches_matchmaking_questionaire.html')

        with open(halaallove + '/mainindex.html', 'w') as file:
            file.write(theEnglishindexpage)

        with open(halaallove + '/mainindex.php', 'w') as file:
            file.write(theEnglishindexpage)

        with open(halaallove + '/index.html', 'w') as file:
            file.write(thewrongEnglishindexpage)

        with open(halaallove + '/index.php', 'w') as file:
            file.write(thewrongEnglishindexpage)

        with open(halaallove + '/html/matchmaking.html', 'w') as file:
            file.write(thematchmakingpg)

        with open(halaallove + '/html/password_wrong.html', 'w') as file:
            file.write(thepasspg)

        # with open(halaallove + '/html/signup.html', 'w') as file:
        #     file.write(thesignup_form_pg)

        # with open(halaallove + '/html/terms.html', 'w') as file:
        #     file.write(thetermpage)

        # with open(halaallove + '/html/signup_form.html', 'w') as file:
        #     file.write(thesignup_form_pg)

        with open(halaallove + '/html/reset_pass_form.html', 'w') as file:
            file.write(thepasspage)

        with open(halaallove + '/html/sent_pass_reset.html', 'w') as file:
            file.write(thesentpage)

        with open(halaallove + '/html/matchmaking_questionaire_recieved.html', 'w') as file:
            file.write(the_matches_page)


if __name__ == '__main__':
    main()
