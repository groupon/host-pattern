'use strict';

const assert = require('assertive');

const expand = require('../').expand;

describe('expand', () => {
  it('ignores empty strings', () => {
    assert.deepEqual([], expand(' \n\t \t '));
    assert.deepEqual([], expand(''));
  });

  it('expands a comma-separated list of elements', () => {
    assert.deepEqual(['ab', 'cde', 'xy'], expand('ab, cde  , xy'));
  });

  it('expands a semicolon-separated list of elements', () => {
    assert.deepEqual(['ab', 'cde', 'xy'], expand('ab; cde  ; xy'));
  });

  it('supports "-" ranges', () => {
    assert.deepEqual(['ab1xyz', 'ab2xyz', 'ab3xyz'], expand('ab<1-3>xyz'));
  });

  it('ignores empty <> ranges', () => {
    assert.deepEqual(['abxy'], expand('ab<>xy'));
  });

  it('allows combining all the features', () => {
    assert.deepEqual(
      [
        'a1',
        'a2',
        'a3',
        'a5',
        'a7',
        'a11',
        'a12',
        'a13',
        'a14',
        'b',
        'g44',
        'foo.y-9._do3',
      ],
      expand('a<1-3,5,7,11-14>,b,g<44>,foo.y-<9>._do3')
    );
  });

  it('fails with additional <> ranges', () => {
    const err = assert.throws(() => {
      expand('ab<1,2>xy<1>z');
    });
    assert.include('Multiple ranges', err.message);
  });

  it('fails on unclosed range expressions', () => {
    const err = assert.throws(() => {
      expand('ab<xy');
    });
    assert.include('Invalid range', err.message);
  });
});
