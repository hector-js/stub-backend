
clear
echo ''
echo '> Project name? '
read PROJECT_NAME
echo '> Root path? (example: /c/opt/...)'
read ROOT PATH
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

