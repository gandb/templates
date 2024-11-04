# specify the node base image with your desired version node:<version>
FROM common-nodejs

# Create app directory
WORKDIR /BOOTAPP

# Install app dependencies
COPY . .
RUN npm install

#install sync 

# Add crontab file in the cron directory
ADD docker/sync-cron  /etc/cron.d/sync-cron 

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/sync-cron 

# Apply cron job
RUN crontab /etc/cron.d/sync-cron 

# Create the log file to be able to run tail
RUN touch /var/log/cron.log 
RUN touch /var/log/cronrunner.log  

# replace this with your application's default port
EXPOSE 8080

ENV TZ America/Sao_Paulo

CMD /BOOTAPP/docker/init.sh
