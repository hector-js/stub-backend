import { getStatus } from "../../utils.cli";

export function assert(){
    return `\n      .end((err, res) => {`;
}

export function noErrors(){
    return `\n          expect(err).to.not.exist;`;
}

export function status(args){
    const status = getStatus(args);
    return `\n          expect(res.status).to.equal(${status ? status : '200'});`;
}


export function body(){
    return `\n          expect(res.body).to.deep.equal({
            'dummyResponse': 'dummyResponse'
 
          });`
}

export function bodyG(){
    return `\n          expect(res.body).to.deep.equal({
            'body' : 'To be defined'
          });`
}

export function emptyBody(){
    return `\n          expect(res.body).to.be.empty;`;
}

export function endAssert(){
    return `\n          done();\n      });`;
}