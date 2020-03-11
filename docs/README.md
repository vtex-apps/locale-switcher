📢 Use this project, [contribute](https://github.com/vtex-apps/locale-switcher) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Locale Switcher

The VTEX LocaleSwitcher is a VTEX component capable of changing the current language of the store.

![img-locale-switcher](https://user-images.githubusercontent.com/27777263/74359290-c2b5f700-4da1-11ea-8612-c05ccf1988d5.png)

## Configuration

1. Import the locale-switcher's app to your theme's dependencies in the `manifest.json`, for example:

```json
"dependencies": {
  "vtex.locale-switcher": "0.x"
}
```

2. Add the `locale-switcher` block to your header. For example:

```jsonc
"header-row#desktop": {
  "children": [
    // (...)
    "locale-switcher",
    "login",
    "minicart.v2"
  ]
},
```

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles         |
| ------------------- |
| `button`            |
| `buttonText`        |
| `container`         |
| `list`              |
| `listElement`       |
| `localeIdText`      |
| `relativeContainer` |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!