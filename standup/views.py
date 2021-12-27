from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
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

@ensure_csrf_cookie
def standUp(request):
    if request.method == "POST":
        return saveStandUp(request)

def saveStandUp(request):
    print(request)
    return JsonResponse({ "success": True })
