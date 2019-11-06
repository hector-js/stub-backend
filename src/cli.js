import { exists, existsSync, mkdirSync, readdirSync } from 'fs';
import { createInterface } from 'readline';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { cd , exec , mkdir , touch} from 'shelljs';
import { writeFile } from 'fs';

export async function cli(args){
    exec('clear');

    if(args.length<=2){
        console.log('Sorry, you missed a parameter like new, version..');
        process.exit();
    }

    var machine;
    switch(process.platform){
        case 'Linux':
            machine='Linux';
            break;
        case 'Darwin':
            machine='Mac';
            break;
        case 'CYGWIN':
            machine='Cygwin';
            break;
        case 'win32':
        case 'win64':
            machine='MinGw';
            break;
        default:
        machine=`UNKNOWN:${machine}`
    }

    let nameProject;
    let pathProject;
    var i =0
    for(i=0; i< args.length; i++){
        if(args[i]=== 'new'){
            nameProject = await handleQuestion('Project name?').catch(()=> process.exit());
            pathProject = await handleQuestion('Root path? (example: /c/opt/...)').catch(()=> process.exit());
            console.log(`\n\x1b[33m----------------------------------------------------\x1b[0m\n`);
            console.log(`\x1b[32m Init hectorjs ...\x1b[0m\n`);
            console.log(`\x1b[32m -> Project name: ${nameProject}\x1b[0m`);
            console.log(`\x1b[32m -> Root path: ${pathProject}\x1b[0m\n`);
            console.log(`\x1b[33m- - - - - - - - - - - - - - - - - - - - - - - - - - \x1b[0m\n`);
            console.log(`\x1b[33mTO BE IMPLEMENTED ... \x1b[0m\n`);
            console.log(`\x1b[33m- - - - - - - - - - - - - - - - - - - - - - - - - - \x1b[0m\n`);
        }
        if(args[i] === 'version'){
            console.log('\n\x1b[33mversion: 0.29.0\x1b[0m\n')
            process.exit();
        }
    }


  cd(pathProject);
  mkdir(nameProject);
  cd(nameProject);
  exec('npm init -y');
  exec('npm install @hectorjs/stub-backend');
  mkdir('resources');
  cd('resources');
  touch('health.json');
  
  const healthData = "{\n    \"health\" : [\n        {\n            \"body_\" : {\"STATUS\":\"UP\"}\n        }\n    ]\n}";
  writeFile('health.json', healthData, (err) => { 
      if (err) throw err; 
  });
 cd('..');
 touch('app.js');

 const appData = "require('@hectorjs/stub-backend')";
 writeFile('app.js', appData, (err) => { 
     if (err) throw err; 
 });


 console.log('Ready to test (run node app.js)');
};

function handleQuestion(message){
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return  new Promise((resolve, reject) => {  
        readline.question(`\n\x1b[34m> \x1b[0m ${message} \n`, 
        (name) => handleAnswer(resolve, reject, readline,name));
    });
}

function handleAnswer(resolve, reject, readline, value){
    if(!value){
        console.log(`\x1b[31m You must add a value  :(\x1b[0m`);
        readline.close();
        reject();
    }else{
        console.log(`\x1b[32m Well done  :)\x1b[0m`)
        readline.close();
        resolve(value);
    }
}
