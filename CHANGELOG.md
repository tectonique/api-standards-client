# 📜 Changelog

# 📖 Table of contents

<!-- TOC -->
* [📜 Changelog](#-changelog)
* [📖 Table of contents](#-table-of-contents)
* [0.x.y](#0xy)
  * [0.0.7](#007)
  * [0.0.6](#006)
  * [0.0.5](#005)
  * [0.0.4](#004)
  * [0.0.3](#003)
  * [0.0.2](#002)
  * [0.0.1](#001)
<!-- TOC -->

# 0.x.y

## 0.0.7
- createProblemDetailHandler has now properly inferred return type
- handleProblemDetail has now properly inferred return type

## 0.0.6
- Fixed: Verbs must always return success envelope.

## 0.0.5
- Changed create typed axios function to emit verbs that now reject problem details.
- For handling problem details in catch clauses, the create typed axios function now returns two utility functions too. They allow handling problem details / creating problem detail handler.

## 0.0.4
- Changed export structure.

## 0.0.3
- axios is now a peer dependency.
- Extract client problem details into sub folder as it will later be shared with other adapters as well..

## 0.0.2
- Published dist/ build.y

## 0.0.1
- Initial release.
- Axios type safety wrapper.