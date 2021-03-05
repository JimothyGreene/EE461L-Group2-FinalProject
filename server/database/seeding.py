from database.models import db, User


def seed():
    User(email='test@test.com', password='testPW').save()
    User(email='admin@admin.com', password='adminPW').save()
