#!/usr/bin/python3
import os
import json
import traceback
import shutil
import flask
import logging
import base64
import string    
import random # define the random module   
import datetime 

import RAHIB.UTILS.storage.Location as Location

from werkzeug.utils import secure_filename
from passlib.hash import sha256_crypt
from flask import Blueprint, request, redirect, render_template, send_file, abort

from RAHIB.UTILS.misc.other import generate_fake_id

import halaallove.utils.general as general_utils
import halaallove.utils.chats as chats_utils
import halaallove.utils.ai_functions as ai_utils

log_pth = Location.general_storage() + '/record.log'
logging.basicConfig(filename=log_pth, level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
purgatory_locale = Location.general_storage() + '/purgatory/'
hidden_purgatory_locale = Location.general_storage() + '/hiddenpurgatory/'
halaallove = Location.Halaallove()
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

general_blueprint = Blueprint('general_blueprint', __name__)

def generate_string(num):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k = num))  

@general_blueprint.route('/terms_accept', methods=['GET'])
def terms_after_signup_accept():
    return render_template('registered_success.html')

@general_blueprint.route('/images/favicon.ico', methods=['GET'])
def get_faviconico():
    return send_file(halaallove+'/templates/images/LOGO.png')

@general_blueprint.route('/robots.txt', methods=['GET'])
def confuse_robots():
    abort(403)

@general_blueprint.route('/profilepic/<num>', methods=['GET'])
def get_user_pictures(num):
    # in: EMAIL str
    # out: file || 500 code || "Broken" string
    try:
        email = request.values['EMAIL'].strip()
        list_to_be_sorted = [{'pic':data_locale+email+'dir/'+x, 'mtime':os.path.getmtime(data_locale+email+'dir/'+x)} for x in os.listdir(data_locale+email+'dir/')]
        pics = sorted(list_to_be_sorted, key=lambda d: d['mtime'], reverse=True)
        try:
            thepic = pics[int(num)-1]['pic']
            return send_file(thepic)
        except:
            with open(Location.general_storage() + '/picerrors.log', 'a') as file:
                file.write(traceback.format_exc())
            return "Broken"
    except:
        abort(500)

@general_blueprint.route('/deletepic/<num>', methods=['GET'])
def delete_user_pictures(num):
    # in: EMAIL str
    # out: redirect to same url
    email = request.values['EMAIL'].strip()
    list_to_be_sorted = [{'pic':data_locale+email+'dir/'+x, 'mtime':os.path.getmtime(data_locale+email+'dir/'+x)} for x in os.listdir(data_locale+email+'dir/')]
    pics = sorted(list_to_be_sorted, key=lambda d: d['mtime'], reverse=True)
    os.remove(pics[int(num)-1]['pic'])
    return redirect(request.referrer)

@general_blueprint.route('/sirri_api/uploadFile', methods=['GET', 'POST'])
def saveimages():
    # in: file file, fileName str, name str
    # out: responscode int, message str
    logging.info(f"Url: /sirri_api/uploadFile accessed.")
    image = request.files["file"]
    filename = request.form.get("fileName").rstrip()
    name = request.form.get("name").rstrip()
    savedir = data_locale + name.rstrip() + 'dir/'
    try:
        if os.path.exists(savedir):
            images = [savedir + x for x in os.listdir(savedir)]
            
            for x in images:
                os.remove(x)

            savepth = savedir + filename
            image.save(savepth)
            return {'responsecode':200, "message":"Name is already present."}
        else:
            os.mkdir(savedir)
            savepth = savedir + filename
            image.save(savepth)
            return {'responsecode':200, "message":"Saved successfully."}
    except:
        return {'responsecode':200, "message":f"{traceback.format_exc()}"}

@general_blueprint.route('/deletepics', methods=['GET', 'POST'])
def delimages():
    # in: EMAIL str
    # out: responsecode int, maybe message str
    name = request.values["EMAIL"]

    savedir = data_locale + name + 'dir/'
    files_within = [savedir + x for x in os.listdir(savedir)]
    for file in files_within:
        os.remove(file)
    try:
        savedir = data_locale + name + 'dir/'
        files_within = [savedir + x for x in os.listdir(savedir)]
        for file in files_within:
            os.remove(file)
        return {'responsecode':200}
    except:
        return {'responsecode':500, "message":f"{traceback.format_exc()}"}

@general_blueprint.route('/checkauth', methods=['GET', 'POST'])
def check_authorization():
    # in: authcode
    # out: responsecode int, maybe message str
    authcode = request.form.get("authcode")
    authcodes = [x.split('.auth')[0] for x in os.listdir(storage + '/authcodes/')]
    if authcode in authcodes:
        return {'responsecode':200, "message":"Authorized."}
    else:
        return {'responsecode':500, "message":"Failed."}
    
@general_blueprint.route('/sirri_api/addauth', methods=['GET', 'POST'])
def add_authorization():
    # in: authcode
    # out: responsecode int, message str || rendered template
    logging.info(f"Url: /sirri_api/addauth accessed.")
    authcode = request.form.get("authcode")
    if request.method == 'POST':
        savepth = storage + '/authcodes/' + authcode + '.auth'
        with open(savepth, 'w') as file:
            data = json.dumps({'timestamp':datetime.datetime.now().timestamp()})
            file.write(data)
        return {"responsecode":200, "message":"Auth code added."}
    else:
        current_timestamp = datetime.datetime.now().timestamp()- 86400*7
        authcodes = [storage + '/authcodes/'+x for x in os.listdir(storage + '/authcodes/')]
        for code in authcodes:
            if os.path.getmtime(code) < current_timestamp:   
                os.remove(code)
        return render_template('generalpage.html', pagetitle="Add auth form", jspath=f"/assets/js/bundle.js?id={generate_string(5)}", footervisibility="hide")
    
@general_blueprint.route('/sirri_api/deleteauth', methods=['GET', 'POST'])
def delete_authorization():
    # in: authcode
    # out: responsecode int, maybe message str
    logging.info(f"Url: /sirri_api/deleteauth accessed.")
    authcode = request.form.get("authcode")
    if request.method == 'POST':
        savepth = storage + '/authcodes/' + authcode + '.auth'
        os.remove(savepth)
        return {"responsecode":200, "message":"Auth code deleted."}
    else:
        return render_template('generalpage.html', pagetitle="Add auth form", jspath=f"/assets/js/bundle.js?id={generate_string(5)}", footervisibility="hide")
    
@general_blueprint.route('/sirri_api/getauthcodes', methods=['GET', 'POST'])
def getauthorization():
    # in: null
    # out: authcodes list[str], responsecode int
    logging.info(f"Url: /sirri_api/getauthcodes")
    authcodes = [x.split('.auth')[0] for x in os.listdir(storage + '/authcodes/')]
    return {'authcodes':authcodes, 'responsecode':200}
        
@general_blueprint.route('/api/getmenfiles', methods=['GET'])
def getimages():
    profiles = general_utils.get_all_men()
    profiles = [x for x in profiles if '.json' in x]
    profiles_data = [{"data":general_utils.safejsonloads(x), 'link':f'/profilepic/1?EMAIL={x.split(data_locale)[1].split(".json")[0]}'} for x in profiles]
    return {'responsecode':200, "images": profiles_data}

@general_blueprint.route('/api/getmenfiles/index', methods=['GET'])
def getimagesindex():
    profiles = [data_locale + x for x in os.listdir(data_locale) if 'MAINGUY' in x]
    profiles_data = [{"data":{}, 'link':f'/profilepic/1?EMAIL={x.split(data_locale)[1].split("dir")[0]}'} for x in profiles]
    profiles_data.extend(profiles_data)
    profiles_data.extend(profiles_data)
    return {'responsecode':200, "images": profiles_data}

@general_blueprint.route('/sirri_api/backend/perfil_generador', methods=['GET', 'POST'])
def backendperfil_generador():
    # in: age1 str, currentoccupation1 str city1 str country1 str ethnicity1 str
    # out: responsecode int, maybe profiletext str 
    try:
        argsdict = request.form
        profile = ai_utils.generate_profile(argsdict)[0]
        complete = f'''Age: {argsdict['age1']}\nProfession: {argsdict['currentoccupation1']}\nLocation: {argsdict['city1']}, {argsdict['country1']}\nNationality: {argsdict['ethnicity1']}\n\n{profile}'''
        return {"responsecode":200, "profiletext": complete}
    except Exception as e:
        logging.error(f"Profile gen error: {traceback.format_exc()}")
        return {"responsecode": 500}

def check_password(thehash, thepass):
    print(f"The hash:{thehash}, the pass: {thepass}")
    if len(thehash) >= 64:
        return sha256_crypt.verify(thepass, thehash), True
    else:
        correctornah = thehash == thepass
        return correctornah, False
    
@general_blueprint.route('/passcheck', methods=['POST'])
def passchecker():
    # in: EMAIL str, password str
    # out: responsecode
    argsdict = dict(request.form)
    argsdict['EMAIL'] = argsdict['EMAIL'].lower().strip().replace(' ','')
    
    try:
        data = general_utils.safeload(argsdict['EMAIL'])

        if data:
            passcorrect, passishash = check_password(data['password'], argsdict['password']) 
            
            if passcorrect:
                if '__id' not in data:
                    data['__id'] = generate_fake_id()
                data['lastlogin'] = datetime.datetime.now().timestamp()
                
                if not passishash:
                    logging.info(f"{data['EMAIL']} password to be hashed since not hashed previously.")
                    data['password'] = sha256_crypt.hash(data['password'])
                
                data.pop('_id', None)
                general_utils.safeupdate(data, argsdict['EMAIL'])
                
                logging.info(f"{data['EMAIL']} logged in successfully to the main gate.")
                # if 'confirmedaccount' not in data:
                    # chats_utils.send_email(
                    #     sending_email="noreply@expatelitesingles.com", 
                    #     recieving_emails=[data["EMAIL"]],
                    #     subject="Account Verification",
                    #     html=True,
                    #     message=f"""
                    #         <p>Hey {data['fullname1']}, we see you've logged into your account but we've also noticed that your email isn't yet verified. Please click <a href="https://expatelitesingles.com/api/verification/{generate_fake_id(8)}/{general_utils.encode_base64(data["EMAIL"])}">here</a> in order to verify your account.
                    #     """ 
                    #     )
                return {"responsecode":200}
            else:
                logging.info(f"{data['EMAIL']} log in failed.")
                print('Passwords werent matching, main gate.')
                return {"responsecode": 403}

        else:
            logging.info(f'Invalid user {argsdict["EMAIL"]} login, main gate.')
            return {"responsecode": 404}

    except:
        logging.error(traceback.format_exc())
        with open(storage + '/errors.log', 'a') as file:
            data = traceback.format_exc() + '\n'
            file.write(data)
        return {"responsecode": 500}

@general_blueprint.route('/api/googleauth', methods=['POST'])
def googleauthenticar():
    argsdict = dict(request.form)
    email = argsdict['email'].lower().strip().replace(' ','')
    
    try:
        if general_utils.checkexistance(email) and argsdict['email_verified'] == "true":
            return {'responsecode':200}
        else:
            return {'responsecode': 404}
    except:
        logging.error(traceback.format_exc())
        with open(storage + '/errors.log', 'a') as file:
            data = traceback.format_exc() + '\n'
            file.write(data)
        return {"responsecode": 500}

@general_blueprint.route('/api/store_data', methods=['POST'])
def le_storage():
    # in: EMAIL str, fullname1 str
    # out: responsecode int
    if request.form:
        argsdict = dict(request.form)
    else:
        argsdict = dict(request.get_json())
    
    argsdict['__id'] = generate_fake_id()

    email = argsdict['EMAIL'].lower().rstrip()
    fullname = argsdict['fullname1'].lower().rstrip()

    argsdict['fullname1'] = fullname
    argsdict['EMAIL'] = email
    
    argsdict['timestamp'] = datetime.datetime.now().timestamp()
    
    general_utils.safeupdate(argsdict, email, purgatory=True)
    return {'responsecode':200}

@general_blueprint.route('/api/edit_data', methods=['POST'])
def edit_profile():
    # in: EMAIL str
    # out: responsecode int
    logging.info(f"Url: /api/edit_data accessed.")
    if request.form:
        argsdict = dict(request.form)
    else:
        argsdict = dict(request.get_json())
    
    general_utils.safeupdate(argsdict, argsdict['EMAIL'])

    return {'responsecode':200}

@general_blueprint.route('/api/getprofile/<id>', methods=['POST'])
def get_profile_info(id):
    # in: from url id str
    # out: responsecode int, data dict
    EMAIL = general_utils.decode_base64(id)
    data = general_utils.safeload(EMAIL)
    return {'responsecode':200, 'data':data}


@general_blueprint.route('/api/verification/<randomlonggibberish>/<id>', methods=['GET'])
def email_verification_api_endpoint(randomlonggibberish, id):
    # in from url randomlonggibberish str, id str
    # out redirect
    EMAIL = general_utils.decode_base64(id)

    file_pth = data_locale+EMAIL+'.json'
    if not os.path.exists(file_pth):
        return redirect('/verificationfailed')
    else:
        data = general_utils.safejsonloads(file_pth)
        data['confirmedaccount'] = True 
        general_utils.safeupdate(data,EMAIL)
        return redirect('/verificationsuccessful')

@general_blueprint.route('/sirri_api/store_data', methods=['POST'])
def le_storage_sirri():
    # in: fullname1 
    # out: responsecode int
    if request.form:
        argsdict = dict(request.form)
    else:
        argsdict = dict(request.get_json())
    
    argsdict['__id'] = generate_fake_id()
    argsdict['fullname1'] = argsdict['fullname1'].rstrip()
    
    fullname = argsdict['fullname1']
    
    argsdict['timestamp'] = datetime.datetime.now().timestamp()
    general_utils.safeupdate(argsdict, fullname, purgatory=False)
    return {'responsecode':200}

@general_blueprint.route('/sirri_api/get_men', methods=['GET', "POST"])
def sirri_retrieve_men():
    # in: null
    # out: responsecode int, acc list[dict]
    men = [general_utils.safejsonloads(x) for x in general_utils.get_all_men()]
    random.shuffle(men)
    return {'responsecode':200, 'acc':men}

@general_blueprint.route('/sirri_api/get_men_normal', methods=['GET', "POST"])
def sirri_retrieve_men_ordered():
    # in: null
    # out: responsecode int, acc list[dict]
    men = [general_utils.safejsonloads(x) for x in sorted(general_utils.get_all_men(), key=lambda x: os.path.getctime(x), reverse=True)]
    return {'responsecode':200, 'acc':men}

@general_blueprint.route('/sirri_api/get_men_messaging', methods=['GET', "POST"])
def sirri_retrieve_men_messaging():
    # in: null
    # out: responsecode int, acc list[dict]
    def add_chat_info(item):
        item["thechats"] = len(general_utils.get_all_chats_by_id_men(item['fullname1']))
        return item 
    
    men = [general_utils.safejsonloads(x) for x in sorted(general_utils.get_all_men(), key=lambda x: os.path.getctime(x), reverse=True)]
    men = [add_chat_info(item) for item in men if item]

    return {'responsecode':200, 'acc':men}

@general_blueprint.route('/sirri_api/get_purgatory', methods=['GET', "POST"])
def sirri_retrieve_purgatory():
    # in: null
    # out: responsecode int, acc list[dict]
    nonactivatedwomen = [general_utils.safejsonloads(x) for x in general_utils.get_all_women(purgatory=True)]
    return {'responsecode':200, 'acc':nonactivatedwomen}

@general_blueprint.route('/sirri_api/activate/<email>', methods=['GET', "POST"])
def sirri_activate_purgatory(email):
    logging.info(f"Url: /sirri_api/activate/{email} accessed.")
    # in: email str from url
    # out: responsecode int, matches list[dict], enough bool
    def get_next_package(package):
        all_packages = general_utils.all_packages
        samepackage = package
        packageindex = all_packages.index(samepackage)
        
        if packageindex >= 4:
            uppackage1 = "Emerald"
            uppackage2 = "Emerald"
            return [samepackage, uppackage1, uppackage2]
        else:
            uppackage1 = all_packages[all_packages.index(samepackage)+1]
            uppackage2 = all_packages[all_packages.index(samepackage)+2]
            return [samepackage, uppackage1, uppackage2]
        
    pth = purgatory_locale + email + '.json'
    shutil.move(pth, data_locale + email + ".json")

    data = general_utils.safeload(email, auth=False)
    data['confirmedaccount'] = True
    general_utils.safeupdate(data, email)
    
    minage = data['minage1']
    maxage = data['maxage1']
    
    country = data['country1']
    
    package = data['package1']
    packages = get_next_package(package)
    
    query = {
        "country1": country,
        "gender1": "Male",
        # "$or": [
        #     {"package1": packages[0]},
        #     {"package1": packages[1]}, 
        #     {"package1": packages[2]} 
        # ],
        "$and": [
            {"$expr": {"$gt": [{"$convert": {"input": "$age1", "to": "int", "onError": None, "onNull": None}}, float(minage)]}},
            {"$expr": {"$lt": [{"$convert": {"input": "$age1", "to": "int", "onError": None, "onNull": None}}, float(maxage)]}},
            {"$expr": {"$ne": [{"$convert": {"input": "$age1", "to": "int", "onError": None, "onNull": None}}, None]}}
        ]
    }

    matches = general_utils.get_all_men_db(query)
    if len(matches) >= 3:
        return {"enough": True, "matches":matches, "responsecode":200}
    else:
        return {"enough": False, "matches":matches, "responsecode":200}

@general_blueprint.route('/api/get_men', methods=['GET', "POST"])
def retrieve_men():
    # in: null
    # out: responsecode int, acc list[dict]
    men = [general_utils.safejsonloads(x) for x in general_utils.get_all_men()]
    return {'responsecode':200, 'acc':men}

@general_blueprint.route('/sirri_api/get_women', methods=['GET', 'POST'])
def retrieve_women():
    # in: null
    # out: responsecode int, acc list[dict]
    men = [general_utils.safejsonloads(x) for x in general_utils.get_all_women()]
    return {'responsecode':200, 'acc':men}

@general_blueprint.route('/sirri_api/change_package', methods=['GET', 'POST'])
def package_change():
    # in: package str. EMAIL str
    # out: responsecode int
    logging.info(f"Url: /sirri_api/change_package accessed")
    data = general_utils.safeload(request.values['EMAIL'])
    data['package1'] = request.values['package']
    data.pop('_id', None)
    general_utils.safeupdate(data, request.values['EMAIL'])
    return {'responsecode':200}

@general_blueprint.route('/sirri_api/archive_via_email', methods=['GET', 'POST'])
def account_archival():
    # in: EMAIL str
    # out: responsecode int
    logging.info(f"Url: /sirri_api/archive_via_email accessed")
    
    pth = data_locale + request.values['EMAIL'] + '.json'
    purg_pth = hidden_purgatory_locale + request.values['EMAIL'] + '.json'
    
    shutil.move(pth,purg_pth)
    general_utils.saferemove(request.values['EMAIL'])
    
    return {'responsecode':200}

@general_blueprint.route('/sirri_api/archive_via_name', methods=['GET', 'POST'])
def man_deletal():
    # in: fullname str
    # out: responsecode int
    logging.info(f"Url: /sirri_api/archive_via_name accessed")
    
    pth = data_locale + request.values['EMAIL'] + '.json'
    os.remove(pth)
    general_utils.saferemove(request.values['EMAIL'])
    
    return {'responsecode':200}

@general_blueprint.route('/api/reset_notifications/<email>', methods=['GET', 'POST'])
def notifications(email):
    # in: null
    # out: responsecode int
    data = general_utils.safeload(email)
    data.pop("_id")
    data['notifications'] = []
    
    general_utils.safeupdate(data, email)
    return {'responsecode':200}