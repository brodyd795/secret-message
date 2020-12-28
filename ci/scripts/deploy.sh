#!/usr/bin/env sh

curl \
    --data "env=${ENVIRONMENT}" \
    --data "password=${DEPLOY_WEBHOOK_PASSWORD}" \
    --data "project=${PROJECT}" \
    https://dingel.dev/deploy