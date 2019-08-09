from flask import current_app, render_template
from flask_mail import Message
from src import mail


def send_reset_email(user):
    token = user.generate_token(user.id).decode("utf-8")
    reset_url = f'''localhost:3000/reset-password/{token}'''
    msg = Message('Password Reset Request',
                  sender=current_app.config.get('MAIL_USERNAME'),
                  recipients=[user.email])
    msg.html = render_template('reset.html', link=reset_url)

    mail.send(msg)


# def send_access_granted_email():
#
#     msg = Message('Password Reset Request',
#                   sender=current_app.config.get('MAIL_USERNAME'),
#                   recipients=[user.email])
#     msg.html = render_template('reset.html', link=reset_url)
#
#     mail.send(msg)