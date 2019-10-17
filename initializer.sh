
## Execute this shell script in order to create a default stub project

clear
echo ''



unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

echo 'Machine: '${machine}

case "${machine}" in
    Linux)                 disp='\x1B';;
    Mac)                   disp='\x1B';;
    Cygwin)                disp='\x1B';;
    MinGw)                 disp='\e';;
    "UNKNOWN:${unameOut}") disp='\x1B'
esac

echo ''


while [[ -z "$PROJECT_NAME" ]];do
 echo  ${disp}'[31m>'${disp}'[0m Project name? '
 read PROJECT_NAME
 if [[ -z "$PROJECT_NAME" ]]
 then
      echo  ${disp}'[31m You must add a value  :('${disp}'[0m\n'
 else
      echo  ${disp}'[32m Well done  :)'${disp}'[0m\n'
 fi
done

while [[ -z "$ROOT_PATH" ]];do
 echo  ${disp}'[31m>'${disp}'[0m Root path? (example: /c/opt/...) '
 read ROOT_PATH

 if [[ -z "$ROOT_PATH" ]]
 then
      echo  ${disp}'[31m You must add a value  :('${disp}'[0m\n'
 else
      echo  ${disp}'[32m Well done  :)'${disp}'[0m\n'
 fi
done

echo ''
echo  ${disp}'[33m----------------------------------------------------'${disp}'[0m\n'
echo  ' '${disp}'[32mInit hectorjs ...'${disp}'[0m\n'
echo  '   '${disp}'[36m-> Project name:'${disp}'[0m '$PROJECT_NAME
echo  '   '${disp}'[36m-> Root path:'${disp}'[0m    '$ROOT_PATH'\n'

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
echo  '     '${disp}'[32mSuccessfully created :)'${disp}'[0m\n\n'
echo  ${disp}'[33m----------------------------------------------------'${disp}'[0m\n\n'

