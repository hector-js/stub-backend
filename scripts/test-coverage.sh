unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     NODE_ENV=test nyc --reporter=html --reporter=text mocha --recursive './test/**/*.test.js' --exit;;
    Darwin*)    NODE_ENV=test nyc --reporter=html --reporter=text mocha --recursive './test/**/*.test.js' --exit;;
    CYGWIN*)    NODE_ENV=test nyc --reporter=html --reporter=text mocha --recursive './test/**/*.test.js' --exit;;
    MINGW*)     nyc --reporter=html --reporter=text mocha --recursive './test/**/*.test.js' --exit;;
    *)          NODE_ENV=test nyc --reporter=html --reporter=text mocha --recursive './test/**/*.test.js' --exit;;
esac
