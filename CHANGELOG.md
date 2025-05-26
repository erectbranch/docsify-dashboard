# Change Log

## 3.0.0

_2025-05-26_

### Added

- Extended the plugin to support a `pagination` feature.

- Added support for "*category*" information in the metadata. (e.g., `<!-- dashboard:categoryName -->`)

- Added span elements for tabs and tag-dashboard. (`dashboard-tab`, `tag-dashboard-title`)

### Changed

- Fixed an issue when using multiple dashboards on the same page.

- The `material` theme is automatically applied to the Docsify-Tabs theme when the dashboard is included.

## 2.3.1

_2025-05-20_

### Changed

- Fixed the issue where the tag list was not rendering properly in the markdown.

## 2.3.0

_2025-05-19_

### Added

- Added support for rendering tag list in the markdown section.

### Changed

- Added a id attribute for the tag list in the sidebar.

- Added `:root` variables for the tag styles in the sidebar.

## 2.2.1

_2025-05-01_

### Changed

- Added a `:root` variable for image styles.

## 2.2.0

_2025-05-01_

### Added

- Added the tag-dashboard theme customization. (`tagboardTheme` **option**)

### Changed

- Added a `:root` variable for `list` theme customization.

- Fixed the issue where the `list` theme styles was not working properly.

## 2.1.0

_2025-05-01_

### Added

- Added the theme customization. (`theme` **option**)

- Added support for sorting posts in "*time*" format. (`sort` option)

### Changed

- Changed the default styles. (max-width, margin, etc.)

- Added `:root` variables for "*subtitle*" styles.

## 2.0.0

_2025-04-30_

### Added

- Extended the plugin to support a tag-dashboard.

- Added a tag list feature to the sidebar.

### Changed

- Fixed an issue where the `buildPageFromJson()` function was not working properly.

## 1.1.0

_2025-04-30_

### Added

- Added support for "*subtitle*" information in the metadata.

- Added support for Array type in the "*tag*" metadata.

### Changed

- Changed the card styles to be aligned at the top.

## 1.0.2

_2025-04-17_

### Changed

- Changed the default card styles. (`AddTocPage.css`)

## 1.0.1

_2025-04-17_

### Changed

- Added more `:root` variables for card styles to `AddTocPage.css` for easier customization.

## 1.0.0

_2025-04-17_

### Added

- Initial release of the Docsify Dashboard plugin.

### Changed
- `AddTocPage.js`, `AddTocPage.css` from [pikapikapikaori/pikapikapi-blog](https://github.com/pikapikapikaori/pikapikapi-blog).
  - Updated license header to reflect modified work under GPLv3.
  - Changed style variables using `:root`. (customizable border-radius, background color, max-width, etc.)
  - Added `dashboardPlugin()` function to add posts from the metadata file (`metadata/posts.json`).