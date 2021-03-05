FROM python:3.6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

# Copy app source code
COPY . .

# Set Flask environment variables
ENV FLASK_APP=api
ENV FLASK_ENV=development

# Expose port
EXPOSE 5000

CMD [ "flask", "run", "--host=0.0.0.0" ]