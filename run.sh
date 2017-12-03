SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
YEAR=${1:-2017}

for file in $YEAR/*.js
do
	echo $file
	cd $SCRIPTPATH
	cd $(dirname $file)
	cat `basename $file .js`.in | node `basename $file`;
done
