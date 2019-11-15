unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     NODE_ENV=test mocha --exit;;
    Darwin*)    NODE_ENV=test mocha --exit;;
    CYGWIN*)    NODE_ENV=test mocha --exit;;
    MINGW*)     mocha --exit;;
    *)          NODE_ENV=test mocha --exit;;
esac
