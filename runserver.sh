#!/bin/bash
pip install -r requirements.txt
npm --prefix ./js/ install
npm --prefix ./js/ run build
mv ./js/build ./build
python manage.py runserver