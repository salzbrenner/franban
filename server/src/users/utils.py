from flask import current_app
from flask_mail import Message
from src import mail


def send_reset_email(user):
    token = user.generate_token(user.id)
    msg = Message('Password Reset Request',
                  sender=current_app.config.get('MAIL_USERNAME'),
                  recipients=[user.email])
    msg.body = f'''To reset your password, visit the following link:
localhost:3000/{token}
If you did not make this request then simply ignore this email and no changes will be made
'''
    mail.send(msg)