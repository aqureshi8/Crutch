from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
import os
import json
import logging


# Create your views here.

index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')


def crutch(request):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')

def standUp(request):
    if request.method == "POST":
        return saveStandUp(request)

def saveStandUp(request):
    toDoList = json.loads(request.body.decode("utf-8"))
    return JsonResponse({ "success": True })
