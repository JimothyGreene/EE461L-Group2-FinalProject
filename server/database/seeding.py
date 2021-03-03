from database.models import db, User
from pymongo import MongoClient


def seed():
    testUser = User(email='test@test.com', password='testPW')
    db.users.insert_one(testUser.toDoc())
    adminUser = User(email='admin@test.com', password='adminPW')
    db.users.insert_one(adminUser.toDoc())
