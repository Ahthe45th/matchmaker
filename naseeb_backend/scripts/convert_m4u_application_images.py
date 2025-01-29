#!/usr/bin/python3
import os
import json
import datetime 
import bcrypt
import pickle

import RAHIB.UTILS.storage.Location as Location

import base64 

from PIL import Image

def compress(image_file: str) -> None:
    image = Image.open(image_file)
    print(f"OG size: {os.path.getsize(image_file)}")
    
    image.save(image_file, 
                 image.format, 
                 optimize = True, 
                 quality = 90)
    
    print(f"Size: {os.path.getsize(image_file)}")
    return

def main():
    storage = Location.general_storage()
    logins_locale = storage + '/expatcustomerdata/'

    profilesunconverted = [logins_locale + x for x in os.listdir(logins_locale) if x.endswith('.json')]
    
    for item in profilesunconverted:
        data = json.loads(open(item).read())

        relevant_data = data['data'] 
        relevant_data['__timestamp'] = datetime.datetime.now().timestamp()
        relevant_data['_id'] = data['__id']
        
        if "Image1" in relevant_data:
            firstimage = relevant_data.pop("Image1")
            secondimage = relevant_data.pop("Image2")
            thirdimage = relevant_data.pop("Image3")

            the_directory = item.split('.json')[0]+'dir/'
            json_file = the_directory + relevant_data["Email"]['answer']+'.json'
            img1_file = the_directory + relevant_data["Email"]['answer']+'1.png'
            img2_file = the_directory + relevant_data["Email"]['answer']+'2.png'
            img3_file = the_directory + relevant_data["Email"]['answer']+'3.png'

            print(f"First Name: {relevant_data['FirstName']['answer']}")
            print(f"Middle Name: {relevant_data['MiddleName']['answer']}")
            print(f"Last Name: {relevant_data['LastName']['answer']}")
            print(f"Email: {relevant_data['Email']['answer']}")
            input('> y/n')

            with open(json_file, 'w') as file:
                file.write(json.dumps(relevant_data, indent=3))

            data['data'] = relevant_data
            with open(item, 'w') as file:
                file.write(json.dumps(data, indent=3))
            
            if firstimage['answer']:    
                with open(img1_file, 'wb') as file:
                    file.write(base64.b64decode(firstimage['answer'].split(',')[1]))
                    compress(img1_file)

            if secondimage['answer']:
                with open(img2_file, 'wb') as file:
                    file.write(base64.b64decode(secondimage['answer'].split(',')[1]))
                    compress(img2_file)

            if thirdimage['answer']:
                with open(img3_file, 'wb') as file:
                    file.write(base64.b64decode(thirdimage['answer'].split(',')[1]))
                    compress(img3_file)

if __name__ == '__main__':
    main()
