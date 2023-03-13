#!/bin/sh

ret=0
while read line
do
  if [ -f $line ]
  then
    case $line in
      *.php)
      if php -l ${line} | grep -v "No syntax errors detected"
        then
          echo "Error in ${line}"
          ret=1
      fi;;
    esac
  fi
done
return ${ret}
