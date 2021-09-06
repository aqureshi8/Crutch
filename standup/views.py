from django.http import HttpResponse
from django.conf import settings
import os
import logging


# Create your views here.

index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')


def index(request):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
