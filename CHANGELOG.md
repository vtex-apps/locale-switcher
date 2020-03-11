# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Loading state when the query is being made.

### Changed
- Make the query of supported languages only when the user interacts with the `LocaleSwitcher`.

## [0.5.4] - 2020-02-13
### Added
- A wrapper for the locale switcher to prevent the container from growing if the parent is `flex` and a `relativeContainer` handle.

## [0.5.3] - 2020-02-12
### Fixed
- Missing handling for `null` `currentBinding`.

## [0.5.2] - 2020-02-12
### Fixed
- Disappearing in the first render after a locale change.

## [0.5.1] - 2020-01-09

## [0.5.0] - 2020-01-06
### Changed
- Component now renders on SSR

## [0.4.0] - 2019-12-12
### Changed
- Gets languages from binding and fallbacks to messages info

## [0.3.0] - 2019-10-24
### Added
- All CSS handles.

## [0.2.3] - 2019-09-23
### Fixed
- Fix supported locales

## [0.2.2] - 2019-09-10

### Changed
- Make render strategy `client`, i.e. component assets are fetched client-side with same priority as server-side blocks.

## [0.2.1] - 2019-08-29

## [0.2.0] - 2019-08-14

## [0.2.0-beta] - 2019-08-13

### Changed
- Make locale switcher lazy.

## [0.1.2] - 2019-06-27
### Fixed
- Build assets with new builder hub.

## [0.1.1] - 2019-05-28
### Added
- `LocaleSwitcher` component.

## [0.1.0] - 2019-05-28
