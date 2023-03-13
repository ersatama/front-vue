#!/bin/sh

me=`basename "$0"`

set -e
for f in $(find ./ -name "*.sh" $(printf "! -name %s $me") | sort -n); do
  # sh "$f" || break  # execute successfully or break
  #fi
  # Or more explicitly: if this execution fails, then stop the `for`:
  # if ! bash "$f"; then exit 1; fi
  echo "Execute# $f $1";
  if ! sh "$f" $1; then echo "ERROR while execute $f $1"; exit 1; fi
done
exit 0
