#!/usr/bin/python3
from halaallove.web_framework.app_setup import setitup

def runapp():
    app = setitup()
    app.logger.debug("debug log info")
    app.logger.info("Info log information")
    app.logger.warning("Warning log info")
    app.logger.error("Error log info")
    app.logger.critical("Critical log info")
    app.run(host='0.0.0.0', port=30300, debug=True, threaded=True)

if __name__ == '__main__':
    runapp()
