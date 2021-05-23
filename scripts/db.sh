#!/bin/bash

# If environment variable USER_DB_FILE or USER_DB_BACKUP_FOLDER not set or null, use ../data/users.db and ../data
DB_FILE="${USER_DB_FILE:-../data/users.db}"
BACKUP_FOLDER="${USER_DB_BACKUP_FOLDER:-../data}"

function usage() {
  echo "USAGE:"
  echo -e "  ./db.sh [OPTION]\n"
  echo "OPTIONS:"
  echo "  help,       Print usage help."
  echo "  add,        Adds a new record to the users.db file."
  echo "  backup,     Create a copy of current users.db file."
  echo "  restore,    Takes last created backup file and replaces users.db with it."
  echo "  find,       Find record(s) by username."
  echo "  list,       Print contents of user.db file. Accepts an additional optional parameter \"inverse\""
}

function dbFileExists() {
  if [[ -f $DB_FILE ]]; then
      echo "The following database file is used: $DB_FILE"
  else
    echo "The following database file does not exist: $DB_FILE"
    read -r -p "Would you like to create one? (yes): " promt
    case $promt in
      yes|"")
        mkdir -p "$(dirname "$DB_FILE")" && touch "$DB_FILE"
        ;;
      *)
        echo -e "Aborted.\n"
        exit 1
        ;;
    esac
  fi
}

function add() {
  dbFileExists

  while true
  do
    read -r -p "Username: " username
    if [[ ${username} =~ ^[a-zA-Z]+$ ]] ; then
      break
    else
      echo "[Invalid value] Username must contain only Latin letters. Please try again."
    fi
  done

  while true
  do
    read -r -p "Role: " role
    if [[ ${role} =~ ^[a-zA-Z]+$ ]] ; then
      break
    else
      echo "[Invalid value] Role must contain only Latin letters. Please try again."
    fi
  done

  echo "$username,$role" >> "$DB_FILE"
}

function backup() {
  dbFileExists

  backup="$BACKUP_FOLDER"/"$(date +"%Y-%m-%d")"-users.db.backup
  cp -i "$DB_FILE" "$backup"
  echo "Backup created: $backup"
}

function restore() {
  dbFileExists

  latestBackupFile=$(ls -Art "$BACKUP_FOLDER"/*.backup 2>/dev/null | head -1)

  if [[ -f $latestBackupFile ]]; then
    cp -f "$latestBackupFile" "$DB_FILE"
    echo "Database file restored from $latestBackupFile to $DB_FILE"
  else
    echo "No backup file found"
    exit 1
  fi
}

function find() {
  dbFileExists

  while true
  do
    read -r -p "Enter username: " enteredUsername
    if [[ ${enteredUsername} =~ ^[a-zA-Z]+$ ]] ; then
      break
    else
      echo "[Invalid value] Username must contain only Latin letters. Please try again."
    fi
  done

  index=1
  while IFS="," read -r username role
  do
    if [[ $enteredUsername == "$username" ]]; then
      if [[ "${index}" -eq 1 ]]; then
        echo -e "\nFound users:"
      fi
      echo "$index. Username: $username, Role: $role"
      ((index=index+1))
    fi
  done < "$DB_FILE"

  if [[ "${index}" -eq 1 ]]; then
    echo -e "\nUser not found"
  fi
}

function list() {
  dbFileExists

  users=()
  while IFS="," read -r username role
  do
    users+=("$username, $role")
  done < "$DB_FILE"

  if [[ ${#users[@]} -eq 0 ]]; then
    echo -e "\n$DB_FILE file is empty or has the wrong user record format"
    exit 1
  else
    echo -e "\nUser list:"
    if [[ "$1" == "inverse" ]]; then
      for (( index=${#users[@]}-1 ; index>=0 ; index-- )); do
        echo "$((index+1)). ${users[index]}"
      done
    else
      for index in "${!users[@]}"; do
        echo "$((index+1)). ${users[$index]}"
      done
    fi
  fi
}

case $1 in
  add)
    add
    ;;
  backup)
    backup
    ;;
  restore)
    restore
    ;;
  find)
    find
    ;;
  list)
    list "$2"
    ;;
  help|"")
    usage
    ;;
  *)
    echo -e "Unknown option: $1\n"
    exit 1
    ;;
esac
