import { useEffect } from 'react'

// Wheel-only easing: anchors, keyboard, touch, and nested scrolling remain native.
const MAX_SPEED = 1800 // px per second
const EASE_OUT_TIME = 55 // ms: short, subtle deceleration
const MAX_PENDING_DISTANCE = 600 // Avoid a long scroll tail after rapid wheel input.

export default function useSmoothWheel() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0
    let target = window.scrollY
    let position = target
    let previousTime = 0

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
      target = window.scrollY
      position = target
    }

    function hasNestedScroll(event) {
      for (const element of event.composedPath()) {
        if (!(element instanceof HTMLElement) || element === document.body || element === document.documentElement) continue
        if (element.matches('textarea, input, select, [contenteditable="true"], dialog')) return true
        const style = getComputedStyle(element)
        if (/(auto|scroll|overlay)/.test(style.overflowY) && element.scrollHeight > element.clientHeight) return true
      }
      return false
    }

    function tick(now) {
      const deltaTime = Math.max(0, Math.min(now - previousTime, 32))
      previousTime = now
      const maximum = Math.max(0, document.scrollingElement.scrollHeight - window.innerHeight)
      target = Math.max(0, Math.min(target, maximum))
      position = Math.max(0, Math.min(position, maximum))
      const remaining = target - position
      const easedStep = Math.abs(remaining) * (1 - Math.exp(-deltaTime / EASE_OUT_TIME))
      const step = Math.min(easedStep, MAX_SPEED * deltaTime / 1000)
      position += Math.sign(remaining) * step
      window.scrollTo({ top: position, behavior: 'instant' })
      if (Math.abs(target - position) > 0.5) frame = requestAnimationFrame(tick)
      else {
        window.scrollTo({ top: target, behavior: 'instant' })
        position = target
        frame = 0
      }
    }

    function onWheel(event) {
      if (event.defaultPrevented || !event.cancelable || reduced.matches || !desktop.matches || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY || hasNestedScroll(event)) {
        stop()
        return
      }
      const root = document.scrollingElement
      if (!root || /hidden|clip/.test(getComputedStyle(document.body).overflowY)) return
      const maximum = Math.max(0, root.scrollHeight - window.innerHeight)
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
      const current = window.scrollY
      const reversing = frame && Math.sign(delta) !== Math.sign(target - current)
      const base = frame && !reversing ? target : current
      const pending = Math.max(-MAX_PENDING_DISTANCE, Math.min(MAX_PENDING_DISTANCE, base + delta - current))
      const next = Math.max(0, Math.min(maximum, current + pending))
      if (!frame && next === current) return
      event.preventDefault()
      target = next
      if (!frame) {
        position = current
        previousTime = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }

    function onKey(event) {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) stop()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('pointerdown', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', stop)
    window.addEventListener('hashchange', stop)
    document.addEventListener('visibilitychange', stop)
    reduced.addEventListener('change', stop)
    desktop.addEventListener('change', stop)
    return () => {
      stop()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointerdown', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', stop)
      window.removeEventListener('hashchange', stop)
      document.removeEventListener('visibilitychange', stop)
      reduced.removeEventListener('change', stop)
      desktop.removeEventListener('change', stop)
    }
  }, [])
}
