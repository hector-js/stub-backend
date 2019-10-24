
## Execute this shell script in order to create a default stub project

clear
printf ''

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

case "${machine}" in
    Linux)                 disp='\x1B';;
    Mac)                   disp='\x1B';;
    Cygwin)                disp='\x1B';;
    MinGw)                 disp='\e';;
    "UNKNOWN:${unameOut}") disp='\x1B'
esac

printf  '\n'${disp}'[33mMachine: '$machine' '${disp}'[0m\n\n'

while [[ -z "$PROJECT_NAME" ]];do
 printf ${disp}'[31m>'${disp}'[0m Project name? \n'
 read PROJECT_NAME
 if [[ -z "$PROJECT_NAME" ]]
 then
      printf  ${disp}'[31m You must add a value  :('${disp}'[0m\n\n'
 else
      printf  '\n'${disp}'[32m Well done  :)'${disp}'[0m\n\n'
 fi
done

while [[ -z "$ROOT_PATH" ]];do
 printf  ${disp}'[31m>'${disp}'[0m Root path? (example: /c/opt/...) \n\n'
 read ROOT_PATH

 if [[ -z "$ROOT_PATH" ]]
 then
      printf  ${disp}'[31m You must add a value  :('${disp}'[0m\n\n'
 else
      printf  '\n'${disp}'[32m Well done  :)'${disp}'[0m\n\n'
 fi
done

printf  '\n'${disp}'[33m----------------------------------------------------'${disp}'[0m\n\n'
printf  ' '${disp}'[32mInit hectorjs ...'${disp}'[0m\n\n'
printf  '   '${disp}'[36m-> Project name:'${disp}'[0m '$PROJECT_NAME'\n'
printf  '   '${disp}'[36m-> Root path:'${disp}'[0m    '$ROOT_PATH'\n\n'
printf  '\n'${disp}'[33m- - - - - - - - - - - - - - - - - - - - - - - - - - '${disp}'[0m\n\n'

cd $ROOT_PATH
mkdir $PROJECT_NAME 
cd $PROJECT_NAME 
printf "require('@hectorjs/stub-backend')" > app.js
mkdir resources 
cd resources
printf "{\n    \"health\" : [\n        {\n            \"STATUS\":\"UP\"\n        }\n    ]\n}" > health.json
cd ..
code .
npm init
npm install @hectorjs/stub-backend

printf ''
printf  '\x1b[34m _   _  _____ _____ _____ ___________   ___ _____\x1b[0m\n'
printf  '\x1b[34m| | | ||  ___/  __ \\_   _|  _  | ___ \\ |_  /  ___|\x1b[0m\n'
printf  '\x1b[34m| |_| || |__ | /  \\/ | | | | | | |_/ /   | \\ `--. \x1b[0m\n'
printf  '\x1b[34m|  _  ||  __|| |     | | | | | |    /    | |`--. \\\x1b[0m\n'
printf  '\x1b[34m| | | || |___| \\__/\\ | | \\ \\_/ / |\\ \\ \\__/ /\\__/ /\x1b[0m\n'
printf  '\x1b[34m\\_| |_/\\____/ \\____/ \\_/  \\___/\\_| \\_\\____/\____/\x1b[0m \n\n'
printf  '     '${disp}'[32mSuccessfully created :)'${disp}'[0m\n\n\n'
printf  ${disp}'[33m----------------------------------------------------'${disp}'[0m\n\n\n'

