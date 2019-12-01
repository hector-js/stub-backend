export function libraries(){
    return `'use strict';
    
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;
`;
    
}
