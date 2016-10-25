#! /bin/bash


modules=( 'iigb-beta-content' 'great.gov.uk-structure' 'great.gov.uk-layout')
project_url=`git remote get-url origin` #get current projects url

function init {
    init_modules
}

# Pulls module repose for development if doesn't exist already
function init_modules {
    for (( i=0;i<${#modules[@]};i++)); do
        init_repo ${modules[${i}]} && continue
        exit 1 #break if any repos fail
    done
}

function init_repo {
    url=${project_url/'iigb-beta-website.git'/$1}
    echo "Initialising $url"
    if [ -d $1 ]; then
        echo "$1 already initialised, skipping..."
    else
        git clone $url
    fi
}


init #starting point

