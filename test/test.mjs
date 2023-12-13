/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { CharacterScanner } from '../src/index.mjs';
const should = chai.should();

var inputs = {
    alphabet : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    email : 'Most Ill<rhymin@steal.in>'
};

describe('character-scanner', function(){
    
    it('can instantiate a scanner and consume input', function(done){
        var scanner = new CharacterScanner();
        inputs.alphabet.split('').forEach(function(c){
            scanner.input(c);
        });
        done();
    });
    
    it('can add and recognize a pattern', async function(){
        var scanner = new CharacterScanner();
        scanner.addScanner({
            name: 'email',
            pattern: /[a-zA-Z0-9.+-]+@[a-zA-Z0-9.+-]+\.[A-Za-z]{2,4}/mi
        });
        const result = new Promise((resolve, reject)=>{
            try{
                if(scanner.on) scanner.on('email', function(value){
                    value.should.equal('rhymin@steal.in');
                    resolve();
                });
            }catch(ex){ reject(ex) }
        });
        inputs.email.split('').forEach(function(c){
            scanner.input(c);
        });
        await result;
    });
    
});