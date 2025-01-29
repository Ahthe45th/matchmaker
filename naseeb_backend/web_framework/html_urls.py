#!/usr/bin/python3
import traceback
import logging
import string    
import random # define the random module   

import RAHIB.UTILS.storage.Location as Location

from flask import Blueprint, render_template

log_pth = Location.general_storage() + '/record.log'
logging.basicConfig(filename=log_pth, level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")

storage = Location.general_storage()
data_locale = Location.general_storage() + '/nikahmubasit/'
purgatory_locale = Location.general_storage() + '/purgatory/'
hidden_purgatory_locale = Location.general_storage() + '/hiddenpurgatory/'
halaallove = Location.Halaallove()
chats_data_locale = Location.general_storage() + '/nikahmubasit_chats/'

htmlurls_blueprint = Blueprint('htmlurls_blueprint', __name__)

def generate_string(num):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k = num))  

@htmlurls_blueprint.route('/login', methods=['GET'])
def generallogin():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/terms', methods=['GET'])
def terms_after_signup():
    return render_template('terms_after_signup.html')

@htmlurls_blueprint.route('/sirri_api/chatasman/<email>', methods=['GET'])
def sirripageforspecificchatasman(email):
    logging.info(f"Url: /sirri_api/chatasman/{email} accessed")
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/html/signup.html', methods=['GET'])
def generalsignup():
    return render_template('signup.html')

@htmlurls_blueprint.route('/html/password_wrong.html', methods=['GET'])
def passwrong():
    return render_template('password_wrong.html')

@htmlurls_blueprint.route('/html/signup_form.html', methods=['GET'])
def accsignupform():
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="Sign up", footervisibility="hide")

@htmlurls_blueprint.route('/registrationsuccess', methods=['GET'])
def registrationsuccess():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/editssuccessful', methods=['GET'])
def editedsuccess():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/sirri_api/womeninfo', methods=['GET'])
def womeninfo():
    logging.info(f"Url: /sirri_api/womeninfo accessed")
    return render_template('generalpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="INFO", footervisibility="hide")

@htmlurls_blueprint.route('/sirri_api/mensignup.html', methods=['GET'])
def mensignupform():
    logging.info(f"Url: /sirri_api/mensignup.html accessed.")
    return render_template('generalpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="Men Sign Up", footervisibility="hide")

@htmlurls_blueprint.route('/', methods=['GET'])
def mainindex2():
    return render_template('wrongindexpage.html')

@htmlurls_blueprint.route('/faq', methods=['GET'])
def generalfaq():
    return render_template('barepage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="FAQs", footervisibility="hide")

@htmlurls_blueprint.route('/sirri_api/activations', methods=['GET'])
def womens_activations():
    logging.info(f"Url: /sirri_api/activations accessed.")
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="FAQs", footervisibility="hide")

@htmlurls_blueprint.route('/loginplease', methods=['GET'])
def loginplease():
    return render_template('barepage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="FAQs", footervisibility="hide")

@htmlurls_blueprint.route('/profile/<id>', methods=['GET'])
def generalprofile(id):
    try:
        return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", footervisibility="hide")
    except:
        logging.info(f"{traceback.format_exc()}")

@htmlurls_blueprint.route('/myprofile/<id>', methods=['GET'])
def generalpersonalprofile(id):
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", footervisibility="hide")

@htmlurls_blueprint.route('/html/authcode.html', methods=['GET'])
def authcode():
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="Enter Your Authorization Code", footervisibility="hide")

@htmlurls_blueprint.route('/alltestimonials', methods=['GET'])
def generaltestimonials():
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="Testimonials", footervisibility="hide")

@htmlurls_blueprint.route('/howitworks', methods=['GET'])
def generalhowitworks():
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="How It Works", footervisibility="hide")

@htmlurls_blueprint.route('/howitworks/<item>', methods=['GET'])
def specifichowitworks(item):
    return render_template('barestpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="How It Works", footervisibility="hide")

@htmlurls_blueprint.route('/men', methods=['GET'])
def generalmens():
    return render_template('generalpage.html', jspath=f"/assets/js/bundle.js?id={generate_string(5)}", pagetitle="Men", footervisibility="hide")

@htmlurls_blueprint.route('/sirri_api/chats', methods=['GET'])
def sirripageforchats():
    logging.info(f"Url: /sirri_api/chats accessed.")
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/resetpassword/<email>', methods=['GET'])
def resetpassword(email):
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/forgottenpassword', methods=['GET'])
def forgottenpassword():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/forgottenpasswordsubmitted', methods=['GET'])
def forgottenpasswordsubmitted():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/resetpasswordsuccess', methods=['GET'])
def resetpasswordsuccessful():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/mensdashboard', methods=['GET'])
def mensdashboard():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/sirri_api/chats/<email>', methods=['GET'])
def sirripageforspecificchat(email):
    logging.info(f"Url: /sirri_api/chats/{email} accessed.")
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/verificationfailed', methods=['GET'])
def verificationfailed():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/verificationsuccessful', methods=['GET'])
def verificationsuccessful():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/recaptcha', methods=['GET'])
def recaptchatest():
    return render_template('barestpage.html')

@htmlurls_blueprint.route('/sirri_api/perfil_generador', methods=['GET'])
def perfil_generador():
    return render_template('barestpage.html')