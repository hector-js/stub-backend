sh scripts/banners/cup-tea.sh

rm -rf node_modules;
npm i;
npm run test;
TEST=$?
npm run eslint;
LINT=$?
npm run coverage;
COVERAGE_TEST=$?
npm audit;
AUDIT=$?

echo "-----------------------------";
echo "";
echo "";
RESULT=0
if [ "$TEST" -eq "1" ]; then
   RESULT=1
   echo "Unit test has failed!";
fi
if [ "$LINT" -eq "1" ]; then
   RESULT=1
   echo "LINT CHECK has failed!";
fi
if [ "$COVERAGE_TEST" -eq "1" ]; then
   RESULT=1
   echo "STUB_TEST CHECK has failed!";
fi
if [ "$AUDIT" -eq "1" ]; then
   RESULT=1
   echo "AUDIT CHECK has failed!";
fi

echo "";
echo "";

if [ "$RESULT" -eq "0" ]; then
   echo "Ready to push! :)";
   echo "";
fi

exit $RESULT

