#!/bin/bash

echo `date`
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd ${DIR}
source /root/.nvm/nvm.sh
nvm use

PORT="$(sudo cat ${DIR}/.env | grep PORT= | cut -d '=' -f2)"
git pull
npm install
npx next build
kill -9 $(lsof -t -i:${PORT})
npx next start -p ${PORT}
