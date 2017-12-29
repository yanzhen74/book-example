from fabric.api import run
from fabric.context_managers import settings


def _get_manage_dot_py(host):
    return '~/sites/%s/virtualenv/bin/python3 ~/sites/%s/source/manage.py' % (host, host,)


def reset_database(host):
    manage_dot_py = _get_manage_dot_py(host)
    with settings(host_string='oliver@%s' % (host,)):
        run('%s flush --noinput' % (manage_dot_py,))


def create_session_on_server(host, email):
    manage_dot_py = _get_manage_dot_py(host)
    with settings(host_string='oliver@%s' % (host)):
        session_key = run('%s create_session %s' % (manage_dot_py, email,))
        return session_key.strip()
