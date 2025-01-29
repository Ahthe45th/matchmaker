import smtplib

from email.mime.text import MIMEText

from_addr = 'news@expatbachelors.com'
to_addrs = ['abdulbossdude@gmail.com']

msg = """
From: news@expatbachelors.com
To: abdulbossdude@gmail.com
Subject: This is the message subject
This is the message body.
"""

msg_content = open('/home/mehmet/Downloads/beefree-2dewmrevr5a.html').read()
msg = MIMEText(msg_content, 'html')

msg['From'] = 'news@expatbachelors.com'
msg['To'] = 'abdulbossdude@gmail.com'
msg['Subject'] = 'simple email in python'


mailserver = smtplib.SMTP('mail.expatbachelors.com', 587)
# identify ourselves to smtp gmail client
mailserver.ehlo()
# secure our email with tls encryption
mailserver.starttls()
# re-identify ourselves as an encrypted connection
mailserver.ehlo()
mailserver.login('news@expatbachelors.com', 'bossman12309')

mailserver.sendmail('news@expatbachelors.com','abdulbossdude@gmail.com',msg.as_string())

mailserver.quit()
