import os
import json
import datetime
import logging
import traceback 

import RAHIB.UTILS.storage.Location as Location
import mailtrap as mt
from mailjet_rest import Client

logging.basicConfig(filename=Location.general_storage() + '/record.log', level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
timeout_locale = Location.general_storage() + '/nikahmubasit_chats_purg/'

halaallove = '/var/www/lovehalaal/'

"""
This call sends a message to the given recipient with vars and custom vars.
"""
import os

def name_to_acronym(name):
    # Split the name into words
    words = name.split()
    
    # Take the first letter of each word, convert to uppercase, and join them
    acronym = ''.join([word[0].upper() for word in words])
    
    return acronym

packagelimits = {
    "Bronze": 1,
    "Silver": 3,
    "Gold": 7,
    "Platinum": 15,
    "Diamond": 250000,
    "Emerald": 260000
}

def email_builder(title, message):
    email = f'''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Basic CSS for styling */
                body []
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                ||
                .email-container []
                    background-color: #ffffff;
                    width: 80%;
                    margin: auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                ||
                .header []
                    background: linear-gradient(to right,#ffee58, #d81b60);
                    padding: 10px;
                    color: #ffffff;
                    text-align: center;
                    border-radius: 8px 8px 0 0;
                ||
                .content []
                    padding: 10px;
                    color: #333333;
                ||
                .footer []
                    text-align: center;
                    font-size: 12px;
                    color: #777777;
                    margin-top: 20px;
                ||
                .btn []
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
                    background-color: #000000;
                    margin-top: 20px;
                    padding: 10px;
                ||
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>{title}</h1>
                </div>
                <div class="content">
                    {message}
                </div>
                <div class="footer">
                    <p>© 2017 Expat Elite Singles. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    '''
    email = email.replace('[]', '{')
    email = email.replace('||', '}')
    return email

def check_package(package):
    logging.info(f"The package: {package}")
    packages = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Emerald"]
    theindex = packages.index(package)
    allowed_packages = packages[:theindex+1]

    logging.info(f"{allowed_packages}")
    return allowed_packages

def send_email(sending_email, recieving_emails, subject, message, html=False):
    api_key = '51aad30f5c9bf2ed14146bae32bbbd4e'
    api_secret = 'd2753f205b178036506c0b2c0f4a6964'
    mailjet = Client(auth=(api_key, api_secret))
    
    data = {
        'FromEmail': sending_email,
        'FromName': 'Expat Elite Singles',
        'Subject': subject,
        'Text-part': 'Dear passenger, welcome to Mailjet! May the delivery force be with you!',
        'Html-part': email_builder(subject, message),
        'Recipients': [{'Email': x} for x in recieving_emails]
    }
    result = mailjet.send.create(data=data)
    logging.info(f"Result from mailjet send: {result.status_code}")
    
    # try:
    #     if html == True:
    #         mail = mt.Mail(
    #             sender=mt.Address(email=sending_email, name="Expat Notifications"),
    #             to=[mt.Address(email=x) for x in recieving_emails],
    #             subject=subject,
    #             html=email_builder(subject,message),
    #         )

    #             # create client and send
    #         client = mt.MailtrapClient(token="ac215e606d7309e907f59b853e345447")
    #         client.send(mail)
    #     else:
    #         mail = mt.Mail(
    #             sender=mt.Address(email=sending_email, name="Expat Notifications"),
    #             to=[mt.Address(email=x) for x in recieving_emails],
    #             subject=subject,
    #             text=message,
    #         )

    #             # create client and send
    #         client = mt.MailtrapClient(token="ac215e606d7309e907f59b853e345447")
    #         client.send(mail)
    # except:
    #     logging.error(f"Couldnt send email to {recieving_emails} on subject: {subject}")
    #     logging.error(f"Traceback: {traceback.format_exc()}")

def email_notification(girls_message, girls_data, guy_name):
    import halaallove.utils.general as the_general_utils

    gurl = girls_data['fullname1']
    gurl_package = girls_data['package1']

    they = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]
    theua = ["Emerald"]
    
    if gurl_package in they:
        sendto = ["abushuriya@gmail.com"]
    elif gurl_package in theua:
        sendto = ["ahmednasirabdikadirandco@gmail.com"]
    else:
        sendto = ["jazeelakarima@gmail.com"]

    subject = f"Message notification from {gurl}!"
    text = f"""
                <p>{gurl} just sent a message to {guy_name}</p> 
                <p>she said: {girls_message}</p>
                <p>If you'd like to respond to her please click on the following link:</p>
                <a class="btn" href="https://expatelitesingles.com/sirri_api/chat/{girls_data['EMAIL']}">
                    <h2 style="width:85%;background: linear-gradient(to right,#ffee58, #d81b60);">Respond</h2>
                </a>
            """
    send_email("noreply@expatelitesingles.com", sendto, subject, text, html=True)

    girls_data['last_time_woman_messaged'] = datetime.datetime.now().timestamp()
    the_general_utils.safeupdate(girls_data, girls_data['EMAIL'])

def woman_notification(girls_data, guy_name):
    import halaallove.utils.general as the_general_utils
    
    api_key = '51aad30f5c9bf2ed14146bae32bbbd4e'
    api_secret = 'd2753f205b178036506c0b2c0f4a6964'
    
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')

    data = {
        'Messages': [
                {
                    "From": {
                        "Email": "noreply@expatelitesingles.com",
                        "Name": "Expat Notifs"
                    },
                    "To": [
                        {
                            "Email": girls_data['EMAIL'],
                            "Name": girls_data['fullname1']
                        }
                    ],
                    "TemplateID": 6446958,
                    "TemplateLanguage": True,
                    "Subject": f'[[data:firstname:"{name_to_acronym(guy_name)}"]] has sent you a message.',
                    "Variables": {
                        "confirmation_link": f'https://expatelitesingles.com/myprofile/{the_general_utils.encode_base64(girls_data["EMAIL"])}?male={the_general_utils.encode_base64(guy_name)}',
                        "Guys_Name": name_to_acronym(guy_name),
                        "defaultValue": "",
                        "isDate": False,
                        "name": "firstname",
                        "type": "data",
                        "guyprofilepic": f"https://expatelitesingles.com/profilepic/0?EMAIL={guy_name.replace(' ', '%20')}"
                        }
                }
            ]
    }
    
    logging.info(f"Felt cute, might send an email as {girls_data['EMAIL']}")
    
    current_timestamp = datetime.datetime.now().timestamp()

    if 'notifications' in girls_data:
        if isinstance(girls_data['notifications'], str):
            logging.info(f"{girls_data['EMAIL']} has json notifications.")
            girls_data['notifications'] = [
                {'timestamp': current_timestamp, 'text': f"{name_to_acronym(guy_name)} sent you a message."}
            ]
        else:
            girls_data['notifications'].append({'timestamp':current_timestamp, 'text': f"{name_to_acronym(guy_name)} sent you a message."})
    else: 
        girls_data['notifications'] = [
            {'timestamp':datetime.datetime.now().timestamp(), 'text': f"{name_to_acronym(guy_name)} sent you a message."}
        ]
    
    girls_data['last_messaged_timestamp'] = current_timestamp
    the_general_utils.safeupdate(girls_data, girls_data['EMAIL'])

    subject = f"{name_to_acronym(guy_name)} sent you a message."
    text = f"""
                <p>If you'd like to respond to him please click on the following link:</p>
                <a style="" href="https://expatelitesingles.com/myprofile/{the_general_utils.encode_base64(girls_data['EMAIL'])}?male={the_general_utils.encode_base64(guy_name)}">
                    <h2 style="width:100%;background: linear-gradient(to right,#ffee58, #d81b60);padding: 20px;">RESPOND</h2>
                </a>
            """
    
    previous_message_sent_pth = timeout_locale + '/' + girls_data["EMAIL"] + guy_name + '.json'
    previous_message_sent_exists = os.path.exists(previous_message_sent_pth)

    if previous_message_sent_exists:
        last_modified = os.path.getmtime(previous_message_sent_pth)
        
        diff = current_timestamp - last_modified
        diff = diff / 3600
        
        if diff >= 3:
            logging.info(f"Sending email to: {girls_data['EMAIL']} about {guy_name}, difference in time: {diff}.")
            result = mailjet.send.create(data=data)
            logging.info(f"The email result: {result.status_code}")
            with open(previous_message_sent_pth, 'w') as file:
                file.write(f'{current_timestamp}')
        else:
            logging.info(f"Not sending email to: {girls_data['EMAIL']} about {guy_name}, difference in time: {diff}.")
    else:
        logging.info(f"Sending email to: {girls_data['EMAIL']} about {guy_name}, no previous convo between her and the guy.")
        result = mailjet.send.create(data=data)
        logging.info(f"The email result: {result.status_code}")
        with open(previous_message_sent_pth, 'w') as file:
            file.write(f'{current_timestamp}')

chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'
general_data_locale = Location.general_storage() + '/nikahmubasit/'
chats_data_locale_purg = Location.general_storage() + '/nikahmubasit_chats_purg'

def save_chat_pth(pth, data):
    with open(pth, 'w') as target:
        chat_data = json.dumps(data, indent=2)
        target.write(chat_data)

def get_womans_file(data):
    import halaallove.utils.general as the_general_utils
    if data['ip']:
        female_data_locale = [x for x in the_general_utils.get_all_women() if '__id' in the_general_utils.safejsonloads(x)]
        female_data_locale = [x for x in female_data_locale if data['ip'] == the_general_utils.safejsonloads(x)['__id']][-1]
        return the_general_utils.safejsonloads(female_data_locale)
    else:
        female_data_locale = [x for x in the_general_utils.get_all_women() if 'useremail' not in the_general_utils.safejsonloads(x)]
        female_data_locale = [x for x in female_data_locale if data['womanname'] == the_general_utils.safejsonloads(x)['fullname1']][-1]
        return the_general_utils.safejsonloads(female_data_locale)

def chats_metadata(data, chat):
    import halaallove.utils.general as the_general_utils
    chat['girl_url'] = f"https://expatelitesingles.com/profile/{data['EMAIL']}"
    chat['guys_url'] = f"https://expatelitesingles.com/profile/{chat['male']}"

    thedata = the_general_utils.safejsonloads(data_locale + '/' + chat['male'] + '.json')
    if thedata:
        chat['guys_package'] = thedata['MANS_PACKAGE']
        if 'Girl Sent' in chat['messages'][-1]:
            chat['new_msg'] = True
        else:
            chat['new_msg'] = False
        return chat

def get_data(file, period=86400*10, begin_timestamp=None):
    import halaallove.utils.general as the_general_utils
    data = the_general_utils.safejsonloads(file)

    if not begin_timestamp:
        if period == 86400*10:
            herchats = the_general_utils.get_all_chats_by_id(data['__id'])
            chats_datas = [chats_metadata(data, x) for x in the_general_utils.chats_for_ten_days(herchats)]
            chats_datas = [x for x in chats_datas if x]
        else:
            herchats = the_general_utils.get_all_chats_by_id(data['__id'])
            chats_datas = [chats_metadata(data, x) for x in the_general_utils.chats_for_specified_amount_of_time(herchats, 86400*60)]
            chats_datas = [x for x in chats_datas if x]
    else:
        herchats = the_general_utils.get_all_chats_by_id(data['__id'])
        chats_datas = [chats_metadata(data, x) for x in the_general_utils.chats_from_timestamp(herchats, begin_timestamp)]
        chats_datas = [x for x in chats_datas if x]

    if chats_datas:
        new_messages_girls = len([x for x in chats_datas if x['new_msg']])
        all_data = {'data':data, 'chats':chats_datas, 'lenchats':len(chats_datas), 'new_messages_girls':new_messages_girls, 'in':True}
        return all_data
    else:
        new_messages_girls = len([x for x in chats_datas if x['new_msg']])
        all_data = {'data':data, 'chats':chats_datas, 'lenchats':len(chats_datas), 'new_messages_girls':new_messages_girls, 'in':False}
        return all_data

def sync_chats_non_prohibitive(data):
    # ran when a man messages
    import halaallove.utils.general as the_general_utils
    
    logging.info(f"Loading profile of {data['name']}")
    male_profile = the_general_utils.safeload(data['name'])

    profile_pic = f"https://expatelitesingles.com/profilepic/1?EMAIL={male_profile['fullname1'].replace(' ','%20')}"
    male_name = data['name']

    female_data = get_womans_file(data)

    female_profile_pic = f"https://expatelitesingles.com/profilepic/1?EMAIL={female_data['EMAIL']}"

    female_name = female_data['fullname1']

    chat_name = f'{female_name}-{male_name}.{female_data["__id"]}.json'

    if not os.path.exists(chats_data_locale + '/' + chat_name):
        if 'womanname' in data:
            woman_notification(female_data, male_name)
            chat_data = {
                        'messages':[{'Guy Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}}],
                        'guys_pic':profile_pic,'male':male_name,
                        'female':female_data['fullname1'],'girl_pic':female_profile_pic
                        }
            save_chat_pth(chats_data_locale + '/' + chat_name, chat_data)
            return {'responsecode':200}
        else:
            email_notification(data['message'], female_data, data['name'])
            chat_data = {
                        'messages':[{'Girl Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}}],
                        'guys_pic':profile_pic,'male':male_name,
                        'female':female_data['fullname1'],'girl_pic':female_profile_pic
                        }
            save_chat_pth(chats_data_locale + '/' + chat_name, chat_data)
            return {'responsecode':200}
    else:
        print(chat_name)
        chat_data = open(chats_data_locale + '/' + chat_name).read()
        chat_data = json.loads(chat_data)
        chat_data['guys_pic'] = profile_pic
        chat_data['male'] = male_name
        chat_data['female'] = female_name
        chat_data['girl_pic'] = female_profile_pic
        chat_data['girl_url'] = '/profiles/' + female_profile_pic.split('/')[-2].split('/')[-1] + '.html'
        chat_data['guys_url'] = '/profiles/' + profile_pic.split('/')[-2].split('/')[-1] + '.html'
        if 'womanname' in data:
            woman_notification(female_data, male_profile['fullname1'])
            chat_data['messages'].append({'Guy Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}})
        else:
            email_notification(data['message'], female_data, data['name'])
            chat_data['messages'].append({'Girl Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}})

        save_chat_pth(chats_data_locale + '/' + chat_name, chat_data)
        return {'responsecode':200}
    
def sync_chats_packages_prohibitive(data):
    def check_chat(pth):
        chat_data = open(pth).read()
        chat_data = json.loads(chat_data)

        if "Guy Sent" not in chat_data['messages'][0]:
            return True 
        else:
            # shesresponded = [x for x in chat_data['messages'] if "Girl Sent" in x]
            # if shesresponded:
            #     return True 
            # else: 
            return False 
            
    # Recently updated, this is the function used when a woman wants to send a message to a guy.
    import halaallove.utils.general as the_general_utils
    
    logging.info(f"Loading profile:")
    logging.info(json.dumps(json.loads(data['woman'])))

    try:
        female_data = the_general_utils.safeload(json.loads(data['woman'])['EMAIL'])
        numofchats = len([lilpth for lilpth in the_general_utils.get_all_chats_by_id(female_data['__id']) if check_chat(lilpth)])

        male_name = data['name']
        female_name = female_data['fullname1']
        chat_name = f'{female_name}-{male_name}.{female_data["__id"]}.json' 
        fullchatpth = chats_data_locale + '/' + chat_name
        
        male_profile = general_data_locale + data['name'].rstrip() + ".json"
        male_profile = the_general_utils.safejsonloads(male_profile)

        profile_pic = f"https://expatelitesingles.com/profilepic/1?EMAIL={male_profile['fullname1'].replace(' ','%20')}"

        female_profile_pic = f"https://expatelitesingles.com/profilepic/1?EMAIL={female_data['EMAIL']}"
        
        allowed_packages = check_package(female_data['package1'])

        logging.info(f"{female_data['EMAIL']} is on {female_data['package1']} and has a limit of {packagelimits[female_data['package1']]}. She's messaged {numofchats}. Her id: {female_data['__id']}")

        if numofchats < packagelimits[female_data['package1']]:            
            logging.info(f"{female_name}:{female_data['EMAIL']} is on {female_data['package1']} and has the option to message people on {allowed_packages}. The man is on {male_profile['package1']}.")
            if male_profile['package1'] in allowed_packages:
                if not os.path.exists(fullchatpth):
                    if 'womanname' in data:
                        woman_notification(female_data, male_profile['fullname1'])
                        chat_data = {
                                    'messages':[{'Guy Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}}],
                                    'guys_pic':profile_pic,'male':male_name,
                                    'female':female_data['fullname1'],'girl_pic':female_profile_pic
                                    }
                        save_chat_pth(fullchatpth, chat_data)
                        return {'response':'ok'}
                    else:
                        email_notification(data['message'], female_data, data['name'])
                        chat_data = {
                                    'messages':[{'Girl Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}}],
                                    'guys_pic':profile_pic,'male':male_name,
                                    'female':female_data['fullname1'],'girl_pic':female_profile_pic
                                    }
                        save_chat_pth(chats_data_locale + '/' + chat_name, chat_data)
                        return {'responsecode':200}
                else:
                    chat_data = open(fullchatpth).read()
                    chat_data = json.loads(chat_data)
                    chat_data['guys_pic'] = profile_pic
                    chat_data['male'] = male_name
                    chat_data['female'] = female_name
                    chat_data['girl_pic'] = female_profile_pic
                    if 'womanname' in data:
                        woman_notification(female_data, male_profile['fullname1'])
                        chat_data['messages'].append({'Guy Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}})
                    else:
                        email_notification(data['message'], female_data, data['name'])
                        chat_data['messages'].append({'Girl Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}})

                    save_chat_pth(fullchatpth, chat_data)
                    return {'responsecode':200}
            else:
                return {"responsecode": 602}
        else:
            if not os.path.exists(fullchatpth):
                return {"responsecode":403}
            else:
                chat_data = open(fullchatpth).read()
                chat_data = json.loads(chat_data)

                logging.info(f"Checking the packages are okay.")
                if male_profile['package1'] in allowed_packages:
                    logging.info(f"Checking whether it is the man or woman who attempted to start a convo between {female_name} and {male_name}.")
                    if "Guy Sent" not in chat_data['messages'][0]:
                        logging.info(f"{female_name}, she started it.")
                        chat_data['guys_pic'] = profile_pic
                        chat_data['male'] = male_name
                        chat_data['female'] = female_name
                        chat_data['girl_pic'] = female_profile_pic
                        if 'womanname' in data:
                            woman_notification(female_data, male_profile['fullname1'])
                            chat_data['messages'].append({'Guy Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}})
                        else:
                            email_notification(data['message'], female_data, data['name'])
                            chat_data['messages'].append({'Girl Sent' : {'message':data['message'], 'time': datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}})

                        save_chat_pth(fullchatpth, chat_data)
                        return {'responsecode':200}
                    else:
                        logging.info(f"{male_name}, he started it. Preventing her from sending the message")
                        return {"responsecode":602}
                else:
                    logging.info(f"The packages are not okay.")
                    return {"responsecode": 602}
    except:
        logging.error(f'Error in sending msg: {traceback.format_exc()}')
        return {'responsecode':500}