from email_validator import validate_email, EmailNotValidError

def valid_email(email):
    """Checks if an email is valid

    Args:
        email (str): user's email address

    Returns:
        (True, email): normalized email if it is valid
        (False, error): error message if it is invalid
    """
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as e:
        return (False, str(e))

    return (True, email)

def valid_password(password):
    """Checks if a password is valid

    Args:
        password (string): user's password

    Returns:
        (True, password): password if it is valid
        (False, error): error message if it is invalid
    """

    # Is at least 8 characters long
    if len(password) < 8:
        return (False, 'The password is not valid. It must have at least 8 characters.')
    # Contains a number
    if not any(c.isdigit() for c in password):
        return (False, 'The password is not valid. It must contains at least 1 number.')
    # Contains an uppercase character
    if not any(c.isupper() for c in password):
        return (False, 'The password is not valid. It must contains at least 1 uppercase character.')
    # Contains a lowercase character
    if not any(c.islower() for c in password):
        return (False, 'The password is not valid. It must contains at least 1 lowercase character.')

    return (True, password)