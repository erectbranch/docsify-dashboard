<div align="center">

# docsify-dashboard

[![NPM Release](https://img.shields.io/npm/v/docsify-dashboard.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/docsify-dashboard)
[![License: MIT](https://img.shields.io/badge/License-GPLv3-yellow.svg?style=flat-square)](https://github.com/erectbranch/docsify-dashboard/blob/master/LICENSE)

A plugin for [Docsify](https://docsify.js.org/#/) that creates a dashboard from a JSON file.

![demo](demo.png)

</div>

## Import

To use the image slider, you need to include the plugin in your Docsify `index.html` file:

> **Note:** This plugin requires [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/#/) plugin. (Make sure to include it after the docsify-dashboard plugin)

**Add stylesheet**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify-dashboard/dist/dashboard.min.css">
```

**Add script**

```html
<script src="//cdn.jsdelivr.net/npm/docsify-dashboard/dist/docsify-dashboard.min.js"></script>

<!-- The docsify-tabs plugin (must be included after the docsify-dashboard plugin) -->
<script src="https://cdn.jsdelivr.net/npm/docsify-tabs@1/dist/docsify-tabs.min.js"></script>
```

---

## Usage

> Default metadata path: `metadata/posts.json`

1. Create a JSON file with the metadata of the posts. The metadata should be structured as follows:

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
            "subtitle": "A beautiful city in Australia"   // Optional
        }
    ]
    ```

2. To create an dashboard slider, just add the following code to your markdown file:

    ```markdown
    <!-- tabs:start -->

    <!-- dashboard -->

    <!-- tabs:end -->
    ```

---

## Configuration

To configure the slider, you can set options in your `index.html` file. The available options are:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `numTabContent` | `Int` | 3 | Number of tabs to show in the one slider. |
| `metadataUrl` | `String` | metadata/posts | JSON URL to fetch metadata. |

```javascript
window.$docsify = {
  dashboard: {
    numTabContent: 3,
    metadataUrl: 'metadata/posts'       // do not include '.json' extension
  },

  tabs: {
    theme: 'material' // We recommend 'material' theme for the docsify-tabs
  },
};
```

---

## Customization

The slider can be customized using CSS. You can override the following CSS variables.

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
| `--dashboard-card-date-font-size` | The font size of the date text. |
| `--dashboard-card-date-color` | The color of the date text. |
| `--dashboard-card-img-min-width` | The minimum width of the image. |
| `--dashboard-card-img-min-height` | The minimum height of the image. |
| `--dashboard-card-img-max-height` | The maximum height of the image. |

To change the transition effect and the size of the slider, you can add the following styles to your `index.html` file:

```html
<style>
  :root {
    /* card style */
    --dashboard-card-border-radius: 5px;
    --dashboard-card-margin-top: 10px; 
    --dashboard-card-bg-color: #ffffff; 
    --dashboard-card-max-width: 300px;
    --dashboard-card-min-height: 220px;
    --dashboard-card-shadow: 0 0.3em 0.3em rgba(0,0,0,0.2);

    /* card text */
    --dashboard-card-text-align: left; 
    --dashboard-card-text-color: #000000;
    --dashboard-card-title-font-size: 1.1rem; 
    --dashboard-card-title-font-weight: bolder; 
    --dashboard-card-date-font-size: 1rem; 
    --dashboard-card-date-color: #808080;

    /* card image */
    --dashboard-card-img-min-width: 100%;
    --dashboard-card-img-min-height: 160px;
    --dashboard-card-img-max-height: 160px;
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