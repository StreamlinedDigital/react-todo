var chai = require('chai');
import React from 'react';

describe('Voting', () => {

  it('Add 1 + 1', () => {
    function add(x,y){
      return x + y
    }

    chai.expect(add(1,1)).to.equal(2);

  });

});
