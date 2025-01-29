#!/usr/bin/python3
import logging

import RAHIB.UTILS.storage.Location as Location

from flask import request, redirect, render_template, Blueprint, make_response

from RAHIB.UTILS.misc.other import generate_fake_id

import halaallove.utils.general as general_utils
import halaallove.utils.profiles as profiles_utils

logging.basicConfig(filename=Location.general_storage() + '/record.log', level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = '/var/www/lovehalaal/'
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

profile_blueprint = Blueprint('profile_blueprint', __name__)

