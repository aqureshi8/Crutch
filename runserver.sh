#!/bin/bash
pip install -r requirements.txt
npm install
npm run build
python manage.py runserver