unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    NODE_ENV=test mocha --exit;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     mocha --exit;;
    *)          machine="UNKNOWN:${unameOut}"
esac




