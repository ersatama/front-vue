#!/bin/sh

ok="0"

if [ "$1" = "prod" ]
then
    while read line
    do
    # echo "tst $line\n";
    if [ "$line" = ".cicd/nginx/admin3-prod" ]
    then
        echo "file changed $line, need to start copy it\n";
        ok="1"
        if ! sudo cp .cicd/nginx/admin3-prod /etc/nginx/sites-available/admin3-prod
        then
            echo "ERROR while sudo copy .cicd/nginx/admin3-prod /etc/nginx/sites-available/admin3-prod in pwd:"
            pwd
            exit 1
        fi
        

        if [ -e /etc/nginx/sites-enabled/admin3-prod ]
        then
            if [ ! -L /etc/nginx/sites-enabled/admin3-prod ]
            then
                echo "Error! file /etc/nginx/sites-enabled/admin3-prod exists and this is a not symlink"
                exit 1
            fi
            else
            echo "Creating symlink: ln -s /etc/nginx/sites-available/admin3-prod /etc/nginx/sites-enabled/admin3-prod ";
            if ! sudo ln -s /etc/nginx/sites-available/admin3-prod /etc/nginx/sites-enabled/admin3-prod
            then
                echo "Can not create symlink!"
                exit 1
            fi
        fi
    fi
    done
fi



if [ "$1" = "beta" ]
then
    while read line
    do
    # echo "tst $line\n";
    if [ "$line" = ".cicd/nginx/admin3-beta" ]
    then
        echo "file changed $line, need to start copy it\n";
        ok="1"
        if ! sudo cp .cicd/nginx/admin3-beta /etc/nginx/sites-available/admin3-beta
        then
            echo "ERROR while sudo copy .cicd/nginx/admin3-beta /etc/nginx/sites-available/admin3-beta in pwd:"
            pwd
            exit 1
        fi
        

        if [ -e /etc/nginx/sites-enabled/admin3-beta ]
        then
            if [ ! -L /etc/nginx/sites-enabled/admin3-beta ]
            then
                echo "Error! file /etc/nginx/sites-enabled/admin3-beta exists and this is a not symlink"
                exit 1
            fi
            else
            echo "Creating symlink: ln -s /etc/nginx/sites-available/admin3-beta /etc/nginx/sites-enabled/admin3-beta ";
            if ! sudo ln -s /etc/nginx/sites-available/admin3-beta /etc/nginx/sites-enabled/admin3-beta
            then
                echo "Can not create symlink!"
                exit 1
            fi
        fi
    fi
    done
fi



if [ "$ok" = "1" ]
then
  echo "restarting nginx\n";
  if ! sudo nginx -t
  then
    echo "ERROR: nginx test config failed"
    exit 1
  fi

  if ! sudo systemctl restart nginx
  then
    echo "ERROR: nginx restart failed"
    exit 1
  fi
fi

return 0
