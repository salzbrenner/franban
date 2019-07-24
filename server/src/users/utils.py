from flask import current_app, render_template
from flask_mail import Message
from src import mail


def send_reset_email(user):
    token = user.generate_token(user.id)
    reset_url = f'''localhost:3000/reset-password?t={token}'''
    msg = Message('Password Reset Request',
                  sender=current_app.config.get('MAIL_USERNAME'),
                  recipients=[user.email])
    msg.body = 'HELLOW WORL'
    msg.html = render_template('reset.html')


    mail.send(msg)
