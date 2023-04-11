#!/bin/sh

ret=0
wd="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
cd "$wd/../../../immuniweb-back-laravel"

php ~/composer.phar install

exit ${ret}
