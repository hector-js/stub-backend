import { getCli } from "./get.cli";

export function generateCli(args) {

    switch (args._[1]) {
        case 'get':
        case 'g':
                getCli(args);
            break;
        case 'post':
        case 'p':
            console.log('WIP')
            break;
            
        default:
    }

}