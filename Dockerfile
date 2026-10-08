# syntax=docker/dockerfile:1
# The invitation is only static files: nginx serves them under /casamento/,
# the path it has at jpsalviano.com.br.
FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css favicon.ico /usr/share/nginx/html/casamento/
COPY assets /usr/share/nginx/html/casamento/assets
COPY scripts /usr/share/nginx/html/casamento/scripts

RUN nginx -t
