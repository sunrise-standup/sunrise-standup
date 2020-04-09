# Overview

This is a CRA app.

The app setup was taken from [here](https://github.com/collab-project/videojs-record/wiki/React).

## Set up

App mostly should just work when you run `npm run start` for the React app and then use the VSCode debugger to start the functions

You will need _two_ .env files, one for the Functions _inside_ the `api` directory, and one of the root of the project.

The api one needs

```
STORAGE_ACCOUNT=coffeevideo
STORAGE_CONTAINER=raw
STORAGE_KEY=<storage key>
STORAGE_CONNECTION_STRING=<storage connection string>
```

The root directory one needs:

```
STORAGE_ACCOUNT=coffeevideo
STORAGE_CONTAINER=raw
API_DOMAIN="http://localhost:3000"
```
