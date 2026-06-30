function rewriteReadmePath(url) {
  if (!url) return url

  let path = url.replace(/^\.\//, "")

  if (/^CONTRIBUTING\.md$/.test(path)) {
    return "https://github.com/stimulus-use/stimulus-use/blob/main/CONTRIBUTING.md"
  }

  path = path.replace(/^\/?docs\/public\//, "/")

  const page = path.match(/^\/?docs\/([^?#]+?)(?:\.md)?([?#].*)?$/)

  if (page) {
    let slug = page[1]
    if (slug === "application-controller") slug = "use-application"

    return `/${slug}${page[2] || ""}`
  }

  return path
}

function rewriteReadmeHtml(html) {
  return html.replace(/\b(src|srcset)=(["'])(.*?)\2/g, (_, attr, quote, value) => {
    const rewritten = value.split(",").map((candidate) => {
      const [target, ...descriptor] = candidate.trim().split(/\s+/)
      return [rewriteReadmePath(target), ...descriptor].join(" ")
    }).join(", ")

    return `${attr}=${quote}${rewritten}${quote}`
  })
}

function rewriteReadmeTokens(tokens) {
  for (const token of tokens) {
    if (token.type === "html_block" || token.type === "html_inline") {
      token.content = rewriteReadmeHtml(token.content)
    }

    if (token.type === "link_open") {
      const href = token.attrGet("href")
      if (href) token.attrSet("href", rewriteReadmePath(href))
    }

    if (token.type === "image") {
      const src = token.attrGet("src")
      if (src) token.attrSet("src", rewriteReadmePath(src))
    }

    if (token.children) rewriteReadmeTokens(token.children)
  }
}

export default {
  title: "Stimulus Use",
  description: "A collection of composable behaviors for your Stimulus Controllers",
  ignoreDeadLinks: false,
  lastUpdated: true,
  markdown: {
    config(md) {
      md.core.ruler.push("rewrite-readme-paths", (state) => {
        if (state.env?.relativePath === "index.md") {
          rewriteReadmeTokens(state.tokens)
        }
      })
    }
  },
  themeConfig: {
    siteTitle: "",
    logo: "/stimulus-use-logo.png",
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stimulus-use/stimulus-use' }
    ],
    search: {
      provider: 'local'
    },
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
          { text: "useLazyLoad", link: "/use-lazy-load" },
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
          { text: "useApplication", link: "/use-application" },
          { text: "useDispatch", link: "/use-dispatch" },
          { text: "useMeta", link: "/use-meta" },
        ]
      }
    ]
  }
}
