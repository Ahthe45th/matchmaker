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

logging.getLogger('pymongo').setLevel(logging.ERROR)

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
purgatory_locale = Location.general_storage() + '/purgatory/'
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

all_packages = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Emerald"]

def safejsonloads(file, nonbool=False):
    if type(file) == str:
        if os.path.exists(file):
            stuff = open(file).read()
            if stuff:
                try:
                    data = json.loads(stuff)
                    return data
                except:
                    print(traceback.format_exc())
                    with open(Location.general_storage() + '/errors.log', 'a') as file_:
                        timern = datetime.datetime.now().strftime('%H:%M:%S')
                        file_.write(f'For {file} at {timern}\n{traceback.format_exc()}\n')
                    if nonbool:
                        return ""
                    else:
                        logging.info(f"{file} could not be opened properly.")
                        return False
            else:
                with open(Location.general_storage() + '/errors.log', 'a') as file_:
                    file_.write(f'Empty {file}\n')
                if nonbool:
                        return ""
                else:
                    logging.info(f"{file} could not be opened properly.")
                    return False
            
        else:
            with open(Location.general_storage() + '/errors.log', 'a') as file_:
                file_.write(f'{file} doesnt exist \n')
            if nonbool:
                        return ""
            else:
                return False
    else:
        return file

def safeupdate(data, emailorname: str, purgatory=False):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["expat"]
    userscollection = db['profiles']
    # Performing an update on the path '_id' would modify the immutable field '_id', full error: {'index': 0, 'code': 66, 'errmsg': "Performing an update on the path '_id' would modify the immutable field '_id'"}
    if '_id' in data:
        data.pop('_id')
    # Define a filter to find the document (e.g., by email)
    if '@' in emailorname:
        filter_query = {"EMAIL": emailorname.lower().rstrip()}
        emailorname = emailorname.lower().rstrip()
    else:
        filter_query = {"fullname1": emailorname}        

    # Define the new data you want to insert or update
    new_data = {
        "$set": data
    }

    # Perform the upsert operation
    result = userscollection.update_one(filter_query, new_data, upsert=True)

    if result.upserted_id:
        logging.info(f"Inserted new document with ID: {result.upserted_id} for {emailorname}")
    else:
        print(f"Existing document updated for {emailorname}.")

    if purgatory == True:
        profile_locale = purgatory_locale + emailorname + '.json'
        with open(profile_locale, 'w') as file:
            file.write(json.dumps(data,indent=2))
    else:
        profile_locale = data_locale + emailorname + '.json'
        with open(profile_locale, 'w') as file:
            file.write(json.dumps(data,indent=2))

def safeload(emailorname: str, purgatory=False, auth=True):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["expat"]
    userscollection = db['profiles']
    
    def count_similarities(result, data, check=True):
        counter = 0 
        all = 0
        if check:
            if result:
                logging.info(f"Document found for {result['EMAIL']}.")
                for x in list(data.keys()):
                    try:
                        if result[x] == data[x]:
                            counter += 1 
                            all += 1
                        else:
                            all += 1
                    except KeyError as e:
                        all += 1
                logging.info(f"Mongo: {counter} - File: {all}")
                if counter != all:
                    logging.info(f"Updating due to discrepancy.")
                    safeupdate(data,emailorname,purgatory=purgatory)
            else:
                logging.info(f"No document matches the query on {emailorname}. Adding.")
                safeupdate(data, emailorname, purgatory=purgatory)
                logging.info(f"Length of file data keys: {len(list(data.keys()))}")
        
    if '@' in emailorname:
        result = userscollection.find_one({"EMAIL": emailorname.lower().rstrip()})
    else:
        result = userscollection.find_one({"fullname1": emailorname})
    
    
    if purgatory == True:
        if '@' in emailorname:
            profile_locale = purgatory_locale + emailorname.lower().rstrip() + '.json'
        else:
            profile_locale = purgatory_locale + emailorname.rstrip() + '.json'

        data = safejsonloads(profile_locale)

        if result:
                return result
        else:
            if data:
                return data
            else:
                logging.info(f"{emailorname} not on db nor file.")
                return False
    else:
        if '@' in emailorname:
            profile_locale = data_locale + emailorname.lower().rstrip() + '.json'
        else:
            profile_locale = data_locale + emailorname.rstrip() + '.json'
        
        data = safejsonloads(profile_locale)
        if result:
            if auth == False:
                logging.info(f"Activating: {emailorname}")
                return json.loads(json_util.dumps(result))
            elif 'confirmedaccount' in result:
                if result['confirmedaccount'] == True:
                    return json.loads(json_util.dumps(result))
                elif result['confirmedaccount'] == 'true':
                    return json.loads(json_util.dumps(result))
                else: 
                    logging.info(f"{emailorname} not confirmed.")
                    return False
            else: 
                if float(result['timestamp']) <= 1734681680:
                    return json.loads(json_util.dumps(result))
                else:
                    if " " in emailorname:
                        return json.loads(json_util.dumps(result))
                    else:
                        logging.info(f"{emailorname} too new")
                        return False
        else:
            if data:
                return data
            else:
                logging.info(f"{emailorname} not present on database nor on file.")
                return False

def saferemove(emailorname: str, purgatory=False):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["expat"]
    userscollection = db['profiles']
         
    if '@' in emailorname:
        result = userscollection.delete_one({"EMAIL": emailorname.lower().rstrip()})
        logging.info(f"{result.deleted_count} documents deleted for email: {emailorname}") 
        if result.deleted_count > 0:
            return True
        else:
            return False
    else:
        result = userscollection.delete_one({"fullname1": emailorname})
        logging.info(f"{result.deleted_count} documents deleted for email: {emailorname}") 
        if result.deleted_count > 0:
            return True
        else:
            return False

def checkexistance(emailorname: str, purgatory=False):
    def locale_check(locale, result):
        if '@' in emailorname:
            profile_locale = locale + emailorname.lower().rstrip() + '.json'
        else:
            profile_locale = locale + emailorname.rstrip() + '.json'

        if result:
            return True
        else:
            if not os.path.exists(profile_locale):
                return False
            else:
                data = safejsonloads(profile_locale)
                if data:
                    return True
                else:
                    return False
    
    client = MongoClient("mongodb://localhost:27017/")
    db = client["expat"]
    userscollection = db['profiles']

    if '@' in emailorname:
        result = userscollection.find_one({"EMAIL": emailorname.lower().rstrip()})
    else:
        result = userscollection.find_one({"fullname1": emailorname})
    
    if purgatory:
        found = locale_check(purgatory_locale, result)
        return found
    else:
        found = locale_check(data_locale, result)
        return found

def encode_base64(input_string):
    try:
        # Convert the input string to bytes
        input_bytes = input_string.encode('utf-8')
        # Encode the bytes to Base64
        encoded_bytes = base64.b64encode(input_bytes)
        # Convert the Base64 bytes to a string
        encoded_string = encoded_bytes.decode('utf-8')
        return encoded_string
    except Exception as e:
        print(f"Error encoding to Base64: {str(e)}")
        return None

def decode_base64(base64_string):
    try:
        # Add padding if necessary
        padding = len(base64_string) % 4
        if padding != 0:
            base64_string += '=' * (4 - padding)

        # Decode the Base64 string
        decoded_bytes = base64.b64decode(base64_string)
        # Convert the decoded bytes to a string
        decoded_string = decoded_bytes.decode('utf-8')
        return decoded_string
    except Exception as e:
        print(f"Error decoding Base64: {str(e)}")
        return None
    
def get_timestamp(string):
    timestampp = datetime.datetime.strptime(string, '%d/%m/%Y %H:%M:%S')
    timestampp = timestampp.timestamp()
    return timestampp

def log_thing(thing):
    with open(Location.general_storage() + '/general.log', 'a') as file:
        file.write(thing + '\n')

def general_storage_func(argsdict):
    argsdict['__id'] = generate_fake_id()
    save_locale = storage + '/' + argsdict['title'].replace(' ','_')
    
    if 'password' in argsdict:
        argsdict['password'] = sha256_crypt.hash(argsdict['password'])
        argsdict['confirmpassword'] = sha256_crypt.hash(argsdict['password'])

    if 'ogname' in argsdict:
        argsdict['ogname'] = argsdict['ogname'].lower().rstrip()
        thedata = safeload(argsdict['EMAIL'].lower().rstrip())

        for thekey in thedata:
            if thekey not in argsdict:
                argsdict[thekey] = thedata[thekey]

        if argsdict['ogname'] != argsdict['EMAIL']:
            argsdict['EMAIL'] == argsdict['ogname']

    if not os.path.exists(save_locale):
        os.mkdir(save_locale)

    try:
        argsdict['EMAIL'] = argsdict['EMAIL'].lower().rstrip()
        safeupdate(argsdict, argsdict['EMAIL'])
    except Exception as e:
        print(traceback.format_exc())
        with open(save_locale + '/' + argsdict['name'].strip() + '.json', 'w') as file:
            data = json.dumps(dict(argsdict),indent=3)
            file.write(data)

    if 'EMAIL' in argsdict:
        file_save_locale = save_locale + '/' + argsdict['EMAIL'].strip() + 'dir/'
    else:
        file_save_locale = save_locale + '/' + argsdict['name'].strip() + 'dir/'

    if not os.path.exists(file_save_locale):
        os.mkdir(file_save_locale)
    else:
        files = [file_save_locale + x for x in os.listdir(file_save_locale)]
        for file in files:
            os.remove(file)

    files = [file for file in flask.request.files.getlist("file[]") if file]
    files2 = [file for file in flask.request.files.getlist("file2[]") if file]
    files3 = [file for file in flask.request.files.getlist("file3[]") if file]

    files.extend(files2)
    files.extend(files3)
    files = list(set(files))

    print(files)    

    for file in files:
        save_pth = os.path.join(file_save_locale, secure_filename(file.filename))
        file.save(save_pth)

    return flask.redirect('https://expatelitesingles.com/terms')

def checkemimages(data):
    if 'profile_pic_url' in data:
        first_image_present = False
        second_image_present = False
        third_image_present = False

        if len(data['profile_pic_url']) == 3:
            first_image_present = True
            second_image_present = True
            third_image_present = True

        if len(data['profile_pic_url']) == 2:
            first_image_present = True
            second_image_present = True
            third_image_present = False

        if len(data['profile_pic_url']) == 1:
            first_image_present = True
            second_image_present = False
            third_image_present = False

        if len(data['profile_pic_url']) == 0:
            first_image_present = False
            second_image_present = False
            third_image_present = False
        return first_image_present, second_image_present, third_image_present
    else:
        first_image_present = False
        second_image_present = False
        third_image_present = False
        return first_image_present, second_image_present, third_image_present

def split_list(a_list):
    half = len(a_list)//2
    return a_list[:half], a_list[half:]

def check_in_list(item, secondlist):
    variable = False
    for x in secondlist:
        if x in item:
            variable = True
    return variable

def get_message_limit(package):
    packages = { 'DIRECT CONTACT':1, 'MINGLE':3, 'MATCHMAKING':7, "DATE ONLY":15, "SUPREME":250000}
    package = package.upper().rstrip()
    return packages[package]

def get_all_men():
    data_entries_all = [data_locale + entry for entry in os.listdir(data_locale) if entry.endswith('.json') if '@' not in entry]
    return data_entries_all

def get_all_men_db(query):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["expat"]
    userscollection = db['profiles']
    thelist = []
    cursor = userscollection.find(query, {"_id": 0})
    for document in cursor:
          thelist.append(document)
    return thelist

def get_all_women(purgatory=False) -> list:
    if purgatory==False:
        data_entries_all = [data_locale + entry for entry in os.listdir(data_locale) if entry.endswith('.json') if '@' in entry]
        data_entries_all = [entry for entry in data_entries_all if safejsonloads(entry)]
        return data_entries_all
    else:
        data_entries_all = [purgatory_locale + entry for entry in os.listdir(purgatory_locale) if entry.endswith('.json') if '@' in entry]
        data_entries_all = [entry for entry in data_entries_all if safejsonloads(entry)]
        return data_entries_all

def get_all_purgatory() -> list:
    data_entries_all = [purgatory_locale + entry for entry in os.listdir(purgatory_locale) if entry.endswith('.json') if '@' in entry if safejsonloads(entry)]
    data_entries_all = [entry for entry in data_entries_all if 'useremail' not in safejsonloads(entry)]
    return data_entries_all

def get_all_women_past_timestamp(timestamp):
    data_entries_all = [entry for entry in get_all_women() if 'timestamp' in safejsonloads(entry)]
    data_entries_all = [entry for entry in data_entries_all if safejsonloads(entry)['timestamp'] >= timestamp]
    return data_entries_all

def get_all_women_before_timestamp(timestamp):
    data_entries_all = [entry for entry in get_all_women() if 'timestamp' in safejsonloads(entry)]
    data_entries_all = [entry for entry in data_entries_all if safejsonloads(entry)['timestamp'] <= timestamp]
    return data_entries_all

def get_all_chats_files():
    chats = [chats_data_locale + entry for entry in os.listdir(chats_data_locale) if entry.endswith('.json') if '-' in entry]
    chats = [entry for entry in chats if safejsonloads(entry)]
    chats = [entry for entry in chats if 'messages' in safejsonloads(entry)]
    return chats

def get_all_chats():
    chats = get_all_chats_files()
    chats = [safejsonloads(entry) for entry in chats]
    return chats

def chats_for2_weeks(chats):
    today_timestamp = datetime.datetime.today().timestamp()
    un_mes = 86400*30
    chats = [safejsonloads(x) for x in chats if (today_timestamp - os.path.getmtime(x)) <= un_mes]
    # chats = [x for x in chats if 'Girl Sent' in x['messages'][-1]]
    return chats

def chats_sorted(chats):
    girlchats = [x for x in chats if 'Girl Sent' in x['messages'][-1]]
    thetimes = [x['messages'][-1]['Girl Sent']['time'] for x in girlchats]
    if thetimes:
        thetimes = max([datetime.datetime.strptime(x, "%d/%m/%Y %H:%M:%S").timestamp() for x in thetimes])
    else:
        thetimes = 0
    guychats = [x for x in chats if 'Guy Sent' in x['messages'][-1]]
    newchats = girlchats
    newchats.extend(guychats)
    return newchats, len(girlchats), thetimes

def get_recency_by_id(id):
    chats = [os.path.getmtime(entry) for entry in get_all_chats_files() if id in entry]
    if chats:
        return max(chats)
    else:
        return 0
    
def get_recency_by_name(id):
    chats = [os.path.getmtime(entry) for entry in get_all_chats_files() if id in entry]
    if chats:
        return max(chats)
    else:
        return 0

def process_recency(file):
    data = safejsonloads(file)
    data['most_recent_msg'] = get_recency_by_id(data['__id'])
    return data

def process_recency_by_name(data):
    data['most_recent_msg'] = get_recency_by_name(data['__id'])
    return data

def get_num_of_msgs(entry):
    chats_datas = get_all_chats_by_id_men(entry['name'])
    entry['all_num_msg'] = len(chats_for2_weeks(chats_datas))
    return entry

def chats_for_ten_days(chats):
    today_timestamp = datetime.datetime.today().timestamp()
    un_rato = 86400*10

    chats = [safejsonloads(x) for x in chats if (today_timestamp - os.path.getmtime(x)) <= un_rato]
    chats = [x for x in chats if x]
    return chats

def chats_for_specified_amount_of_time(chats, period):
    today_timestamp = datetime.datetime.today().timestamp()
    chats = [safejsonloads(x) for x in chats if (today_timestamp - os.path.getmtime(x)) <= period]
    chats = [x for x in chats if x]
    return chats

def chats_from_timestamp(chats, begin_timestamp):
    chats = [safejsonloads(x) for x in chats if os.path.getmtime(x) >= begin_timestamp]
    chats = [x for x in chats if x]
    return chats

def get_womans_file(theid):
    female_data_locale = [x for x in os.listdir(data_locale) if x.endswith('.json') if safejsonloads(data_locale + x)]
    female_data_locale = [x for x in female_data_locale if x.endswith('.json') if '__id' in safejsonloads(data_locale + x)]
    female_data_locale = [x for x in female_data_locale if theid == safejsonloads(data_locale + x)['__id']]
    if len(female_data_locale) > 0:
        female_data_locale = female_data_locale[-1]
        return safejsonloads(data_locale + female_data_locale)
    else:
        return False
    
def unable_to_respond():
    import halaallove.utils.chats as chat_utils
    chats = [{"data":safejsonloads(chats_data_locale + x), "pth":x} for x in os.listdir(chats_data_locale)]
    chats = [x for x in chats if "Guy Sent" in x['data']['messages'][-1] if type(x['data'])==dict]
    for chat in chats:
        secondhalf = chat['pth'].split('-')[-1]
        man = secondhalf.split('.')[0]
        woman = secondhalf.split('.')[1]
        man_data_package = safeload(man)
        woman_data_package = get_womans_file(woman)
        if type(woman_data_package)==dict and type(man_data_package)==dict:
                allowed_packages = chat_utils.check_package(woman_data_package['package1'])
                if man_data_package['package1'] not in allowed_packages:
                    print(f'Chat between {man} on {man_data_package["package1"]} and {woman_data_package["fullname1"]} on {woman_data_package["package1"]}')

def get_all_chats_by_id(id):
    chats = [entry for entry in get_all_chats_files() if id in entry]
    return chats

def get_all_chats_by_id_men(malename):
    chats = [entry for entry in get_all_chats_files() if malename in entry]
    chats = [entry for entry in chats if 'Girl Sent' in safejsonloads(entry)['messages'][0]]
    return chats

def sort_by_timestamp_files(files=None):
    if not files:
        data_entries_all = [data_locale + '/' + entry for entry in os.listdir(data_locale) if entry.endswith('.json') if '@' not in entry]
    else:
        data_entries_all = files
    data_entries_all = [{'file':entry, 'data':json.loads(open(entry).read())} for entry in data_entries_all]
    for item in data_entries_all:
        if 'timestamp' not in item['data']:
            now = datetime.datetime.now()
            timestamp = datetime.datetime.timestamp(now)
            item['data']['timestamp'] = timestamp
        with open(item['file'], 'w') as file:
            su_data = json.dumps(item['data'], indent=2)
            file.write(su_data)
    data_entries_all = sorted(data_entries_all, key=lambda x: x['data']['timestamp'], reverse=True)
    files = [x['file'] for x in data_entries_all]
    return files

def sort_by_timestamp_files_forward(files=None):
    if not files:
        data_entries_all = [data_locale + '/' + entry for entry in os.listdir(data_locale) if entry.endswith('.json') if '@' in entry]
    else:
        data_entries_all = files

    data_entries_all = [{'file':entry, 'data':safejsonloads(entry)} for entry in data_entries_all]
    data_entries_all = [entry for entry in data_entries_all if entry['data']]

    for item in data_entries_all:
        if 'timestamp' not in item['data']:
            now = datetime.datetime.now()
            timestamp = datetime.datetime.timestamp(now)
            item['data']['timestamp'] = timestamp
        with open(item['file'], 'w') as file:
            su_data = json.dumps(item['data'], indent=2)
            file.write(su_data)
    data_entries_all = sorted(data_entries_all, key=lambda x: x['data']['timestamp'])
    files = [x['file'] for x in data_entries_all]
    for x in files[:20]:
        print(x)
    return files

def get_possible_packages(herpackage: str):
    possible_packages = ["DIRECT CONTACT", "MINGLE", "MATCHMAKING", "DATE ONLY", "SUPREME"]
    if herpackage == "DIRECT CONTACT":
        thesortlist = ["DIRECT CONTACT"]
        return thesortlist
    if herpackage == "MINGLE":
        thesortlist = ["DIRECT CONTACT", "MINGLE"]
        return thesortlist
    if herpackage == "MATCHMAKING":
        thesortlist = ["DIRECT CONTACT", "MINGLE", "MATCHMAKING"]
        return thesortlist
    if herpackage == "DATE ONLY":
        thesortlist = ["DIRECT CONTACT", "MINGLE", "MATCHMAKING", "DATE ONLY"]
        return thesortlist
    if herpackage == "SUPREME":
        return possible_packages

def floattheage(data):
    if 'age' in data:
        age = data['age'].rstrip()
        age = float(age)
        return age
    else:
        print(f'The name of dude: {data["name"]}')
        age = input('Age: ')
        age = float(age)
        return age

if __name__ == '__main__':
    unable_to_respond()
