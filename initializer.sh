
## Execute this shell script in order to create a default stub project

clear
echo ''
while [[ -z "$PROJECT_NAME" ]];do
 echo -e '\e[31m>\e[0m Project name? '
 read PROJECT_NAME
 if [[ -z "$PROJECT_NAME" ]]
 then
      echo -e '\e[31m You must add a value  :(\e[0m\n'
 else
      echo -e '\e[32m Well done  :)\e[0m\n'
 fi
done

while [[ -z "$ROOT_PATH" ]];do
 echo -e '\e[31m>\e[0m Root path? (example: /c/opt/...) '
 read ROOT_PATH

 if [[ -z "$ROOT_PATH" ]]
 then
      echo -e '\e[31m You must add a value  :(\e[0m\n'
 else
      echo -e '\e[32m Well done  :)\e[0m\n'
 fi
done

echo ''
echo -e '\e[33m----------------------------------------------------\e[0m\n'
echo -e ' \e[32mInit hectorjs ...\e[0m\n'
echo -e '   \e[36m-> Project name:\e[0m '$PROJECT_NAME
echo -e '   \e[36m-> Root path:\e[0m    '$ROOT_PATH'\n'

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
echo -e '\x1b[34m _   _  _____ _____ _____ ___________   ___ _____\x1b[0m'
echo -e '\x1b[34m| | | ||  ___/  __ \\_   _|  _  | ___ \\ |_  /  ___|\x1b[0m'
echo -e '\x1b[34m| |_| || |__ | /  \\/ | | | | | | |_/ /   | \\ `--. \x1b[0m'
echo -e '\x1b[34m|  _  ||  __|| |     | | | | | |    /    | |`--. \\\x1b[0m'
echo -e '\x1b[34m| | | || |___| \\__/\\ | | \\ \\_/ / |\\ \\ \\__/ /\\__/ /\x1b[0m'
echo -e '\x1b[34m\\_| |_/\\____/ \\____/ \\_/  \\___/\\_| \\_\\____/\____/\x1b[0m \n'
echo -e '     \e[32mSuccessfully created :)\e[0m\n\n'
echo -e '\e[33m----------------------------------------------------\e[0m\n\n'

