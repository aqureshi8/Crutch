from django.db import models

# Create your models here.


class User(models.Model):
    AUTHENTICATION_TYPE = (
        ("Text", "Text Message"),
        ("Email", "Email")
    )
    username = models.CharField(max_length=50)
    primary_authentication_type = models.CharField(max_length=20, choices=AUTHENTICATION_TYPE)
    secondary_authentication_type = models.CharField(max_length=20, choices=AUTHENTICATION_TYPE)
    primary_authentication = models.CharField(max_length=50)
    secondary_authentication = models.CharField(max_length=50)


class Task(models.Model):
    STATUS = (
        ("Not Started", "Not Started"),
        ("In Progress", "In Progress"),
        ("Finished", "Finished")
    )
    external_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=40)


class ToDoList(models.Model):
    external_id = models.CharField(max_length=100)
    date = models.DateField()


class ToDoListTasks(models.Model):
    to_do_list_id = models.BigIntegerField()
    task_id = models.BigIntegerField()
