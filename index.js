'use strict';

function byNumeric(a, b) {
  return a - b;
}

function flatten(array) {
  return [].concat.apply([], array);
}

function matchAll(regex, text) {
  /* eslint no-cond-assign: 0 */
  const out = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.push(match);
  }
  return out;
}

const GROUP = new RegExp(
  [
    // Every match starts either at the beginning or after ,/;, surrounded by optional whitespace
    '(?:^|\\s*[,;]\\s*)',
    // This is the actual group, e.g. "my-host.example.com" or "my<pattern>xyz"
    '(?:',
    // The prefix is mandatory right now
    '([^<>,;\\s]+)',
    // Optional: a range (e.g. <1,2-4,8>) section
    '(?:',
    '<([^>]*)>', // We capture the actual range expression
    ')?',
    // The trailing part is optional
    '([^,;\\s]*)',
    ')', // end of actual group
  ].join(''),
  'g'
);
const HOST = /^([^\d,;\s<>]+)(\d*)([^,;\s<>]*)$/;

function parseSubRange(subRange) {
  const parts = subRange.split(/\s*-\s*/);
  let start = +parts[0];
  const end = +parts[1];

  const out = [start];
  while (end > start) {
    out.push(++start);
  }
  return out;
}

function parseRange(range) {
  return flatten(range.split(/\s*,\s*/).map(parseSubRange));
}

function parseGroup(match) {
  const prefix = match[1];
  const range = match[2];
  const postfix = match[3];

  if (/[<>]/.test(postfix)) {
    if (range) {
      throw new SyntaxError(
        `Multiple ranges in one group: ${JSON.stringify(match[0])}`
      );
    }
    throw new SyntaxError(
      `Invalid range definition in ${JSON.stringify(match[0])}`
    );
  }

  function buildName(n) {
    return prefix + n + postfix;
  }

  if (!range) {
    return prefix + postfix;
  }

  return parseRange(range).map(buildName);
}

function expand(pattern) {
  if (Array.isArray(pattern)) {
    return flatten(pattern.map(expand));
  }
  if (!/\S/.test(pattern)) {
    return [];
  }

  const groups = matchAll(GROUP, pattern).map(parseGroup);
  return flatten(groups);
}
exports.expand = expand;

function buildRanges(members) {
  const ranges = [];
  let start = members.shift();
  let end = start;
  let current;

  if (!start) return '';
  if (!members.length) return `${start}`;

  function emitRange() {
    if (!start) return;
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
  }

  do {
    current = members.shift();
    if (current === end + 1) {
      end = current;
    } else {
      emitRange();
      start = end = current;
    }
  } while (members.length);

  emitRange();

  return `<${ranges.join(',')}>`;
}

function addHostToGroup(host) {
  const match = host.match(HOST);
  if (!match) {
    throw new Error(`Invalid host: ${JSON.stringify(host)}`);
  }
  const prefix = match[1];
  const index = match[2];
  const postfix = match[3];
  const key = prefix + postfix;

  if (index === '') {
    this.simple.push(prefix + postfix);
    return;
  }

  const group = (this.sets[key] = this.sets[key] || {
    prefix,
    postfix,
    members: [],
  });
  group.members.push(+index);
}

function abbreviate(hosts) {
  if (!Array.isArray(hosts)) {
    throw new TypeError(`abbreviate(string[]): \`${hosts}\` is not an array`);
  }
  if (hosts.length < 1) return '';

  const sets = {};
  const simple = [];
  hosts.forEach(addHostToGroup, { sets, simple });

  function abbreviateGroup(key) {
    const group = sets[key];
    const members = group.members.sort(byNumeric);
    return group.prefix + buildRanges(members) + group.postfix;
  }

  return Object.keys(sets)
    .map(abbreviateGroup)
    .concat(simple)
    .sort()
    .join(',');
}
exports.abbreviate = abbreviate;
