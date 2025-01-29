#!/usr/bin/python3
import logging

import RAHIB.UTILS.storage.Location as Location

from flask import Flask, render_template, request

from halaallove.web_framework.chats import chats_blueprint
from halaallove.web_framework.profiles import profile_blueprint
from halaallove.web_framework.general_routes import general_blueprint
from halaallove.web_framework.html_urls import htmlurls_blueprint
from halaallove.web_framework.ai_integrations import ai_blueprint

logging.basicConfig(filename=Location.general_storage() + '/record.log', level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
halaallove = Location.Halaallove()
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

app = Flask('ASSASINATIONV3', template_folder=f'{halaallove}/templates')
app.secret_key = "V1"

app.config['MAX_CONTENT_LENGTH'] = 250 * 1024 * 1024

@app.errorhandler(404)
def page_not_found(error):
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js", footervisibility="hide"), 404

@app.errorhandler(500)
def page_fivehundredeorr(error):
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js", footervisibility="hide"), 500

@app.errorhandler(403)
def page_forbidden(error):
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js", footervisibility="hide"), 403

app.register_blueprint(chats_blueprint)
app.register_blueprint(profile_blueprint)
app.register_blueprint(general_blueprint) 
app.register_blueprint(htmlurls_blueprint) 
app.register_blueprint(ai_blueprint) 

@app.route('/sirri_api/allroutes', methods=['GET'])
def allroutes():
    # in: bearer_token str
    # out: responsecode int
    logging.info(f"Url: /api/edit_data accessed.")
    argsdict = dict(request.values)
    if 'bearer_token' in argsdict:
        if argsdict['bearer_token'] == "bismillah":
            output = []
            for rule in app.url_map.iter_rules():
                methods = ','.join(rule.methods)
                output.append(f"{rule.endpoint}: {rule.rule} [{methods}]")
            return {"acc":output, "responsecode": 200}
        else:
            return {'responsecode':500}    
    else:
        return {'responsecode':500}