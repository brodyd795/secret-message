#!/usr/bin/env sh

curl \
    --data "env=${environment}" \
    --data "password=${deploy_webhook_password}" \
    --data "project=${project}" \
    https://dingel.dev/deploy