# Change Log

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