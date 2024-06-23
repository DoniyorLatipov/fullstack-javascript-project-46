# Gendiff

### Hexlet tests and linter status:

[![Actions Status](https://github.com/DoniyorLatipov/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/DoniyorLatipov/fullstack-javascript-project-46/actions)
[![Node CI](https://github.com/DoniyorLatipov/fullstack-javascript-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/DoniyorLatipov/fullstack-javascript-project-46/actions/workflows/nodejs.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7d3e5b5dd5b833e988f0/test_coverage)](https://codeclimate.com/github/DoniyorLatipov/fullstack-javascript-project-46/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/7d3e5b5dd5b833e988f0/maintainability)](https://codeclimate.com/github/DoniyorLatipov/fullstack-javascript-project-46/maintainability)

### Description:

Node.js console-based application for generating diff between configuration files. Supported formats: JSON, YAML, INI (XML soon).

###Installation:

```bash
make build
```

### Usage

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version         output the version number
  -f, --format  [type]  output format (default: "stylish")
  -h, --help            output usage information
```

### Demo video:

[![asciicast](https://asciinema.org/a/jyrTr6E9btKo76sdrUqrB7l14.svg)](https://asciinema.org/a/jyrTr6E9btKo76sdrUqrB7l14)

### Example:

- **file1.json**

```json
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": {},
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

- **file2.yaml**

```yaml
---
common:
  follow: false
  setting1: Value 1
  setting3:
  setting4: blah blah
  setting5:
    key5: value5
  setting6:
    key: {}
    ops: vops
    doge:
      wow: so much
group1:
  foo: bar
  baz: bars
  nest: str
group3:
  deep:
    id:
      number: 45
  fee: 100500
```

#### Formats (stylish/plain/json):

- **Stylish:**

[Demo stylish-format](https://asciinema.org/a/KgQMC1YJPDAdjCUIXo3LvvHdr 'Demo stylish-format')

```bash
genndiff gendiff file1.json file2.yaml #-f stylish

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: {}
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

- **Plain:**

[Demo plain-format](https://asciinema.org/a/CtNXRiBTo9BhBie6ydCHpRymL 'Demo plain-format')

```bash
genndiff gendiff file1.json file2.yaml -f plain

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

- **JSON:**

[Demo json-format](https://asciinema.org/a/p3zs5063MP4xUk1YyPS5zu84K 'Demo json-format')

```bash
genndiff gendiff file1.json file2.yaml -f json

{
  "changed": {
    "common.setting3": {
      "old": true,
      "new": null
    },
    "common.setting6.doge.wow": {
      "old": "",
      "new": "so much"
    },
    "group1.baz": {
      "old": "bas",
      "new": "bars"
    },
    "group1.nest": {
      "old": {
        "key": "value"
      },
      "new": "str"
    }
  },
  "added": {
    "common.follow": false,
    "common.setting4": "blah blah",
    "common.setting5": {
      "key5": "value5"
    },
    "common.setting6.ops": "vops",
    "group3": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  },
  "removed": {
    "common.setting2": 200,
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  }
}
```

### Testing and Linting:

The **Jest** framework was used for testing, and **Eslint** based on **airbnb** was used for linting.

```bash
#run tests
make test

#run test-coverage
make test-coverage

#run linting
make lint
```
