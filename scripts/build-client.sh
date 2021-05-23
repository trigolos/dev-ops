#!/bin/bash

# If environment variable ZIP_FILENAME or BUILD_FOLDER not set or null, use client-app.zip and ../dist
ZIP_FILENAME="${BUILD_ZIP_FILE:-client-app.zip}"
BUILD_FOLDER="${BUILD_FOLDER:-../dist}"

function build() {
  if [[ $1 == "dev" ]]; then
    buildCommand="npm run build"
  else
    buildCommand="npm run build:prod"
  fi

  $buildCommand

  if [[ $? -eq 0 ]]; then
    zipFile="$BUILD_FOLDER/$ZIP_FILENAME"
    if [[ -f $zipFile ]]; then
      rm -rf "$zipFile"
      echo -e "\nPrevious $zipFile was removed.\n"
    fi

    zip -9 "$zipFile" -r "$BUILD_FOLDER"

  else
    echo -e "\n\"$buildCommand\" failed"
    exit 1
  fi
}

case $ENV_CONFIGURATION in
  prod|production)
    build prod
    ;;
  dev|develop)
    build dev
    ;;
  "")
    echo -e "\nENV_CONFIGURATION variable is not defined."
    exit 1
    ;;
  *)
    echo -e "\n$ENV_CONFIGURATION value of the variable ENV_CONFIGURATION is not supported."
    exit 1
    ;;
esac
