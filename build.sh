#!/bin/bash

start=`pwd`

# set origin for client on server
sed -i -e "s|http://localhost:4200|https://notes-with-typescript_mxu.cfapps.io|g" $start/src/main/kotlin/com/okta/developer/notes/NotesApplication.kt

mvn clean package -f $start/pom.xml

cd $start/client
rm -rf dist
# set API URL
sed -i -e "s|http://localhost:8080|https://notes-by-kotlin_mxu.cfapps.io|g" $start/client/src/app/shared/note/note.service.ts
# set redirectURI to client URI
sed -i -e "s|http://localhost:4200|https://notes-with-typescript_mxu.cfapps.io|g" $start/client/src/app/shared/okta/okta.service.ts
yarn && ng build -prod --aot
touch dist/Staticfile

cd $start
cf push

# reset and remove changed files
git checkout $start
rm -rf $start/src/main/kotlin/com/okta/developer/notes/NotesApplication.kt-e
rm -rf $start/client/src/app/shared/note/note.service.ts-e
