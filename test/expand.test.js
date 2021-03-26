'use strict';

const assert = require('assert');

const { expand } = require('..');

describe('expand', () => {
  it('ignores empty strings', () => {
    assert.deepStrictEqual(expand(' \n\t \t '), []);
    assert.deepStrictEqual(expand(''), []);
  });

  it('expands a comma-separated list of elements', () => {
    assert.deepStrictEqual(expand('ab, cde  , xy'), ['ab', 'cde', 'xy']);
  });

  it('expands a semicolon-separated list of elements', () => {
    assert.deepStrictEqual(expand('ab; cde  ; xy'), ['ab', 'cde', 'xy']);
  });

  it('supports "-" ranges', () => {
    assert.deepStrictEqual(expand('ab<1-3>xyz'), [
      'ab1xyz',
      'ab2xyz',
      'ab3xyz',
    ]);
  });

  it('ignores empty <> ranges', () => {
    assert.deepStrictEqual(expand('ab<>xy'), ['abxy']);
  });

  it('allows combining all the features', () => {
    assert.deepStrictEqual(expand('a<1-3,5,7,11-14>,b,g<44>,foo.y-<9>._do3'), [
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
    ]);
  });

  it('fails with additional <> ranges', () => {
    assert.throws(() => {
      expand('ab<1,2>xy<1>z');
    }, 'Multiple ranges');
  });

  it('fails on unclosed range expressions', () => {
    assert.throws(() => {
      expand('ab<xy');
    }, 'Invalid range');
  });
});
