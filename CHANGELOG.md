### 1.1.5

* chore(deps): bump ini from 1.3.5 to 1.3.8 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#4](https://github.com/groupon/host-pattern/pull/4)
  - [`5af34f0`](https://github.com/groupon/host-pattern/commit/5af34f0d46fcc5c8983c8316634f4616feaf6d07) **chore:** bump ini from 1.3.5 to 1.3.8 - see: [v1](- [Commits](https://github.com/isaacs/ini/compare/v1)


### 1.1.4

* chore(deps): bump lodash from 4.17.15 to 4.17.19 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#3](https://github.com/groupon/host-pattern/pull/3)
  - [`51a9cfa`](https://github.com/groupon/host-pattern/commit/51a9cfa527f4605326a4718a0695d7517aaac03f) **chore:** bump lodash from 4.17.15 to 4.17.19 - see: [4](- [Commits](https://github.com/lodash/lodash/compare/4)


### 1.1.3

* chore(deps): bump acorn from 7.1.0 to 7.1.1 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#2](https://github.com/groupon/host-pattern/pull/2)
  - [`e2de6b0`](https://github.com/groupon/host-pattern/commit/e2de6b0fb9add86e5b6cdf3321cd5843a544d343) **chore:** bump acorn from 7.1.0 to 7.1.1 - see: [7](- [Commits](https://github.com/acornjs/acorn/compare/7)


### 1.1.2

* initial refactor & publishing - **[@dbushong](https://github.com/dbushong)** [#1](https://github.com/groupon/host-pattern/pull/1)
  - [`6227d46`](https://github.com/groupon/host-pattern/commit/6227d4614dcbedbf16716c7dafed87ebdc73fa4b) **chore:** update package setup & lint
  - [`3bfb412`](https://github.com/groupon/host-pattern/commit/3bfb41285eb1e0e2acfe2447aa3a2792ae6e5900) **refactor:** move files to std locations
  - [`5c48dc3`](https://github.com/groupon/host-pattern/commit/5c48dc3ce5879006c310c10b646c1107cc882e9d) **chore:** remove unneeded devDep
  - [`3bac91f`](https://github.com/groupon/host-pattern/commit/3bac91f7243f1573db793ddc5570f1346c7eefd4) **chore:** npm audit fix


1.1.1
-----
* Only publish index.js - @jkrems
  https://github.com/jkrems/host-pattern/pull/3

1.1.0
-----
* Added `abbreviate(hosts: string[])` - @jkrems
  https://github.com/jkrems/host-pattern/pull/2
  - Add validation for abbr argument
  - Make expand(abbr([])) work, clean up reduce
  - Fix bug where non-numbered hosts could vanish
  - Remove superfluous `[]`
  - Support for abbreviate

1.0.0
-----
* Initial version with support for `expand`
