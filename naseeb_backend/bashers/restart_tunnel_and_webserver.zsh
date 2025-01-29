#!/usr/bin/zsh
if pgrep -x 'webserver.py' > /dev/null
then
        echo 'Already running webserver'
else
	/home/ec2-user/halaallove/halaallove/webserver.py > ~/webserver.logs &
fi
#######################
