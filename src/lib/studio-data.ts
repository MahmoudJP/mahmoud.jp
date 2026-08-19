export type StudioProject = {
  slug: string;
  name: string;
  initials: string;
  platform: string;
  repository: string;
  localPath: string;
  visibility: "Public" | "Private";
  branch: string;
  latest: string;
  commit: string;
  stable: string;
  live: string;
  state: string;
  updated: string;
  publicSummary: string;
  skills: string[];
  runSummary: string;
  buildFootprint: string;
  runOptions: StudioRunOption[];
  importantFiles: StudioProjectFile[];
  fallbackEdits: StudioProjectEdit[];
  featured?: boolean;
};

export type StudioRunOption = {
  label: string;
  platform: string;
  kind: "online" | "download" | "local" | "build";
  status: "ready" | "local-only" | "needs-publish" | "needs-build";
  detail: string;
  href?: string;
  file?: string;
};

export type StudioProjectFile = {
  label: string;
  path: string;
  purpose: string;
};

export type StudioProjectEdit = {
  commit: string;
  date: string;
  title: string;
};

export const studioProjects: StudioProject[] = [
  {
    slug: "dtp-master",
    name: "DTP Master",
    initials: "DT",
    platform: "Windows · macOS",
    repository: "https://github.com/MahmoudJP/dtp-master",
    localPath: "dtp-master",
    visibility: "Private",
    branch: "import/local-v1.5",
    latest: "v1.5 development source validated",
    commit: "d9cd49e",
    stable: "v1.4",
    live: "v1.4 installer",
    state: "In development",
    updated: "Jul 2026",
    publicSummary: "A production workflow tool that turns complex multilingual DTP tasks into a repeatable desktop process.",
    skills: ["Python", "Desktop", "DTP automation"],
    runSummary: "The trusted Windows v1.4 installer is ready now. The latest v1.5 code is a separate development checkpoint and does not have a verified runnable package yet.",
    buildFootprint: "Windows v1.4 installer: 78.0 MB · v1.5 test package: not built",
    runOptions: [
      { label: "Download Windows v1.4", platform: "Windows", kind: "download", status: "ready", detail: "Current trusted installer. Remove it after testing if you do not want to keep the setup file.", href: "https://github.com/MahmoudJP/dtp-master-releases/releases/download/v1.4/DTP_Master_Setup_v1.4.exe" },
      { label: "Latest v1.5 test build", platform: "Windows", kind: "build", status: "needs-build", detail: "Latest source exists, but the full Tauri + Python package has not been produced and smoke-tested." },
      { label: "macOS test app", platform: "macOS", kind: "build", status: "needs-build", detail: "Must be built on macOS with its Python sidecar and permissions verified." },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Repository layout, source-of-truth rules, and release boundaries." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Safety and validation rules for AI work." },
      { label: "v1.5 UI guide", path: "versions/v1.5/ui/README.md", purpose: "Tauri, React, Rust, and Python development workflow." },
      { label: "Windows workflow", path: ".github/workflows/build-windows.yml", purpose: "Cloud build and installer artifact pipeline." },
      { label: "Release script", path: "DTP_MASTER_FINAL/release_v15.bat", purpose: "Protected Windows release and smoke-test process." },
    ],
    fallbackEdits: [
      { commit: "d9cd49e", date: "2026-07-26", title: "Import local v1.5 development source" },
      { commit: "fb8c3b5", date: "2026-04-14", title: "Add proprietary license" },
    ],
    featured: true,
  },
  {
    slug: "mahmoud-jp",
    name: "mahmoud.jp",
    initials: "MJ",
    platform: "Web · Vercel",
    repository: "https://github.com/MahmoudJP/mahmoud.jp",
    localPath: "mahmoud.jp",
    visibility: "Public",
    branch: "master",
    latest: "Studio operating system live with private structured records",
    commit: "992edd5",
    stable: "Studio launch",
    live: "mahmoud.jp",
    state: "Live",
    updated: "Aug 2026",
    publicSummary: "A multilingual portfolio and private Studio presenting DTP, language, product, and IT work through one personal brand.",
    skills: ["Next.js", "React", "Vercel"],
    runSummary: "The production website and private Studio run online. Local launchers are available for Windows and macOS development.",
    buildFootprint: "Production function: 13.63 MB · public assets: 5.77 MB",
    runOptions: [
      { label: "Open live website", platform: "Web", kind: "online", status: "ready", detail: "Current production deployment on the main domain.", href: "https://mahmoud.jp" },
      { label: "Windows local launcher", platform: "Windows", kind: "local", status: "local-only", detail: "Starts the latest local source after the repository is downloaded.", file: "OPEN-LOCAL-SITE.cmd" },
      { label: "macOS local launcher", platform: "macOS", kind: "local", status: "local-only", detail: "Starts the latest local source after the repository is downloaded.", file: "open-local-site.command" },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Setup, commands, and project overview." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Repository editing and publishing rules." },
      { label: "Studio status", path: "docs/STATUS.md", purpose: "Current Studio capabilities and deployment state." },
      { label: "AI handoff", path: "CHAT-HANDOFF.md", purpose: "Context for continuing the website with an AI assistant." },
    ],
    fallbackEdits: [
      { commit: "8d850a2", date: "2026-08-10", title: "Show current Studio deployment commit" },
      { commit: "781ce87", date: "2026-08-10", title: "Redesign Studio for fast project handoff" },
    ],
    featured: true,
  },
  {
    slug: "mylife",
    name: "MyLife",
    initials: "ML",
    platform: "Android · iOS · Web",
    repository: "https://github.com/MahmoudJP/mylife",
    localPath: "mylife",
    visibility: "Private",
    branch: "main",
    latest: "TypeScript typecheck passed",
    commit: "515c80e",
    stable: "Not tagged",
    live: "Not released",
    state: "In development",
    updated: "Jul 2026",
    publicSummary: "A cross-platform personal system for organizing the information and routines that shape everyday life.",
    skills: ["TypeScript", "Mobile", "Product design"],
    runSummary: "A web export is technically valid, while Android and iOS need native builds for device-only features such as widgets, Health Connect, notifications, and sensors.",
    buildFootprint: "Private web export validated: 19.19 MB · Android/iOS packages: not built",
    runOptions: [
      { label: "Private web preview", platform: "Web", kind: "online", status: "needs-publish", detail: "The 19.19 MB export works, but it is not published because this repository is private." },
      { label: "Android test app", platform: "Android", kind: "build", status: "needs-build", detail: "Needs an APK build; native widgets and Health Connect cannot be judged from the web export." },
      { label: "iOS test app", platform: "iOS", kind: "build", status: "needs-build", detail: "Needs a signed iOS build on macOS." },
      { label: "Local web launcher", platform: "macOS", kind: "local", status: "local-only", detail: "Starts Expo Web from the downloaded source.", file: "Open Web Preview.command" },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Product scope and development instructions." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Privacy and native validation rules." },
      { label: "Expo configuration", path: "app.json", purpose: "Platforms, permissions, widgets, and EAS project identity." },
      { label: "Android launcher", path: "Open Android Preview.command", purpose: "Local Android Studio and device workflow." },
    ],
    fallbackEdits: [
      { commit: "515c80e", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "9b97b87", date: "2026-07-26", title: "Initial clean project import" },
    ],
    featured: true,
  },
  {
    slug: "jlpt-master",
    name: "JLPT Master",
    initials: "JL",
    platform: "Web",
    repository: "https://github.com/MahmoudJP/jlpt-master",
    localPath: "jlpt-master",
    visibility: "Private",
    branch: "main",
    latest: "49 tests and full data validation passed",
    commit: "1d2d4e1",
    stable: "Build + data validated",
    live: "Not deployed",
    state: "Ready for private use",
    updated: "Aug 2026",
    publicSummary: "A focused Japanese study experience built around structured practice and measurable progress.",
    skills: ["React", "Testing", "Japanese learning"],
    runSummary: "The private offline-first PWA builds successfully and can run fully in a browser. It needs a protected web deployment before Studio can expose Try Online.",
    buildFootprint: "Validated private PWA export: 4.44 MB",
    runOptions: [
      { label: "Private online preview", platform: "Web / PWA", kind: "online", status: "needs-publish", detail: "Production build, 49 tests, and the full content audits pass; private hosting is the remaining step." },
      { label: "Local Windows launcher", platform: "Windows", kind: "local", status: "local-only", detail: "Installs locked dependencies on first run and opens the local Vite app.", file: "RUN-LOCAL.cmd" },
      { label: "Local macOS launcher", platform: "macOS", kind: "local", status: "local-only", detail: "Installs dependencies on first run and opens the local Vite preview.", file: "open-project.command" },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Features, validation, and local workflow." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Data, testing, and deployment rules." },
      { label: "PWA build configuration", path: "vite.config.ts", purpose: "Offline cache, app manifest, and test configuration." },
      { label: "Windows launcher", path: "RUN-LOCAL.cmd", purpose: "Double-click local preview with locked dependency installation." },
      { label: "Local launcher", path: "open-project.command", purpose: "Double-click development preview on macOS." },
    ],
    fallbackEdits: [
      { commit: "1d2d4e1", date: "2026-08-19", title: "Complete offline JLPT study upgrade" },
      { commit: "3217ff2", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "7df7bf5", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
  {
    slug: "cloudops-associate",
    name: "CloudOps Coach",
    initials: "CC",
    platform: "Windows · macOS",
    repository: "https://github.com/MahmoudJP/cloudops-associate",
    localPath: "cloudops-associate",
    visibility: "Private",
    branch: "main",
    latest: "v3.1.0 complete learning system",
    commit: "9a96555",
    stable: "v3.1.0 CI + Windows smoke test passed",
    live: "Private v3.1.0 test artifacts",
    state: "Ready for private testing",
    updated: "Aug 2026",
    publicSummary: "A bilingual AWS learning system with complete mock exams, guided labs, incident simulations, analytics, and encrypted cross-device progress sync.",
    skills: ["AWS CloudOps", "Tauri desktop", "Learning systems", "Encrypted sync"],
    runSummary: "Use the portable Windows app, Windows installer, Apple Silicon DMG, or local source launcher. The private GitHub artifacts are tied to commit 9a96555 and retained for 14 days; Studio Sync is live independently.",
    buildFootprint: "Web 6.17 MB · Windows artifact 14.33 MB · macOS artifact 10.92 MB",
    runOptions: [
      { label: "Configure encrypted study sync", platform: "Web / Desktop", kind: "online", status: "ready", detail: "Google-protected Studio page creates and revokes the key for end-to-end encrypted progress synchronization.", href: "/studio/cloudops-sync" },
      { label: "Windows portable + installers", platform: "Windows x64", kind: "download", status: "ready", detail: "Validated artifact contains a portable app.exe, MSI, and NSIS setup. The portable app passed a local launch smoke test.", href: "https://github.com/MahmoudJP/cloudops-associate/actions/runs/32259700447/artifacts/9368131237" },
      { label: "macOS test package", platform: "macOS Apple Silicon", kind: "download", status: "ready", detail: "Validated artifact contains CloudOps Coach 3.1.0 as an app bundle and DMG. It is private and unsigned/not notarized.", href: "https://github.com/MahmoudJP/cloudops-associate/actions/runs/32259700447/artifacts/9367818527" },
      { label: "Private web preview", platform: "Web", kind: "online", status: "needs-publish", detail: "The React/Vite build is ready but remains private and unpublished." },
      { label: "macOS local launcher", platform: "macOS", kind: "local", status: "local-only", detail: "Runs the browser UI from downloaded source and installs Node packages only on first use.", file: "run_dev.command" },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Features and fast local development workflow." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Cross-platform and data privacy rules." },
      { label: "Local launcher", path: "run_dev.command", purpose: "Fast browser preview on macOS." },
      { label: "Desktop configuration", path: "ui/src-tauri/tauri.conf.json", purpose: "Tauri application and bundle settings." },
      { label: "Runnable lab kit", path: "labs/README.md", purpose: "Safe deploy, verify, and cleanup workflow for the CloudFormation lab templates." },
      { label: "Current project status", path: "docs/STATUS.md", purpose: "Validation evidence, curriculum coverage, and remaining distribution constraints." },
      { label: "Private desktop workflow", path: ".github/workflows/desktop-build.yml", purpose: "Produces commit-specific Windows and macOS test artifacts without a public release." },
    ],
    fallbackEdits: [
      { commit: "9a96555", date: "2026-08-19", title: "Complete CloudOps Coach 3.1 learning system and private test packages" },
      { commit: "4c26bb3", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "8038f9e", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
  {
    slug: "koryuu",
    name: "Koryuu",
    initials: "KO",
    platform: "Web · Cloudflare",
    repository: "https://github.com/MahmoudJP/koryuu",
    localPath: "koryuu",
    visibility: "Public",
    branch: "main",
    latest: "Source and production build validated",
    commit: "a28cc5e",
    stable: "Source validated",
    live: "Not deployed",
    state: "Ready for review",
    updated: "Jul 2026",
    publicSummary: "A language-focused web product shaped by multilingual communication and practical Japanese use.",
    skills: ["Web", "Cloudflare", "Localization"],
    runSummary: "A complete static export is ready. Publishing the Cloudflare Pages preview requires reconnecting Wrangler to the Cloudflare account.",
    buildFootprint: "Validated public static export: 10.34 MB",
    runOptions: [
      { label: "Cloudflare web preview", platform: "Web", kind: "online", status: "needs-publish", detail: "Static build is ready; Cloudflare CLI authentication is currently missing." },
      { label: "Local macOS launcher", platform: "macOS", kind: "local", status: "local-only", detail: "Starts the latest local Next.js source.", file: "Open Koryuu.command" },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Product and site structure." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Cloudflare deployment and security rules." },
      { label: "Static export configuration", path: "next.config.ts", purpose: "Cloudflare-compatible output settings." },
      { label: "Local launcher", path: "Open Koryuu.command", purpose: "Double-click local development workflow." },
    ],
    fallbackEdits: [
      { commit: "a28cc5e", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "9ca08d3", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
  {
    slug: "mind-map",
    name: "Mind Map",
    initials: "MM",
    platform: "Interactive web",
    repository: "https://github.com/MahmoudJP/mind-map",
    localPath: "mind-map",
    visibility: "Public",
    branch: "main",
    latest: "Private cloud sync migration",
    commit: "bf444d7",
    stable: "v11 source",
    live: "Mahmoud Studio",
    state: "Active",
    updated: "Aug 2026",
    publicSummary: "A visual thinking canvas designed to capture ideas before they disappear and connect them over time.",
    skills: ["JavaScript", "UX", "Knowledge tools"],
    runSummary: "The latest static app is already integrated into the private Studio and runs online without a build or download.",
    buildFootprint: "Embedded static app: 0.36 MB",
    runOptions: [
      { label: "Open inside Studio", platform: "Web", kind: "online", status: "ready", detail: "Runs online with private Redis-backed synchronization.", href: "/studio/mind-map/index.html" },
      { label: "Open local HTML", platform: "Windows / macOS", kind: "local", status: "local-only", detail: "The repository index.html opens directly in a browser.", file: "index.html" },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Static build and source layout." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Private map data and publishing rules." },
      { label: "AI project context", path: "CLAUDE.md", purpose: "Detailed architecture and behavior reference." },
      { label: "Static application", path: "index.html", purpose: "Directly runnable generated application." },
    ],
    fallbackEdits: [
      { commit: "bf444d7", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "bc7e8a5", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
  {
    slug: "supernotch",
    name: "SuperNotch",
    initials: "SN",
    platform: "macOS",
    repository: "https://github.com/MahmoudJP/supernotch",
    localPath: "mac_20260720/SuperNotch",
    visibility: "Private",
    branch: "main",
    latest: "Source organized for Mac testing",
    commit: "0de21dd",
    stable: "Not tagged",
    live: "Not released",
    state: "Needs Mac testing",
    updated: "Jul 2026",
    publicSummary: "A focused macOS utility experiment built around improving a small but repeated interaction.",
    skills: ["macOS", "Utility", "Interaction design"],
    runSummary: "This native Swift app must be compiled on a Mac. Its double-click command builds and opens the app, but no portable app bundle is uploaded yet.",
    buildFootprint: "Native app source: 6.6 MB · distributable app: not built",
    runOptions: [
      { label: "Build & run on Mac", platform: "macOS 14+", kind: "local", status: "local-only", detail: "Double-clicking the command runs make build and opens .build/SuperNotch.app.", file: "SuperNotch.command" },
      { label: "Downloadable Mac app", platform: "macOS", kind: "build", status: "needs-build", detail: "Needs a Mac build, signing strategy, and privacy permission validation." },
    ],
    importantFiles: [
      { label: "Project guide", path: "README.md", purpose: "Features, requirements, building, signing, and notarization." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Private source and macOS testing rules." },
      { label: "Build & run launcher", path: "SuperNotch.command", purpose: "Double-click native build and launch." },
      { label: "Launch built app", path: "Launch SuperNotch.command", purpose: "Opens an app bundle that was already built locally." },
    ],
    fallbackEdits: [
      { commit: "0de21dd", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "a25fe0c", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
  {
    slug: "switcher",
    name: "Switcher",
    initials: "SW",
    platform: "macOS",
    repository: "https://github.com/MahmoudJP/switcher",
    localPath: "mac_20260720/Switcher",
    visibility: "Private",
    branch: "main",
    latest: "Source organized for Mac testing",
    commit: "93e8e69",
    stable: "Not tagged",
    live: "Not released",
    state: "Needs Mac testing",
    updated: "Jul 2026",
    publicSummary: "A compact macOS productivity experiment for switching context with less friction.",
    skills: ["macOS", "Productivity", "Prototype"],
    runSummary: "This arm64 Swift utility needs a Mac compile and Accessibility permission. A disposable app bundle can be produced later, but signing identity affects whether permissions survive rebuilds.",
    buildFootprint: "Native source: 2.0 MB · distributable app: not built",
    runOptions: [
      { label: "Build locally on Mac", platform: "macOS 14+", kind: "local", status: "local-only", detail: "Run build.sh, then open build/Switcher.app and grant Accessibility permission.", file: "build.sh" },
      { label: "Downloadable Mac app", platform: "macOS", kind: "build", status: "needs-build", detail: "Needs a stable signing decision so macOS permissions do not reset after every edit." },
    ],
    importantFiles: [
      { label: "English guide", path: "README.md", purpose: "Native app overview and usage." },
      { label: "Arabic guide", path: "README.ar.md", purpose: "Detailed architecture, history, permissions, and build notes." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Privacy, signing, and macOS validation rules." },
      { label: "Native build script", path: "build.sh", purpose: "Compiles and ad-hoc signs Switcher.app." },
    ],
    fallbackEdits: [
      { commit: "93e8e69", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "97a725a", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
  {
    slug: "snake",
    name: "Snake",
    initials: "SK",
    platform: "Web",
    repository: "https://github.com/MahmoudJP/snake",
    localPath: "snake",
    visibility: "Public",
    branch: "main",
    latest: "JavaScript syntax checks passed",
    commit: "ec31c40",
    stable: "Source validated",
    live: "Not deployed",
    state: "Complete",
    updated: "Jul 2026",
    publicSummary: "A compact browser game used to explore interaction, pacing, and polished small-screen behavior.",
    skills: ["JavaScript", "Game UI", "Web"],
    runSummary: "This is a static browser game: no build, installer, account, or runtime is required.",
    buildFootprint: "Direct static files: under 0.1 MB",
    runOptions: [
      { label: "Play online", platform: "Web", kind: "online", status: "ready", detail: "Runs directly in the private Studio preview.", href: "/studio/previews/snake/index.html" },
      { label: "Open local HTML", platform: "Windows / macOS", kind: "local", status: "local-only", detail: "Open index.html from the downloaded repository in any modern browser.", file: "index.html" },
    ],
    importantFiles: [
      { label: "Game entry", path: "index.html", purpose: "Directly runnable browser entry point." },
      { label: "Core engine", path: "js/core.js", purpose: "Stable game loop and extension API." },
      { label: "Project guide", path: "README.md", purpose: "Minimal local run instructions." },
      { label: "Agent rules", path: "AGENTS.md", purpose: "Browser validation and deployment rules." },
    ],
    fallbackEdits: [
      { commit: "ec31c40", date: "2026-07-26", title: "Record GitHub repository status" },
      { commit: "a4c2a53", date: "2026-07-26", title: "Initial clean project import" },
    ],
  },
];

export const featuredStudioProjects = studioProjects.filter((project) => project.featured);
