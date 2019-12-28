'use strict';

const Data = require('../../../lib/app/shared/read-db-files');
const chai = require('chai');

const expect = chai.expect;

describe('db files reader', () => {
  describe('#db', ()=>{
    context('when one resource file is under a sub-folder', ()=>{
      it('should be able to read it', ()=>{
        const data = Data.db();

        expect(data._post['/sub-folder/example']).to.exist;
        expect(data._post['/sub-sub-folder/example']).to.exist;
        expect(data._post['/story/nathan']).to.exist;
      });
    });

    context('when one resource file is under two sub-folders', ()=>{
      it('should be able to read it', ()=>{
        const data = Data.db();

        expect(data._post['/sub-folder/example']).to.exist;
        expect(data._post['/sub-sub-folder/example']).to.exist;
        expect(data._post['/story/nathan']).to.exist;
      });
    });
  });

  describe('#dbByMethod', ()=>{
    context('when one resource file is under a sub-folder', ()=>{
      it('should be able to read it', ()=>{
        const data = Data.dbByMethod('_post');

        expect(data['/sub-folder/example']).to.exist;
        expect(data['/sub-sub-folder/example']).to.exist;
        expect(data['/story/nathan']).to.exist;
      });
    });

    context('when one resource file is under two sub-folders', ()=>{
      it('should be able to read it', ()=>{
        const data = Data.dbByMethod('_post');

        expect(data['/sub-sub-folder/example']).to.exist;
        expect(data['/sub-folder/example']).to.exist;
        expect(data['/story/nathan']).to.exist;
      });
    });
  });
});

