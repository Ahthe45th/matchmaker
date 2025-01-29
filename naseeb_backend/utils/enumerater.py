import datetime

import RAHIB.UTILS.storage.Location as Location

from halaallove.utils.general import get_all_chats

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = "/var/www/lovehalaal/"
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

def get_timestamp(string):
    timestampp = datetime.datetime.strptime(string, '%d/%m/%Y %H:%M:%S')
    timestampp = timestampp.timestamp()
    return timestampp

def girls_who_be_chatting():
    today = datetime.datetime.now() # or .today()
    start = (today - datetime.timedelta(days=14)).replace(hour=0, minute=0, second=0, microsecond=0).timestamp()
    chats = get_all_chats()
    chats_ = []
    for x in chats:
        if 'Girl Sent' in x['messages'][-1]:
            if get_timestamp(x['messages'][-1]['Girl Sent']['time']) > start:
                chats_.append(x)
        else:
            if get_timestamp(x['messages'][-1]['Guy Sent']['time']) > start:
                chats_.append(x)
    chats_ = list(set([x['female'] for x in chats_]))
    return chats_
