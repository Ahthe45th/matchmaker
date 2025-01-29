#!/usr/bin/python3
import logging
import string    
import random # define the random module    
import os 
import json 
import traceback 

import RAHIB.UTILS.storage.Location as Location

from flask import Blueprint, request
import halaallove.utils.ai_functions as ai_utils

log_pth = Location.general_storage() + '/record.log'
logging.basicConfig(filename=log_pth, level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
purgatory_locale = Location.general_storage() + '/purgatory/'
halaallove = Location.Halaallove()
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

ai_blueprint = Blueprint('ai_blueprint', __name__)

def generate_string(num):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k = num))  

@ai_blueprint.route('/sirri_api/generate_suggestions', methods=['GET', 'POST'])
def suggestions():
    # in: __id str, male str 
    # out: err responsecode int success responsecode int generatedresponses list[str]
    try:
        argsdict = request.values
        
        specific_file_match_id = [chats_data_locale + x for x in os.listdir(chats_data_locale) if argsdict['__id'] in x]
        specific_file_match_guyname = [x for x in specific_file_match_id if argsdict['male'] in x]
        
        if len(specific_file_match_guyname) > 0:
            data = json.loads(open(specific_file_match_guyname[0]).read())['messages']
            conversation = []
            
            for message in data:
                if "Guy Sent" in message:
                    conversation.append(f"You: {message['Guy Sent']['message']}")
                else:
                    conversation.append(f"Her: {message['Girl Sent']['message']}")
            
            conversation = '\n'.join(conversation)
            
            generated_responses = ai_utils.generate_suggestions(conversation)
            return {'responsecode':200, 'generatedresponses':generated_responses}
        else:
            generated_responses = ai_utils.generate_suggestions('')
            return {'responsecode':200, 'generatedresponses':generated_responses}
    except:
        logging.error(f"Error: {traceback.format_exc()}")
        return {'responsecode':500}

@ai_blueprint.route('/sirri_api/set_perfil_data', methods=['GET', 'POST'])
def setdata():
    # in: __id str, male str 
    # out: err responsecode int success responsecode int data str
    try:
        argsdict = request.form
        generated_responses = ai_utils.setprofiledata(argsdict)
        return {'responsecode':200, 'data':json.loads(generated_responses)}
    except:
        logging.error(f"Error: {traceback.format_exc()}")
        return {'responsecode':500}

@ai_blueprint.route('/sirri_api/aiprompts/generalizedprompts', methods=['GET', 'POST'])
def generalizedprompt():
    # in: context str, prompt str, numofresponses int
    # out: err responsecode int success responsecode int data str
    try:
        argsdict = request.form
        generated_responses = ai_utils.generalprompt(argsdict)
        return {'responsecode':200, 'data':generated_responses}
    except:
        logging.error(f"Error: {traceback.format_exc()}")
        return {'responsecode':500}
