from quay.io/keycloak/keycloak 

#http (endpoints)
EXPOSE 8080 
#https (admin e prod)
EXPOSE 8443
#Health checks, Metrics, Management (em alguns setups)
EXPOSE 9000
#Cache embedded 
EXPOSE 7800

#roda sem parar em background
CMD ["bash", "-c", "tail -f /dev/null"]

