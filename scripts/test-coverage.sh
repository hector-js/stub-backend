unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     NODE_ENV=test nyc --reporter=html --reporter=text mocha --exit;;
    Darwin*)    NODE_ENV=test nyc --reporter=html --reporter=text mocha --exit;;
    CYGWIN*)    NODE_ENV=test nyc --reporter=html --reporter=text mocha --exit;;
    MINGW*)     nyc --reporter=html --reporter=text mocha --exit;;
    *)          NODE_ENV=test nyc --reporter=html --reporter=text mocha --exit;;
esac
