import { createInterface } from 'readline';
import { cd, exec, mkdir, touch } from 'shelljs';
import { writeFile } from 'fs';


export async function cli(args) {

    if (!args) {
        console.log('Sorry, you missed a parameter like --new, --version..');
        process.exit();
    }

    if (args.version) {
        console.log('\n\x1b[33mversion: 0.30.0\x1b[0m\n')
        process.exit();
    }

    if (args.help) {
        console.log('\n\x1b[32mBelow, you can see different options for your mock:\n\x1b[0m\n')
        console.log(`\x1b[32m --new     : create new mock project\x1b[0m`);
        console.log(`\x1b[32m --version : know version hjs\x1b[0m`);
        console.log(`\x1b[32m --vs      : open visual code studio if exists\x1b[0m`);
        console.log(`\x1b[32m --licence : MIT\n\n\x1b[0m`);
        console.log(`\x1b[32mExample: hjs --new --vs\n\x1b[0m`);
        console.log('\x1b[33mversion: 0.30.0\x1b[0m\n')
        process.exit();
    }

    if (args.new) {
        exec('clear');
        
        var nameProject = await handleQuestion('Project name?').catch(() => process.exit());
        var pathProject = await handleQuestion('Root path? (example: /c/opt/...)').catch(() => process.exit());
        console.log(`\n\x1b[33m----------------------------------------------------\x1b[0m\n`);
        console.log(`\x1b[32m Init hectorjs ...\x1b[0m\n`);
        console.log(`\x1b[32m -> Project name: ${nameProject}\x1b[0m`);
        console.log(`\x1b[32m -> Root path: ${pathProject}\x1b[0m\n`);
        console.log(`\x1b[33m- - - - - - - - - - - - - - - - - - - - - - - - - - \x1b[0m\n`);

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

        console.log('\x1b[32m Be aware if you dont have hjs set globally, you will need to run the server via node command\x1b[0m\n')
        var runHealth = await handleQuestion('Run service with health check? (y/N)').catch(() => process.exit());
        if (args['vs'] && args['vs'] == true) {
            exec('code .');
        }
        if (runHealth == 'y') {
            require('@hectorjs/stub-backend');
        } else {
            console.log('Ready to test (run node app.js)');
        }
        process.exit();
    }

    console.log('Sorry, you missed a parameter like --new, --version..');
    process.exit();
};

function handleQuestion(message) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        readline.question(`\n\x1b[34m> \x1b[0m ${message} \n`,
            (name) => handleAnswer(resolve, reject, readline, name));
    });
}

function handleAnswer(resolve, reject, readline, value) {
    if (!value) {
        console.log(`\x1b[31m You must add a value  :(\x1b[0m`);
        readline.close();
        reject();
    } else {
        console.log(`\x1b[32m Well done  :)\x1b[0m`)
        readline.close();
        resolve(value);
    }
}
