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

ENV MONGODB_DATABASE=ee461l_mongodb
ENV MONGODB_USERNAME=admin
ENV MONGODB_PASSWORD=password
ENV MONGODB_HOST=ee461l_mongodb

# Expose port
EXPOSE 5000

CMD [ "flask", "run", "--host=0.0.0.0" ]