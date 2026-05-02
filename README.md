# typingcli

A new CLI generated with oclif

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/typingcli.svg)](https://npmjs.org/package/typingcli)
[![Downloads/week](https://img.shields.io/npm/dw/typingcli.svg)](https://npmjs.org/package/typingcli)

<!-- toc -->

- [typingcli](#typingcli)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g typingcli
$ typingcli COMMAND
running command...
$ typingcli (--version)
typingcli/0.0.0 darwin-arm64 node-v22.15.0
$ typingcli --help [COMMAND]
USAGE
  $ typingcli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`typingcli help [COMMAND]`](#typingcli-help-command)
- [`typingcli login EMAIL`](#typingcli-login-email)
- [`typingcli logout`](#typingcli-logout)
- [`typingcli plugins`](#typingcli-plugins)
- [`typingcli plugins add PLUGIN`](#typingcli-plugins-add-plugin)
- [`typingcli plugins:inspect PLUGIN...`](#typingcli-pluginsinspect-plugin)
- [`typingcli plugins install PLUGIN`](#typingcli-plugins-install-plugin)
- [`typingcli plugins link PATH`](#typingcli-plugins-link-path)
- [`typingcli plugins remove [PLUGIN]`](#typingcli-plugins-remove-plugin)
- [`typingcli plugins reset`](#typingcli-plugins-reset)
- [`typingcli plugins uninstall [PLUGIN]`](#typingcli-plugins-uninstall-plugin)
- [`typingcli plugins unlink [PLUGIN]`](#typingcli-plugins-unlink-plugin)
- [`typingcli plugins update`](#typingcli-plugins-update)

## `typingcli help [COMMAND]`

Display help for typingcli.

```
USAGE
  $ typingcli help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for typingcli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/6.2.45/src/commands/help.ts)_

## `typingcli login EMAIL`

log into MonkeyType by first providing email

```
USAGE
  $ typingcli login EMAIL

ARGUMENTS
  EMAIL  email address

DESCRIPTION
  log into MonkeyType by first providing email

EXAMPLES
  $ typingcli login
```

_See code: [src/commands/login.ts](https://github.com/znseaman/typingcli/blob/v0.0.0/src/commands/login.ts)_

## `typingcli logout`

describe the command here

```
USAGE
  $ typingcli logout

DESCRIPTION
  describe the command here

EXAMPLES
  $ typingcli logout
```

_See code: [src/commands/logout.ts](https://github.com/znseaman/typingcli/blob/v0.0.0/src/commands/logout.ts)_

## `typingcli plugins`

List installed plugins.

```
USAGE
  $ typingcli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ typingcli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/index.ts)_

## `typingcli plugins add PLUGIN`

Installs a plugin into typingcli.

```
USAGE
  $ typingcli plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into typingcli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TYPINGCLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TYPINGCLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ typingcli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ typingcli plugins add myplugin

  Install a plugin from a github url.

    $ typingcli plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ typingcli plugins add someuser/someplugin
```

## `typingcli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ typingcli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ typingcli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/inspect.ts)_

## `typingcli plugins install PLUGIN`

Installs a plugin into typingcli.

```
USAGE
  $ typingcli plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into typingcli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TYPINGCLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TYPINGCLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ typingcli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ typingcli plugins install myplugin

  Install a plugin from a github url.

    $ typingcli plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ typingcli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/install.ts)_

## `typingcli plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ typingcli plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ typingcli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/link.ts)_

## `typingcli plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ typingcli plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ typingcli plugins unlink
  $ typingcli plugins remove

EXAMPLES
  $ typingcli plugins remove myplugin
```

## `typingcli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ typingcli plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/reset.ts)_

## `typingcli plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ typingcli plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ typingcli plugins unlink
  $ typingcli plugins remove

EXAMPLES
  $ typingcli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/uninstall.ts)_

## `typingcli plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ typingcli plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ typingcli plugins unlink
  $ typingcli plugins remove

EXAMPLES
  $ typingcli plugins unlink myplugin
```

## `typingcli plugins update`

Update installed plugins.

```
USAGE
  $ typingcli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.62/src/commands/plugins/update.ts)_

<!-- commandsstop -->
