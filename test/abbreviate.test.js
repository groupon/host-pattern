'use strict';

const assert = require('assert');

const { abbreviate, expand } = require('..');

describe('abbreviate', () => {
  it('is an empty string for an empty list', () => {
    assert.strictEqual(abbreviate([]), '');
  });

  it('can get back the empty list', () => {
    assert.deepStrictEqual(expand(abbreviate([])), []);
  });

  it('is the first element for a one element list', () => {
    assert.strictEqual(abbreviate(['x']), 'x');
  });

  it('joins multiple hosts with a comma', () => {
    assert.strictEqual(abbreviate(['abc', 'host', 'xy']), 'abc,host,xy');
  });

  it('complains about non-arrays', () => {
    assert.throws(() => {
      abbreviate();
    }, /abbreviate\(string\[]\): `undefined` is not an array/);

    assert.throws(() => {
      abbreviate(42);
    }, /abbreviate\(string\[]\): `42` is not an array/);

    assert.throws(() => {
      abbreviate({});
    }, /abbreviate\(string\[]\): `\[object Object]` is not an array/);

    assert.throws(() => {
      abbreviate('host');
    }, /abbreviate\(string\[]\): `host` is not an array/);
  });

  it('complains about invalid hosts', () => {
    assert.throws(() => {
      abbreviate(['']);
    }, /Invalid host: ""/);

    assert.throws(() => {
      abbreviate(['<foo>']);
    }, /Invalid host: "<foo>"/);

    assert.throws(() => {
      abbreviate(['abc<']);
    }, /Invalid host: "abc<"/);
  });

  it('sorts in a predictable order', () => {
    assert.strictEqual(abbreviate(['bc1', 'be', 'bc2', 'a']), 'a,bc<1-2>,be');
  });

  it("does't swallow hosts when a non-numbered variant exists", () => {
    assert.strictEqual(
      abbreviate(['a1b', 'a3b', 'ab', 'x2', 'x4', 'x']),
      'a<1,3>b,ab,x,x<2,4>'
    );
  });

  it('collapses hosts that only vary by a number', () => {
    assert.strictEqual(
      abbreviate(['host1-4-u.com', 'host3-4-u.com']),
      'host<1,3>-4-u.com'
    );
  });

  it('finds consecutive ranges, favoring `-` over `,`', () => {
    assert.strictEqual(
      abbreviate([
        'host11-4-u.com',
        'host1-4-u.com',
        'host6-4-u.com',
        'host8-4-u.com',
        'host3-4-u.com',
        'host4-4-u.com',
        'other',
        'host5-4-u.com',
        'host9-4-u.com',
      ]),
      'host<1,3-6,8-9,11>-4-u.com,other'
    );
  });

  it('always tries to unify using the first group of digits', () => {
    assert.strictEqual(
      abbreviate(['service4u-app1', 'service4u-app2', 'service4u-app3']),
      'service4u-app1,service4u-app2,service4u-app3'
    );
    assert.strictEqual(
      abbreviate(['service-app1', 'service-app2', 'service-app3']),
      'service-app<1-3>'
    );
  });
});
