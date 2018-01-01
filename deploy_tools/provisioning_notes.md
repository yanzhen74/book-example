config new website
============

## requirement:

* nginx
* python 3
* Git
* pip
* virtualenv
* supervisor

In ubuntu for example, to install as such:

    sudo apt-get install nginx git python3 python3-pip
    sudo pip3 install virtualenv

## config nginx virtual host

* ref nginx.template.conf
* replace 'SITENAME' to your domain name, such as 192.168.1.7

## supervisor task

* ref gunicorn-supervisor.template.conf
* replace 'SITENAME' to your domain name, such as 192.168.1.7

## directory structure:

assume user count, home directory is /home/oliver

/home/oliver
 |_____sites
       |______SITENAME
              |------database
              |------source
              |------static
              |______virtualenv

## Systemd service

* see gunicorn-supervisor.template.conf
* replace SITENAME with, e.g., 192.168.1.6
* replace SERIT with email password