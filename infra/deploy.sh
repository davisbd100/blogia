#!/bin/bash

set -e

EC2_USER=ubuntu
EC2_HOST=publicIpEc2
KEY_PATH=~/.ssh/key.pem
APP_DIR=~/app

echo "Remote deploy"

ssh -i $KEY_PATH $EC2_USER@$EC2_HOST << EOF
  set -e
  cd $APP_DIR

  echo "Pull of docker images"
  aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

  docker-compose pull

  echo "Reup containers"
  docker-compose up -d

  echo "Remove old images"
  docker image prune -f

  echo "Deployment completed"
EOF
