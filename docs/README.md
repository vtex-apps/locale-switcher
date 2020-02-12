📢 Use this project, [contribute](https://github.com/vtex-apps/locale-switcher) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

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

| CSS Handles    |
| -------------- |
| `buttonText`   |
| `button`       |
| `listElement`  |
| `list`         |
| `localeIdText` |
| `container`    |
