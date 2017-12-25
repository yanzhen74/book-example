from django.conf.urls import url
from django.contrib import admin
import accounts.views

urlpatterns = [
    url(r'^login', accounts.views.login, name='login'),
    url(r'^send_login_email$', accounts.views.send_login_email, name='send_login_email'),
]
