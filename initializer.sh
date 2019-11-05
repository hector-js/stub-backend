
## Execute this shell script in order to create a default stub project

# clear
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
    Cygwin)                disp='\xdf1B';;
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
printf "{\n    \"health\" : [\n        {\n            \"body_\" : {\"STATUS\":\"UP\"}\n        }\n    ]\n}" > health.json
cd ..
code .
npm init --yes
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


while [[ -z "$RUN_APP" ]];do
 printf ${disp}'[31m>'${disp}'[0m Do you want to run health check? (yes/no) \n'
 read RUN_APP
 if [[ -z "$RUN_APP" ]]
 then
      printf  ${disp}'[31m You must add a value  :('${disp}'[0m\n\n'
 fi
done



 if [ $RUN_APP = "yes" ];
 then
      clear
      printf  ${disp}'[32m  Done! Health check will be running below.'${disp}'[0m\n\n'
      node app.js --logs tiny
 else
      printf  '\n'${disp}'[32m  Done!:) Ready to mock.'${disp}'[0m\n\n'
 fi

