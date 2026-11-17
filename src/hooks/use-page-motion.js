import { useEffect } from 'react'

const revealTargets = [
  '.hero-content > *', '.news-intro', '.news-board',
  '.services-section .eyebrow', '.services-section h2',
  '.service-photo-card', '.service-small-card',
  '.projects-section .eyebrow', '.projects-section h2', '.project-copy', '.device-composition',
  '.service-introduction', '.service-explanation-layout', '.service-process li', '.service-detail-layout',
  '.project-list-section .eyebrow', '.project-list-section h2', '.project-gallery-card',
  '.project-detail-heading', '.project-detail-description', '.project-slideshow',
  '.news-page-heading', '.news-search', '.news-table', '.news-pagination',
  '.news-article-heading', '.news-article-body', '.news-adjacent', '.news-article-actions',
  '.footer-inner',
  '.company-section-heading', '.company-intro-copy', '.company-technology-row > img', '.company-technology-copy',
  '.company-credentials-list', '.company-organization-content', '.company-contact-locations',
].join(', ')

function framesFor(element) {
  if (element.matches('.company-technology-row > img')) {
    const fromRight = element.parentElement.matches(':nth-child(even)')
    return [{ opacity: 0, translate: `${fromRight ? 60 : -60}px 0` }, { opacity: 1, translate: '0 0' }]
  }
  if (element.matches('.service-photo-card, .project-gallery-card, .device-composition, .project-slideshow')) {
    return [{ opacity: 0, scale: '.94' }, { opacity: 1, scale: '1' }]
  }
  if (element.matches('.news-board, .news-table, .company-credentials-list, .company-organization-content, .company-contact-locations')) {
    return [{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)' }]
  }
  if (element.matches('.hero-content h1, .company-section-heading, .project-detail-heading, .news-page-heading, .news-article-heading')) {
    return [{ opacity: 0, translate: '-18px 0' }, { opacity: 1, translate: '0 0' }]
  }
  if (element.matches('.service-small-card, .service-process li')) {
    return [{ opacity: 0, translate: '0 14px', scale: '.97' }, { opacity: 1, translate: '0 0', scale: '1' }]
  }
  return [{ opacity: 0 }, { opacity: 1 }]
}

// Contents stay visible without animation support. Each block animates only once.
export default function usePageMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!window.IntersectionObserver || !Element.prototype.animate) return
    const animations = new Map()
    let observer

    function stop() {
      observer?.disconnect()
      animations.forEach(animation => animation.cancel())
      animations.clear()
    }

    function start() {
      stop()
      if (preference.matches) return
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
        visible.forEach((entry, index) => {
          observer.unobserve(entry.target)
          const animation = entry.target.animate(
            framesFor(entry.target),
            { duration: entry.target.matches('.company-technology-row > img') ? 900 : 700, delay: Math.min(index * 65, 260), easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
          )
          animations.set(entry.target, animation)
          animation.onfinish = () => animations.delete(entry.target)
        })
      }, { threshold: 0.08 })
      document.querySelectorAll(revealTargets).forEach(element => observer.observe(element))
    }

    // Keyboard focus always takes priority over a visual entrance animation.
    function onFocus(event) {
      animations.forEach((animation, element) => {
        if (element.contains(event.target)) { animation.cancel(); animations.delete(element) }
      })
    }

    start()
    preference.addEventListener('change', start)
    document.addEventListener('focusin', onFocus)
    return () => {
      stop()
      preference.removeEventListener('change', start)
      document.removeEventListener('focusin', onFocus)
    }
  }, [])
}
