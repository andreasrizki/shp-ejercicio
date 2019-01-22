# Stage 1
FROM node:8 as react-build

WORKDIR /app
ARG ORIGIN
RUN git clone https://github.com/andreasrizki/shp-ejercicio.git
RUN cd /app/shp-ejercicio && git checkout "${ORIGIN}"

WORKDIR /app/shp-ejercicio
RUN npm install
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY --from=react-build /app/shp-ejercicio/build /usr/share/nginx/html
COPY --from=react-build /app/shp-ejercicio/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]