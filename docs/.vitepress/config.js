export default {
  title: "Stimulus Use",
  description: "A collection of composable behaviors for your Stimulus Controllers",
  ignoreDeadLinks: false,
  lastUpdated: true,
  themeConfig: {
    siteTitle: "",
    logo: "/stimulus-use-logo.png",
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stimulus-use/stimulus-use' }
    ],
    sidebar: [
      {
        text: "Documentation",
        collapsed: false,
        items: [
          { text: "Home", link: "/" },
          { text: "Getting Started", link: "/getting_started" },
          { text: "Usage", link: "/usage" },
          { text: "Events", link: "/events" },
          { text: "Debug", link: "/debug" },
          { text: "Playground", link: "/playground" },
        ]
      },
      {
        text: "Observers",
        collapsed: false,
        items: [
          { text: "Overview", link: "/observers" },
          { text: "useClickOutside", link: "/use-click-outside" },
          { text: "useIdle", link: "/use-idle" },
          { text: "useIntersection", link: "/use-intersection" },
          { text: "useHotkeys", link: "/use-hotkeys" },
          { text: "useHover", link: "/use-hover" },
          { text: "useMatchMedia", link: "/use-match-media" },
          { text: "useMutation", link: "/use-mutation" },
          { text: "useResize", link: "/use-resize" },
          { text: "useTargetMutation", link: "/use-target-mutation" },
          { text: "useVisibility", link: "/use-visibility" },
          { text: "useWindowFocus", link: "/use-window-focus" },
          { text: "useWindowResize", link: "/use-window-resize" }
        ]
      },
      {
        text: "Optimization",
        collapsed: false,
        items: [
          { text: "Overview", link: "/optimization" },
          { text: "useDebounce", link: "/use-debounce" },
          { text: "useMemo", link: "/use-memo" },
          { text: "useThrottle", link: "/use-throttle" },
        ]
      },
      {
        text: "Animation",
        collapsed: false,
        items: [
          { text: "Overview", link: "/animation" },
          { text: "useTransition", link: "/use-transition" },
        ]
      },
      {
        text: "Application",
        collapsed: false,
        items: [
          { text: "Overview", link: "/application" },
          { text: "useApplication", link: "/application-controller" },
          { text: "useDispatch", link: "/use-dispatch" },
          { text: "useMeta", link: "/use-meta" },
        ]
      }
    ]
  }
}
