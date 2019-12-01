export function describe(path, method){
    return `\ndescribe('${method.toUpperCase()} - ${path} ', () => {`;
}
