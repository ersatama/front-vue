#!/bin/sh

ret=0
wd="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
cd "$wd/../.."
echo "CD to $(pwd)"

npm install
npm run build

exit ${ret}
