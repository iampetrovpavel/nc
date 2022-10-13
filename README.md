# Natural Cycles Challenge

API Development:
 - cd api
 - run command: npm i
 - rename .env.example to .env.development
 - fill MONGO_USER and MONGO_PASS in .env.development file, according to you cluster
 - create file serviceAccountKey.json with you firebase credentials
 - run command: npm run dev

API Production:
 - cd api
 - run command: npm i
 - rename .env.example to .env.production
 - fill MONGO_USER and MONGO_PASS in .env.production file, according to you cluster
 - create file serviceAccountKey.json with you firebase credentials
 - run command: npm run build
 - run gcloud app deploy (don`t forget to adjust gcloud)
 - cd root folder
 - gcloud app deploy dispatch.yaml

CLIENT Development:
 - cd client
 - run command: npm i
 - rename .env.example to .env.development
 - fill REACT_APP_API in .env.development file, according to you api
 - run command: npm run start

CLIENT Production:
 - cd client
 - run command: npm i
 - rename .env.example to .env.production
 - fill REACT_APP_API in .env.production file, according to you api
 - run command: npm run build
 - run gcloud app deploy client.yaml (don`t forget to adjust gcloud)