#!/usr/bin/python3
import os
import logging
import math
import base64
import json 
import traceback

import RAHIB.UTILS.storage.Location as Location

from flask import request, render_template, Blueprint, send_file, abort

from RAHIB.UTILS.misc.other import generate_fake_id

import halaallove.utils.general as general_utils
import halaallove.utils.chats as chats_utils
import halaallove.utils.profiles as profiles_utils

logging.basicConfig(filename=Location.general_storage() + '/record.log', level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = '/var/www/lovehalaal/'
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'
static_folder = '/home/ec2-user/halaallove/halaallove/templates/static/'

chats_blueprint = Blueprint('chats_blueprint', __name__)

@chats_blueprint.route('/api/forgottenpassword', methods=['GET', "POST"])
def forgottenpassword():
    # in: EMAIL str
    # out: responsecode int
    values = request.form
    chats_utils.send_email("noreply@expatelitesingles.com", [values["EMAIL"]], "Forgotten Password", f"You seem to have forgotten your password, Here's a reset link:\nhttps://expatelitesingles.com/resetpassword/{base64.b64encode(values['EMAIL'].encode('utf-8')).decode('utf-8')}")
    return {'responsecode':200}

@chats_blueprint.route('/api/resettingpassword', methods=['GET', "POST"])
def resettingpassword():
    # in: EMAIL str, password str, confirmpassword str
    # out: responsecode int
    values = request.form
    try:
        data = general_utils.safeload(values['EMAIL'])
        
        data['password'] = values['password']
        data['confirmpassword'] = values['confirmpassword']
        # removing the id field so it can update in mongodb
        data.pop('_id', None)
        general_utils.safeupdate(data, values['EMAIL'])
        return {'responsecode':200}
    except:
        logging.error(f'{values["EMAIL"]} cant reset password. error info: {traceback.format_exc()}')

@chats_blueprint.route('/assets/js/<file>', methods=['GET'])
def searcher(file):
    return send_file(static_folder + file)

@chats_blueprint.route('/assets/js/media/<file>', methods=['GET'])
def searchermedia(file):
    return send_file(static_folder + "/media/" + file)

@chats_blueprint.route('/assets/signupcss/<file>', methods=['GET'])
def signupcssandstatic(file):
    return send_file(static_folder + file)

@chats_blueprint.route('/assets/css/<file>', methods=['GET'])
def cssandstatic(file):
    return send_file(static_folder + file)

@chats_blueprint.route('/assets/img/<file>', methods=['GET'])
def imgandstatic(file):
    if os.path.exists(static_folder + '/img/' + file):
        return send_file(static_folder + '/img/' + file)
    else:
        abort(500)

@chats_blueprint.route('/assets/<file>', methods=['GET'])
def baseassets(file):
    return send_file(static_folder + file)

@chats_blueprint.route('/assets/img/<file>', methods=['GET'])
def imgassets(file):
    return send_file(static_folder + file)
    
####
#### MESSAGING
####
@chats_blueprint.route('/send_message', methods=['GET', 'POST'])
def le_storagem():
    # in:
    # woman: Used to load the profile of the woman. dict
    # name: The name of the male recipient. str
    # message: The message content that is being sent. str
    # womanname: Used to check if a notification for the woman should be sent. str
    # out: responsecode int
    argsdict = request.form.to_dict()
    return chats_utils.sync_chats_packages_prohibitive(argsdict)

@chats_blueprint.route('/send_message_', methods=['GET', 'POST'])
def le_storagemmm():
    # in:
    # name: Used to load the profile of the male sender and for logging. str
    # message: The message content that is being sent. str
    # womanname: Checked to determine whether a notification should be sent for the woman. str
    # out: responsecode int
    argsdict = dict(request.values)
    argsdict['__id'] = generate_fake_id()
    return chats_utils.sync_chats_non_prohibitive(argsdict)

@chats_blueprint.route('/send_package_message_', methods=['GET', 'POST'])
def le_storagemmm_M_M():
    # in:
    # woman: Used to load the profile of the woman. dict
    # name: The name of the male recipient. str
    # message: The message content that is being sent. str
    # womanname: Used to check if a notification for the woman should be sent. str
    # out: responsecode int
    argsdict = dict(request.values)
    argsdict['__id'] = generate_fake_id()
    return chats_utils.sync_chats_packages_prohibitive(argsdict)

####
#### OTHER
####
@chats_blueprint.route('/get_chats', methods=['GET', 'POST'])
def getallemchats():
    # in: id str
    # out: chats_data list[dict], responsecode int
    argsdict = dict(request.values)
    persons_chats = [general_utils.safejsonloads(x) for x in general_utils.get_all_chats_by_id(argsdict['id'])]
    return {'chats_data': persons_chats, "responsecode":200}

@chats_blueprint.route('/api/chat/setread', methods=['GET', 'POST'])
def setmessagesasread():
    # in: id str, malename str 
    # out: responsecode int
    argsdict = dict(request.values)
    persons_chats = [x for x in general_utils.get_all_chats_by_id(argsdict['id']) if argsdict['malename'] in x]
    if len(persons_chats)>0:
        loadedchat = general_utils.safejsonloads(persons_chats[0])
        oldmessageslist = loadedchat['messages']
        newmessageslist = []
        for message in oldmessageslist:
            message['read'] = True
            newmessageslist.append(message)
        loadedchat['messages'] = newmessageslist
        with open(persons_chats[0], 'w') as file:
            file.write(json.dumps(loadedchat, indent=2))
    return {"responsecode":200}

@chats_blueprint.route('/api/getaveryspecificchat', methods=['GET', 'POST'])
def getaveryspecificchats():
    # in: id str, name str
    # out: chats_data dict, responsecode int
    argsdict = dict(request.values)
    persons_chats_files = general_utils.get_all_chats_by_id(argsdict['id'])
    persons_chats = [general_utils.safejsonloads(x) for x in persons_chats_files if argsdict['name'] in x]
    if len(persons_chats) > 0:
        return {'chats_data': persons_chats[0], "responsecode":200}
    else:
        return {'chats_data':{}, 'responsecode':302}

@chats_blueprint.route('/chats/responder/<email>', methods=['GET'])
def render_chat_responder3(email):
    # in: from url email
    # out: responsecode int, profile dict[str], chats_data dict[list]
    chats_data = {}
    notifications = []

    entry = data_locale + '/' + email + '.json'
    data = general_utils.safejsonloads(entry)

    whole_name = data['fullname1'].replace("'", "")
    chats_data[whole_name] = []

    ##### Get the chats for person
    chats_datas = general_utils.get_all_chats_by_id(data['__id'])
    chats_datas = general_utils.chats_for2_weeks(chats_datas)

    new_messages_girls = 0

    for chatdata in chats_datas:
        #basic setup tings
        theindex = chats_datas.index(chatdata)
        if 'Girl Sent' in chatdata['messages'][-1]:
            chatdata['new_msg'] = True
            new_messages_girls += 1
            chatdata['all_num_msg'] = new_messages_girls
        else:
            chatdata['new_msg'] = False
            chatdata['all_num_msg'] = new_messages_girls

        chats_data[whole_name].append(chatdata)

        if not chats_data[whole_name]:
            chats_data.pop(whole_name)

    return {"responsecode":200, 'profile':data, 'chats_data': chats_data}