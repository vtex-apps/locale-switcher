📢 Use this project, [contribute](https://github.com/vtex-apps/locale-switcher) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Locale Switcher

The VTEX LocaleSwitcher is a VTEX component capable of changing the current language of the store.

![img-locale-switcher](https://user-images.githubusercontent.com/27777263/74359290-c2b5f700-4da1-11ea-8612-c05ccf1988d5.png)

## Configuration

1. Import the `locale-switcher`'s app to your theme's dependencies in the `manifest.json`, for example:

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

### locale-swicher-list

This block doesn't have any prop, you just have to use it and pass the `locale-switcher-item` as `children` of it.

### locale-switcher-item

The options of languages. This block accepts a `label` or you can pass `children` to it in case you want to render something like a country flag.

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `label` | `string` | Label of the item e.g. `EN, PT, JA, ES`... | `undefined` |
| `localeId` | `string` | The id of the locale | - |
| `display` | `DisplayMode` | The id of the locale | `'default'` |

### DisplayMode

| Value | Description |
| --- | --- |
| `'default'` | It will just render the element |
| `'none'` | It won't render anything |

## Customization

To apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles         |
| ------------------- |
| `button`            |
| `buttonText`        |
| `container`         |
| `list`              |
| `listElement`       |
| `localeIdText`      |
| `relativeContainer` |
