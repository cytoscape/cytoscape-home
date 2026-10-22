# The road ahead for Cytoscape

Cytoscape spans three components. **Cytoscape Desktop** is the powerful, app-rich workhorse for in-depth network biology; **Cytoscape Web** brings analysis and collaboration into the browser; and **Cytoscape.js** is the open-source graph library that developers build interactive networks on. This page sets out where each is heading — and the shared ecosystem that connects them.

| Component | Status |
| --- | --- |
| [Cytoscape Desktop](#desktop) | **v3.10.5** — current release |
| [Cytoscape Web](#web) | **In-browser** — live now |
| [Cytoscape.js](#cytoscapejs) | **On npm** — open-source library |

Cytoscape Desktop has been in continuous development since 2002, and is downloaded roughly 300,000 times a year.

**Contents:** [At a glance](#board) · [Desktop](#desktop) · [Cytoscape Web](#web) · [Cytoscape.js](#cytoscapejs) · [Shared ecosystem](#ecosystem) · [Process](#process) · [Release history](#history)

<a id="board"></a>

## At a glance

A living view of where effort is going. Items move from *Later* toward *Now* as work matures; dates firm up as releases approach.

### Now — Shipping

*Released or in active development*

- **Desktop:** Cytoscape **3.10.5** — faster, deterministic selected-node layouts; streamlined spreadsheet-style table copying; table, task-history, and session fixes; and App Store update alerts.
- **Web:** Cytoscape Web live at **<a href="https://web.cytoscape.org" target="_blank" rel="noopener noreferrer">web.cytoscape.org</a>** — in-browser visualization, styling, and NDEx-backed workspaces.
- **Cytoscape.js:** Mature graph library on npm — weekly patch and monthly feature releases keep turnaround fast.

### Next — Up next

*Targeted for the coming release cycle*

- **Desktop:** Cytoscape **3.11** (Spring 2027) — Java 25 support and an upgraded REST framework for CyREST.
- **Both (Desktop & Web):** Web ↔ notebook interoperability and tighter **Open in Cytoscape** round-tripping.
- **Web:** Release **v1.1.0** (Aug 2026) — App API v1.0 and image export support.
- **Cytoscape.js:** Ongoing v3 API refinements and rendering performance, tracked in the GitHub milestones.

### Later — Exploring

*Direction set, scope still forming*

- **Web:** Expanding the Web App ecosystem; deprecate the raw Module Federation store once the new API lands.
- **Both (Desktop & Web):** Deeper, near-costless NDEx integration as the natural home for networks and workspaces.
- **Web:** Additional rendering engines (e.g. **Cell View**) and broader automation support in the browser.
- **Cytoscape.js:** Growing first- and third-party extension ecosystem — layouts, UI, and integrations.

<a id="desktop"></a>

## Cytoscape Desktop

### The full-featured workhorse

*Java desktop application · App Store ecosystem · 6-month release cadence*

Desktop remains the deepest environment for network biology — mature apps, large-network capacity, and full automation. Near-term work modernizes the runtime and tightens the bridge to the browser.

#### Next release: 3.11 (target: Spring 2027)

Planned themes & features:

- Java 25 support
- Upgraded REST framework for CyREST
- Service App support

Current release: `3.10.5` (Sep 2026). A preliminary feature list is published ahead of each release and frozen ten days before — see [Process](#process).

#### Longer-term vision

- **Core & Core Apps** — A lean Core handles reading, displaying, and writing networks; biology-aware *Core Apps* ship alongside it but update independently via the App Store — so features and fixes reach users without waiting for a full release.
- **Cytoscape Automation** — A *Commands* interface for user-style actions and a *Functions* interface for programmatic network manipulation, both exposed over CyREST — making reproducible, scriptable workflows first-class.
- **NDEx integration** — Loading and saving networks through NDEx as the default, with fast, near-costless sampling so exploration stays on-task and sharing is seamless.
- **Large language models & agentic AI** — A longer-term direction is to integrate Cytoscape Desktop with large language models and broaden support for agentic AI use cases. By publishing skill files tailored to different AI vendors, the project aims to let assistants and autonomous agents drive Cytoscape through its automation interfaces — turning plain-language goals into reproducible, auditable network analyses.

<a id="web"></a>

## Cytoscape Web

### Network biology in the browser

*Runs entirely client-side · React UI · NDEx-backed · live at <a href="https://web.cytoscape.org" target="_blank" rel="noopener noreferrer">web.cytoscape.org</a>*

Cytoscape Web brings visualization, data-driven styling, and collaborative workflows to any modern browser — no installation. It synchronizes an in-memory data store to the browser's IndexedDB and persists work through NDEx. As a newer tool it is still growing toward Desktop's depth, while pioneering capabilities of its own.

#### What's live now

- In-browser visualization with data-driven visual styles
- NDEx integration for network & workspace storage
- Import of CX2 and CSV; export to common image formats
- **Open in Cytoscape** hand-off to Desktop (requires 3.10+)
- Multiple rendering engines, including Cell View

#### Where it's heading

**Next feature release: v1.1.0 (target: Aug 2026)**

A bug-fix release, `v1.0.8`, will ship first, ahead of the v1.1.0 feature release.

- **App API v1.0 & image support** — Version 1.1.0 targets the first stable release of the App API (v1.0) — the recommended way to build Web apps — alongside image export support. The new API will eventually deprecate the current raw-store approach.

> Cytoscape Web is described in [*Cytoscape Web: bringing network biology to the browser*](https://doi.org/10.1093/nar/gkaf365), Nucleic Acids Research (2025).

<a id="comparison"></a>

#### Desktop ↔ Web feature comparison

The two tools are complementary. Desktop leads on analysis depth, apps, and sessions; Web leads on access, workspaces, and hierarchical/Cell views.

**Versions compared:** Cytoscape Web **v1.1.0** (released 2026-10-14) and Cytoscape Desktop **3.10.5** (released 2026-09-28). Last reviewed 2026-10-22. This table is the single source for the comparison and is updated with each Cytoscape Web release; see the [Cytoscape Web release notes](https://github.com/cytoscape/cytoscape-web/releases) for changes since.

| Functionality | Desktop 3.10.5 | Web 1.1.0 | Differences |
| --- | :---: | :---: | --- |
| Network Visualization | Full | Full | By default, Web doesn't open networks from NDEx with more than about 20,000 edges; each deployment can change this limit. |
| Visual Styles | Full | Mostly | Web lacks edge bends, edge label position, tooltips, node gradients, and bar, line and heat-map charts. Web keeps several named styles with each network, and they travel with it in CX2. |
| Table Editing | Full | Mostly | Web lacks the formula builder, column styles (cell colors, images, sparklines and so on) and Desktop's switch between showing all rows and only the selected ones. |
| Undo / Redo | Full | Mostly | In Web, Undo and Redo are only in the Edit menu, with no keyboard shortcut. Web keeps 20 steps per network, and some actions, such as importing a table or merging networks, can't be undone. |
| Filters | Full | Mostly | Web lacks the Chain tab (adjacency and interaction transformers) and filter types added by Desktop apps. Filter files can be exchanged between Web and Desktop. |
| Access to External Databases | Full | Partial | Web reaches NDEx (load, save and search, including private networks and folders) and enrichment services (iQuery, g:Profiler). Desktop also reaches STRING, WikiPathways, PSICQUIC and other sources through its network search bar and apps. |
| Import | Full | Partial | Web reads CX2, SIF and CSV/TSV/TXT, but not CX (v1), GraphML, XGMML, GML or Excel. |
| Export | Full | Partial | Web writes CX2, PNG, SVG and PDF, but not tables, GraphML, XGMML, SIF or style files. Web can send a network to a running Desktop. |
| Layout | Full | Partial | Web has nine built-in layouts, including Biological Flow and a GPU force layout, plus layouts added by apps. Web lacks Desktop's yFiles, Prefuse, edge-weighted and attribute layouts, and laying out only the selected nodes. |
| Layout Tools | Full | Partial | Web only scales (width, height or both), and always scales the whole network. It lacks rotate, align, distribute and stack. |
| Element Selection | Full | Partial | Web lacks a Select menu (all, none, invert, first neighbors, adjacent edges) and lasso selection. Click, box select, search, table rows and filters all select. |
| Network Editing & Operation | Full | Partial | Web lacks copy and paste, creating a network from a selection, and hiding or showing the selected elements. Web can add and delete nodes and edges, duplicate a network and merge networks. |
| Annotations | Full | Partial | Web only displays shape, text and bounded-text annotations made in Desktop. It can't create or edit annotations, and doesn't draw arrow or image annotations. |
| Analysis Tools | Full | Partial | Most of Desktop's analysis comes from App Store apps, which don't run in Web. Web offers LLM Query on hierarchy networks and analyses run by service apps. |
| App interface | Full | Partial | Desktop apps don't run in Web. Web apps are React modules (Module Federation) or service apps written in any language. The Web App API is in beta (`1.0.0-beta.5`), and v1.1.0 made breaking changes. |
| App Store | Full | Partial | Web installs apps from the [App Store](https://apps.cytoscape.org) website or by URL. A saved workspace records which apps are installed, not the apps themselves; opening it loads each app again from its original address. Desktop also browses, searches and updates apps from inside the app. |
| Network Analyzer | Full | — | Web has no network statistics or centrality measures. |
| Element Group | Full | — | Web has no groups, meta-nodes or collapse/expand. |
| Session | Full | — | Web can't open or save `.cys` files. A workspace saved to NDEx fills this role, but the networks in it must be saved to NDEx too. |
| Hierarchical Network & Cell View | — | Full | Desktop has no viewer for HCX hierarchies; Web's Hierarchy Viewer includes the Cell View. |
| Workspace | — | Full | Desktop has no workspace; its closest equivalent is a `.cys` session file. Web keeps the workspace in the browser, shares it across browser tabs and saves it to NDEx. |

**Full** = fully supported · **Mostly** = common features supported, some less-used ones missing · **Partial** = some commonly used features missing · **—** = not supported

Manuals: [Cytoscape Web](https://cytoscape-web.readthedocs.io/en/latest/) · [Cytoscape Desktop](https://manual.cytoscape.org/en/stable/)

<a id="cytoscapejs"></a>

## Cytoscape.js

### The open-source graph library

*Pure JavaScript · runs in-browser or headless on Node.js · MIT licensed · `npm: cytoscape`*

Cytoscape.js is the developer-facing foundation of the platform — a dependency-free JavaScript library for modelling, analysing, and visualising networks. It can be embedded in web apps, websites, and servers, and underpins a wide range of third-party network viewers across research and industry.

**Release cadence: v3.x** — weekly patch · monthly feature

#### What it offers

- Graph-theory model plus an optional interactive canvas renderer
- One-line setup: `cytoscape({ elements, container })`
- Runs in all modern browsers, or headless under Node.js
- Pure JS, no dependencies — works with npm, Webpack, ES modules, or plain script tags
- Extensible via first- and third-party extensions (layouts, UI, integrations)
- MIT-licensed core and first-party extensions

#### Where it's heading

- **Stable, with steady momentum** — The version 3 API is mature; future work is planned openly through GitHub milestones. The weekly/monthly release rhythm gives contributors a fast feedback loop for both first- and third-party changes.
- **Foundation for the web ecosystem** — As the rendering and analysis layer behind many browser-based network tools, ongoing performance and API refinement benefits the whole community — including tools that complement Cytoscape Web.

> Documentation, downloads, and source live at *<a href="https://js.cytoscape.org" target="_blank" rel="noopener noreferrer">js.cytoscape.org</a>*. Cite the *Bioinformatics* papers ([2016](https://academic.oup.com/bioinformatics/article/32/2/309/1744007); [2023 update](https://academic.oup.com/bioinformatics/article/39/1/btad031/6988031)).

<a id="ecosystem"></a>

## Shared ecosystem

Some work spans both products. These shared foundations are what make Desktop and Web feel like one platform rather than two tools.

- **Automation & interoperability** — CyREST plus the Python and R client libraries let users drive Cytoscape from Jupyter and RStudio, building reproducible, scriptable workflows that scale beyond keyboard and mouse.
- **NDEx network commons** — NDEx is becoming the shared home for networks and workspaces — the connective tissue that lets a network move freely between Web, Desktop, and the wider cyberinfrastructure.
- **App Store & Collections** — The App Store remains the hub for community-built functionality, with Collections bundling the apps a given workflow needs. The new Web App API extends this model into the browser.
- **Community & outreach** — Documentation, tutorials, and an active developer community keep the platform learnable and extensible. Contributions to the roadmap are welcome through the community channels.

<a id="process"></a>

## Release process & policies

Cytoscape Desktop ships on a predictable cadence with milestone builds and frozen APIs along the way. Cytoscape Web, as a browser app, releases continuously, and Cytoscape.js ships weekly patch and monthly feature releases via npm. The policies below govern the Desktop cycle.

<details>
<summary><strong>Desktop release cadence & policies (P1–P11)</strong></summary>

| ID | Policy |
| --- | --- |
| P1 | A new Desktop version ships roughly every six months (~April 15 and ~November 15), with Core App updates to the App Store as needed. |
| P2 | High-risk Core features must land eight weeks before release, or they carry over to the next cycle. |
| P3 | Other features must land in the Core five weeks before release. |
| P4 | Reviewed bug fixes may land up to ten days before release. |
| P5 | External APIs (including CyREST) are frozen, documented, and preliminarily implemented eight weeks before release; a developer release is published. |
| P6 | Milestone builds are made available eight weeks, five weeks, and ten days before release — plus extra builds when needed. |
| P7 | Milestone and nightly builds are published via the developer Download page. |
| P8 | Emerging API definitions (or links to them) are posted on the developer Download page. |
| P9 | A preliminary feature list is published five months out, updated periodically, and frozen ten days before release. |
| P10 | Functionality is exercised heavily through external scripting (e.g. Python-driven tests) via Cytoscape Automation. |
| P11 | New Core App nominations are accepted until eight weeks before release; Core developers may accept them until five weeks before. Core Apps follow the same Q/A process as Core code. |

</details>

<a id="history"></a>

## Release history

Two decades of releases, kept tucked away so the roadmap stays forward-looking. Expand a track to browse the record.

<details>
<summary><strong>Cytoscape Desktop — recent releases (3.x)</strong></summary>

| Version | Date | Highlights |
| --- | --- | --- |
| 3.10.5 | 2026-09-28 | Faster, deterministic selected-node layouts; streamlined spreadsheet-style table copying; table, task-history, and session fixes; and App Store update alerts. |
| 3.10.4 | 2025-09-26 | Fixed Web-to-Desktop collection naming; style corruption on session close; group-move after reload; **Apply to Selected Nodes** layout button. |
| 3.10.3 | 2024-10-24 | Style Panel labels, root-network naming, column-naming enforcement, Equation Builder & group expand/collapse fixes, JavaFX update. |
| 3.10.2 | 2024-03-26 | Layout rotate/scale exposed in CyREST; SVG export under Japanese locale; Lucene wildcard search; minor fixes. |
| 3.10.1 | 2023-08-31 | Broader Java 17 support; minor bug fixes. |
| 3.10.0 | 2023-05-11 | Edge label rotation, lasso selection, table styles, new App Store panel, Apple-silicon native build, Java 17. |
| 3.9.0 | 2021-10-21 | 4K/Retina support, faster rendering, node-label rotation, SVG node images, Jupyter notebook support. |
| 3.8.0 | 2020-04-17 | Refreshed UI, dockable/floating panels, interactive performance at 10K nodes / 3M edges, Java 11. |
| 3.7.0 | 2018-10-22 | Much smaller installer, annotations, animated tooltips, Brewer color palettes, updated NDEx integration. |
| 3.6.0 | 2017-11-15 | Cytoscape Automation, CyBrowser integration, customizable toolbar, network search bar. |
| 3.3.0 | 2015-11-25 | Network Analyzer 1000× faster, GPU layouts/rendering, Core repackaged as upgradable apps, CyREST as a core app. |
| 3.0.0 | 2013-02-04 | Redesigned API, OSGi framework, clean model/view separation, new App Store and plugin architecture. |

**Earlier milestones:** 3.2 (2014) · 3.1 (2014) · 2.8 (2010) · 2.7 (2010) · 2.5 (2007) · 2.0 (2004) · 1.0 (2003) · 0.8 (Jul 2002, first release). Full version-by-version notes are available on request.

</details>

<details>
<summary><strong>Cytoscape Web — releases (1.x)</strong></summary>

| Version | Date | Highlights |
| --- | --- | --- |
| 1.0.7 | 2026-05 | Expanded app-integration capabilities: a preview version of the App API, runtime app registration, and improved in-browser app support. |
| 1.0.6 | 2026-03 | NDEx loading safeguards, numeric editing in layouts, color-palette reversal, and network-deletion navigation fixes. |
| 1.0.5 | 2026-02-14 | Major rework of the subnetwork (hierarchy) viewer with a new visibility-toggle approach, plus data-integrity fixes, performance optimizations, and internal codebase improvements. |
| 1.0.4 | 2025-09-12 | Splash screen, browser back/forward fixes, a CX2 validator, ring-chart support, a new viewport-state store, and network property editor fixes. |
| 1.0.3 | 2025-06-17 | HiView UI-blocking fixes, undo support, a URL parameter for the selected network view, improved file drag & drop, and selection/sharing fixes. |
| 1.0.2 | 2025-05-13 | Bug-fix release accompanying the *Nucleic Acids Research* paper: annotation rendering, CX2 import of network properties from URLs, column-type input fixes, and layout rename. |
| 1.0.1 | 2025-02-14 | Early fixes: workspace-saving improvements, local-network visibility and imported-time columns, and workspace-loading timing fixes. |
| 1.0.0 | 2025-01-30 | First public release of Cytoscape Web; reference build at <a href="https://web.cytoscape.org" target="_blank" rel="noopener noreferrer">web.cytoscape.org</a>. Introduced and described in *Nucleic Acids Research* (2025). Releases are archived via Zenodo. |

As a continuously deployed browser application, Cytoscape Web does not follow the six-month Desktop cadence; the reference build at <a href="https://web.cytoscape.org" target="_blank" rel="noopener noreferrer">web.cytoscape.org</a> always reflects the latest release.

</details>

<details>
<summary><strong>Cytoscape.js — releases (3.x)</strong></summary>

| Version | Date | Highlights |
| --- | --- | --- |
| 3.34.0 | 2026-06-02 | Latest release of the current **3.x** line. Published on npm (as `cytoscape`) on a weekly-patch / monthly-feature cadence, with every version archived via Zenodo. |
| 3.0.0 | 2017-04-11 | Major update with API improvements and breaking changes informed by v2 feedback; the 3.x line's enhancements are summarised in the 2023 *Bioinformatics* update. |
| 2.x | 2013–2016 | First stable series on npm (earliest **2.0.3**, Nov 2013, through the **2.7** releases in 2016); introduced and described in *Bioinformatics* (Franz et al., 2016). |
| Origin | 2012 | First published to npm in October 2012, beginning with the 2.0 pre-releases. |

Future versions are planned openly in the GitHub issue tracker's milestones. The library follows its own rapid npm cadence, independent of the Desktop and Web schedules.

</details>
