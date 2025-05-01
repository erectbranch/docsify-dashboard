<div align="center">

# docsify-dashboard

[![NPM Release](https://img.shields.io/npm/v/docsify-dashboard.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/docsify-dashboard)
[![License: MIT](https://img.shields.io/badge/License-GPLv3-yellow.svg?style=flat-square)](https://github.com/erectbranch/docsify-dashboard/blob/master/LICENSE)

A plugin for [Docsify](https://docsify.js.org/#/) that creates a dashboard from a metadata.

![demo](demo.png)

</div>

## Import

To use the dashboard, you need to include the plugin in your Docsify `index.html` file:

> **Note:** This plugin requires [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/#/) plugin. (Make sure to include it after the docsify-dashboard plugin)

**Add stylesheet**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify-dashboard@2.2.0/dist/dashboard.min.css">
```

**Add script**

```html
<script src="//cdn.jsdelivr.net/npm/docsify-dashboard@2.2.0/dist/docsify-dashboard.min.js"></script>

<!-- The docsify-tabs plugin (must be included after the docsify-dashboard plugin) -->
<script src="https://cdn.jsdelivr.net/npm/docsify-tabs@1/dist/docsify-tabs.min.js"></script>
```

## Usage

### Dashboard

1. Create a metadata file(`metadata/posts.json`) of the posts. The metadata should be structured as follows:

    > **Notes** "*subtitle*" information is optional

    ```json
    [
        {
            "time": "2025.04.06",
            "title": "Shanwei, China",
            "tag": "5 min read",
            "image": "assets/images/shanwei.jpg",
            "href": "#/topic-one"
        },
        {
            "time": "2025.04.05",
            "title": "Melbourne, Australia",
            "tag": "3 min read",
            "image": "assets/images/melbourne.png",
            "href": "#/topic-two",
            "subtitle": "A beautiful city in Australia"
        }
    ]
    ```

2. To create an dashboard, just add the following code to your markdown file:

    ```markdown
    <!-- tabs:start -->

    <!-- dashboard -->

    <!-- tabs:end -->
    ```

### Tag-Dashboard

1. Create a empty markdown file for rendering the tag dashboard(`tags.md`)

    ```bash
    docs/
    ├── metadata/
    │   └── posts.json
    ├── index.html
    └── tags.md
    ```

2. To create a sidebar tag list, just add the following code to your sidebar file(e.g. `_sidebar.md`):

    ```markdown
    <!-- tag-list -->
    ```

---

## Configuration

To configure the dashboard, you can set options in your `index.html` file. The available options are:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `numTabContent` | `Int` | 3 | Number of cards to show in a docsify-tabs slide. |
| `metadataUrl` | `String` | 'metadata/posts' | JSON URL to fetch metadata. |
| `sort` | `Boolean` | false | Sort the posts by time. (`YYYY.MM.DD`, `YYYY/MM/DD`) |
| `theme` | `String` | 'default' | Theme for the dashboard. (`default`, `cards`, `list`) |
| `tagboardTheme` | `String` | 'default' | Theme for the tag-dashboard. |


```javascript
window.$docsify = {
  dashboard: {
    numTabContent: 3,
    metadataUrl: 'metadata/posts',       // do not include '.json' extension
    sort: false,                         // sort the posts by time
    theme: 'default',                    // (1) default, (2) cards, (3) list
    tagboardTheme: 'default'             // options are same as above
  },

  tabs: {
    theme: 'material' // We recommend 'material' theme for the docsify-tabs
  },
};
```

---

## Customization

The dashboard can be customized using CSS. You can override the following CSS variables.

### Dashboard

| Style | Description |
| --- | --- |
| `--dashboard-card-border-radius` | The border radius of the card. |
| `--dashboard-card-margin-top` | The margin top of the card. |
| `--dashboard-card-bg-color` | The background color of the card. |
| `--dashboard-card-max-width` | The maximum width of the card. |
| `--dashboard-card-min-height` | The minimum height of the card. |
| `--dashboard-card-shadow` | The shadow of the card. |
| `--dashboard-card-text-align` | The text alignment of the card. |
| `--dashboard-card-text-color` | The text color of the card. |
| `--dashboard-card-title-font-size` | The font size of the title text. |
| `--dashboard-card-title-font-weight` | The font weight of the title text. |
| `--dashboard-card-subtitle-font-size` | The font size of the subtitle text. |
| `--dashboard-card-subtitle-color` | The color of the subtitle text. |
| `--dashboard-card-date-font-size` | The font size of the date text. |
| `--dashboard-card-date-color` | The color of the date text. |
| `--dashboard-card-img-min-width` | The minimum width of the image. |
| `--dashboard-card-img-min-height` | The minimum height of the image. |
| `--dashboard-card-img-max-height` | The maximum height of the image. |
| `--dashboard-list-theme-max-width` | The maximum width of the `list` theme. |
| `--dashboard-list-theme-img-max-width` | The maximum width of the image in the `list` theme. |

To change the styles, you can add the following CSS to your `index.html` file:

```html
<style>
  /* default */
  :root {
    /* card style */
    --dashboard-card-border-radius: 5px;
    --dashboard-card-margin-top: 10px; 
    --dashboard-card-bg-color: #ffffff; 
    --dashboard-card-max-width: 330px;
    --dashboard-card-min-height: 220px;
    --dashboard-card-shadow: 0 0.3em 0.3em rgba(0,0,0,0.2);

    /* card text */
    --dashboard-card-text-align: left; 
    --dashboard-card-text-color: #000000;
    --dashboard-card-title-font-size: 1.2rem; 
    --dashboard-card-title-font-weight: bolder;
    --dashboard-card-subtitle-font-size: 1rem; 
    --dashboard-card-subtitle-color: #808080; 
    --dashboard-card-date-font-size: 0.8rem; 
    --dashboard-card-date-color: #808080;

    /* card image */
    --dashboard-card-img-min-width: 100%;
    --dashboard-card-img-min-height: 160px;
    --dashboard-card-img-max-height: 160px;

    /* list theme */
    --dashboard-list-theme-max-width: var(--content-max-width, 100%);
    --dashboard-list-theme-img-max-width: 200px;
  }
</style>
```

### Tag-Dashboard

| Style | Description |
| --- | --- |
| `--tags-bg-color` | The background color of the tag. |
| `--tags-font-color` | The font color of the tag. |
| `--tags-font-size` | The font size of the tag. |
| `--tags-margin-top` | The top margin size of the tag. |

To change the tag-list styles, add the following CSS:

```html
<style>
  /* default */
  :root {
    --tags-bg-color: #fafbfbff;
    --tags-font-color: #54cca7ff;
    --tags-font-size: var(--base-font-size);
    --tags-margin-top: 5px;
  }
</style>
```

---

## License

This project is licensed under the GNU General Public License v3.0.

- Original work © 2023–2025 李亦楊 ([@pikapikapikaori](https://github.com/pikapikapikaori))

- Modified work © 2025 Sungjae Jeon ([@erectbranch](https://github.com/erectbranch))

See [LICENSE](LICENSE) for more details.

---

## Contribution

Please feel free to submit a pull request or open an issue on the GitHub repository. Your contributions are welcome and appreciated!

---