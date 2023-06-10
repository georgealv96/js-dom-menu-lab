// Menu data structure
const menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog',
    href: '#',
    subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' }
    ]
  },
  {
    text: 'orders',
    href: '#',
    subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' }
    ]
  },
  {
    text: 'account',
    href: '#',
    subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' }
    ]
  }
]

const mainEl = document.querySelector('main')

mainEl.style.backgroundColor = 'var(--main-bg)'

mainEl.innerHTML = '<h1>SEI Rocks!</h1>'

mainEl.classList.add('flex-ctr')

const topMenuEl = document.getElementById('top-menu')

topMenuEl.style.height = '100%'

topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'

topMenuEl.classList.add('flex-around')

menuLinks.forEach(function (menuLink, i) {
  const anchor = document.createElement('a')
  anchor.setAttribute('href', menuLinks[i].href)
  anchor.innerText = menuLinks[i].text
  topMenuEl.appendChild(anchor)
})

const subMenuEl = document.getElementById('sub-menu')

subMenuEl.style.height = '100%'

subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'

subMenuEl.classList.add('flex-around')

subMenuEl.style.position = 'absolute'

subMenuEl.style.top = '0'

const topMenuLinks = document.querySelectorAll('#top-menu > a')

let showingSubMenu = false

topMenuEl.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    e.preventDefault()
  } else {
    return
  }

  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active')
    showingSubMenu = false
    subMenuEl.style.top = '0'
    return
  }

  topMenuLinks.forEach(function (link) {
    link.classList.remove('active')
  })

  e.target.classList.add('active')

  const targetLink = e.target

  menuLinks.forEach(function (link) {
    if (targetLink.innerHTML === link.text) {
      showingSubMenu = link.subLinks ? true : false
      //
      if (showingSubMenu) {
        buildSubMenu(link)
        subMenuEl.style.top = '100%'
      } else {
        subMenuEl.style.top = '0'
        mainEl.innerHTML = '<h1>about</h1>'
      }

      function buildSubMenu(links) {
        subMenuEl.innerText = null
        console.log(subMenuEl)
        links.subLinks.forEach(function (link) {
          const newEl = document.createElement('a')
          newEl.setAttribute('href', link.href)
          newEl.innerText = link.text
          subMenuEl.append(newEl)
        })
      }
    }
  })
})

subMenuEl.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    e.preventDefault()
  } else {
    return
  }

  showingSubMenu = false
  subMenuEl.style.top = '0'

  topMenuLinks.forEach(function (link) {
    link.classList.remove('active')
  })

  mainEl.innerHTML = `<h1>${e.target.innerHTML}</h1>`
})
