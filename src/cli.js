import { exists, existsSync, mkdirSync, readdirSync } from 'fs';
import { createInterface } from 'readline';
import { resolve } from 'dns';
import { rejects } from 'assert';


export async function cli(args){

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

    var i =0
    for(i=0; i< args.length; i++){
        if(args[i]=== 'new'){
            let nameProject = await handleQuestion('Project name?').catch(()=> process.exit());
            let pathProject = await handleQuestion('Root path? (example: /c/opt/...)').catch(()=> process.exit());
            console.log(`\n\x1b[33m----------------------------------------------------\x1b[0m\n`);
            console.log(`\x1b[32m Init hectorjs ...\x1b[0m\n`);
            console.log(`\x1b[32m -> Project name: ${nameProject}\x1b[0m`);
            console.log(`\x1b[32m -> Root path: ${pathProject}\x1b[0m\n`);
            console.log(`\x1b[33m- - - - - - - - - - - - - - - - - - - - - - - - - - \x1b[0m\n`);
            console.log(`\x1b[33mTO BE IMPLEMENTED ... \x1b[0m\n`);
            console.log(`\x1b[33m- - - - - - - - - - - - - - - - - - - - - - - - - - \x1b[0m\n`);
        }
        if(args[i] === 'version'){
            console.log('\n\x1b[33mversion: 0.27.0\x1b[0m\n')
            process.exit();
        }
    }
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
