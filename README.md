# The A-Term
A terminal for quickly and easily navigating and searching Appian

## Installing
1. Install the Tampermonkey extension for your browser. Found [here](https://tampermonkey.net/)
2. Browse to the [userscript](https://raw.githubusercontent.com/planted-dev/the-a-term/main/a-terminal.user.js)
3. When prompted by Tampermonkey click install
4. Browse to your Appian environment, or CTRL+F5 to refresh any page you are currently on

If not prompted to install by Tampermonkey, the userscript can be manually installed by opening the Tampermonkey dashboard, browsing to the Utilities tab, pasting the userscript [URL](https://raw.githubusercontent.com/planted-dev/the-a-term/main/the-a-term.user.js) into the URL field and clicking import

### Keyboard Navigation
| Description                 | Key       |
| --------------------------- | --------- |
| Show/hide terminal          | CTRL (x2) |
| Clear terminal              | ESC       |
| Autocomplete/cycle commands | TAB       |
| Navigate search results     | UP/DOWN   |
| Do command                  | ENTER     |

### Keyboard Shortcuts
| Description         | Shortcut         |
| ------------------- | ---------------- |
| Go to admin         | CTRL+ALT+SHIFT+A |
| Go to design        | CTRL+ALT+SHIFT+D |
| New expression rule | CTRL+ALT+SHIFT+E |
| New interface       | CTRL+ALT+SHIFT+I |
| Go to monitoring    | CTRL+ALT+SHIFT+M |
| Go to objects       | CTRL+ALT+SHIFT+O |
| Go to users (admin) | CTRL+ALT+SHIFT+U |

## Acknowledgments

* [Appian](appian.com)
* All the people I've used as guinea pigs to find bugs