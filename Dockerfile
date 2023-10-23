FROM node:20.2.0-alpine3.18
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:app package*.json ./
ENV PORT=3002
RUN npm install
COPY --chown=app:app . .


EXPOSE 3002 

CMD ["npm", "start"]