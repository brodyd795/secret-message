#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd ${DIR}
source /root/.nvm/nvm.sh
nvm use

LOGS_PATH="$(sudo cat ${DIR}/.env | grep LOGS_PATH= | cut -d '=' -f2)"
PORT="$(sudo cat ${DIR}/.env | grep PORT= | cut -d '=' -f2)"
git pull
npm install
npx next build
npx next start -p ${PORT} > ${LOGS_PATH} 2>&1
