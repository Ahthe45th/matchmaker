import os
import json
import traceback
import datetime
import flask
import base64
import logging
from pymongo import MongoClient

import RAHIB.UTILS.storage.Location as Location

from werkzeug.utils import secure_filename
from passlib.hash import sha256_crypt
from RAHIB.UTILS.misc.other import generate_fake_id
from bson import json_util

from halaallove.utils.general import safejsonloads

logging.getLogger('pymongo').setLevel(logging.ERROR)

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
purgatory_locale = Location.general_storage() + '/purgatory/'
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def main():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["expat"]
    userscollection = db['profiles']
    users = list(userscollection.find({"gender1": "Female"}))
    counter = 0
    allusers = len(users)
    for user in users:
        herchats = [chats_data_locale + x for x in os.listdir(chats_data_locale) if user["__id"] in x]
        respondedchats = 0
        for chat in herchats:
            chatdata = safejsonloads(chat)
            if 'Girl Sent' in chatdata['messages']:
                respondedchats += 1
        if respondedchats == 0:
            counter += 1
    
    print(f"{counter}/{allusers} have sent no messages.")
    percntage = counter/allusers
    percntage = percntage*100
    print(f"{percntage}%")

if __name__ == "__main__":
    main()