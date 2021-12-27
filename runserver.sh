#!/bin/bash
pip install -r requirements.txt
npm --prefix ./js/ install
npm --prefix ./js/ run build
rm -r ./build
mv ./js/build ./
python manage.py runserver