
## Execute this shell script in order to create a default stub project

clear
echo ''
while [[ -z "$PROJECT_NAME" ]];do
 echo  '\x1B[31m>\x1B[0m Project name? '
 read PROJECT_NAME
 if [[ -z "$PROJECT_NAME" ]]
 then
      echo  '\x1B[31m You must add a value  :(\x1B[0m\n'
 else
      echo  '\x1B[32m Well done  :)\x1B[0m\n'
 fi
done

while [[ -z "$ROOT_PATH" ]];do
 echo  '\x1B[31m>\x1B[0m Root path? (example: /c/opt/...) '
 read ROOT_PATH

 if [[ -z "$ROOT_PATH" ]]
 then
      echo  '\x1B[31m You must add a value  :(\x1B[0m\n'
 else
      echo  '\x1B[32m Well done  :)\x1B[0m\n'
 fi
done

echo ''
echo  '\x1B[33m----------------------------------------------------\x1B[0m\n'
echo  ' \x1B[32mInit hectorjs ...\x1B[0m\n'
echo  '   \x1B[36m-> Project name:\x1B[0m '$PROJECT_NAME
echo  '   \x1B[36m-> Root path:\x1B[0m    '$ROOT_PATH'\n'

cd $ROOT_PATH
mkdir $PROJECT_NAME 
cd $PROJECT_NAME 
echo "require('@hectorjs/stub-backend')" > app.js
mkdir resources 
cd resources
echo {} > temp.json
cd ..
code .
npm init
npm i @hectorjs/stub-backend

echo ''
echo  '\x1b[34m _   _  _____ _____ _____ ___________   ___ _____\x1b[0m'
echo  '\x1b[34m| | | ||  ___/  __ \\_   _|  _  | ___ \\ |_  /  ___|\x1b[0m'
echo  '\x1b[34m| |_| || |__ | /  \\/ | | | | | | |_/ /   | \\ `--. \x1b[0m'
echo  '\x1b[34m|  _  ||  __|| |     | | | | | |    /    | |`--. \\\x1b[0m'
echo  '\x1b[34m| | | || |___| \\__/\\ | | \\ \\_/ / |\\ \\ \\__/ /\\__/ /\x1b[0m'
echo  '\x1b[34m\\_| |_/\\____/ \\____/ \\_/  \\___/\\_| \\_\\____/\____/\x1b[0m \n'
echo  '     \x1B[32mSuccessfully created :)\x1B[0m\n\n'
echo  '\x1B[33m----------------------------------------------------\x1B[0m\n\n'

