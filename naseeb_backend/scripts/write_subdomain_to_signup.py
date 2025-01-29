#!/usr/bin/python3
'''Runs a flask endpoint'''
import os
import json
import shutil

import RAHIB.UTILS.storage.Location as Location

from flask import Flask, render_template
from flask_cors import CORS

import halaallove.utils.general as general_utils

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = '/var/www/lovehalaal/'
standbypower = '/home/standbypowerco/public_html/'

chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

app = Flask('ORGANIZATION', template_folder='/home/ec2-user/halaallove/halaallove/templates')
app.secret_key = "V1"

CORS(app, resources={r"/*": {"origins": "*"}})

def main():
    with app.app_context():
        # Writes signup
        thepage = render_template('signup.html')
        theotherepage = render_template('signup_form.html')

        with open(halaallove + '/html/signup.html', 'w') as file:
            file.write(thepage)

        with open(halaallove + '/html/signup_form.html', 'w') as file:
            file.write(theotherepage)

        #Writes FAQS
        data_locale = Location.general_storage() + '/nikahmubasit_faqs/'
        data_entries = [data_locale + '/' + entry for entry in os.listdir(data_locale) if '.json' in entry]
        data = [json.loads(open(entry).read()) for entry in data_entries]
        thepage = render_template('faqs.html', len = len(data), data=data)

        with open(halaallove + '/faqs.html', 'w') as file:
            file.write(thepage)

        # Writes TESTIMONIALS
        data_locale = storage + '/nikahmubasit_testimonials/'
        testimonial_image_locale = halaallove + '/assets/img/testimonials'

        data_entries = [data_locale + '/' + entry for entry in os.listdir(data_locale) if '.json' in entry]
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
            data[name]['img_url'] = url_path
            shutil.copy(full_path, destination_path)

        print(json.dumps(data,indent=3))

        thepage = render_template('testimonials.html', len=len(list(data.keys())),names=list(data.keys()),data=data)

        with open(halaallove + '/html/testimonials.html', 'w') as file:
            file.write(thepage)

if __name__ == '__main__':
    main()
