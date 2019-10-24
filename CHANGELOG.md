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
