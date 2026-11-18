const base = import.meta.env.BASE_URL

export function siteUrl(path = '/') {
  const url = new URL(path, 'https://local.invalid')
  const route = url.pathname.replace(/^\/+|\/+$/g, '')
  return `${base}${route ? `${route}/` : ''}${url.search}${url.hash}`
}

export function appPath() {
  const pathname = window.location.pathname
  const prefix = base.replace(/\/$/, '')
  const route = prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))
    ? pathname.slice(prefix.length)
    : pathname
  return route.replace(/\/$/, '') || '/'
}
