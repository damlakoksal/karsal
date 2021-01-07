import React, { useEffect, useLayoutEffect, ReactNode, ReactElement } from 'react'

import Logo from '../../logo/logo.component'
import Menu from '../../menu/menu.component'
import MenuItem from '../../menu-item/menu-item.component'

import styles from './nav-bar.module.scss'
import classNames from 'classnames'

import { useMediaQuery } from 'react-responsive'
import { CommonModel } from '../../../interfaces/index'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface Props {
  hamburgerButton: ReactNode
  data: CommonModel['navbar']
  navbarBg: boolean
  route: string
}

export default function NavBar ({
  hamburgerButton,
  data: {
    aboutUs,
    factory,
    catalog,
    contact,
    english,
    turkish
  },
  navbarBg,
  route
}: Props): ReactElement {
  const [isScrolled, setScrolled] = React.useState(
    typeof window !== 'undefined' && window.scrollY > 0
  )

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1131px)'
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1130px)' })

  useIsomorphicLayoutEffect(() => {
    const handleScroll: () => void = () =>
      window.scrollY > 0 ? setScrolled(true) : setScrolled(false)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={
        classNames(
          styles.container,
          isScrolled && styles.container__scrolled,
          navbarBg && styles.container__pageView
        )}
    >
      {isDesktopOrLaptop && (
        <>
          {
            navbarBg
              ? (
                <>
                  <Menu align="left" equal>
                    <MenuItem href="/">
                      <Logo width={120} height={40} />
                    </MenuItem>
                  </Menu>
                  <Menu align="center" equal>
                    <MenuItem href={aboutUs.link}>{aboutUs.text}</MenuItem>
                    <MenuItem href={factory.link}>{factory.text}</MenuItem>
                    <MenuItem href={catalog.link}>{catalog.text}</MenuItem>
                    <MenuItem href={contact.link}>{contact.text}</MenuItem>
                  </Menu>
                  <Menu align="right" equal>
                    <div className={styles.lang_container}>
                      <MenuItem href={route} lang={english.locale}>
                        {english.text}
                      </MenuItem>
                      <span className={styles.seperator}>|</span>
                      <MenuItem href={route} lang={turkish.locale}>
                        {turkish.text}
                      </MenuItem>
                    </div>
                  </Menu>
                </>
              )
              : (
                <>
                  <Menu align="left">
                    <MenuItem href={aboutUs.link}>{aboutUs.text}</MenuItem>
                    <MenuItem href={factory.link}>{factory.text}</MenuItem>
                    <MenuItem href={catalog.link}>{catalog.text}</MenuItem>
                    <MenuItem href={contact.link}>{contact.text}</MenuItem>
                  </Menu>
                  <Menu align="right">
                    <div className={styles.lang_container}>
                      <MenuItem href={route} lang={english.locale}>
                        {english.text}
                      </MenuItem>
                      <span className={styles.seperator}>|</span>
                      <MenuItem href={route} lang={turkish.locale}>
                        {turkish.text}
                      </MenuItem>
                    </div>
                  </Menu>
                </>
              )
          }
        </>
      )}

      {isTabletOrMobile && (
        <>
          <Menu align="left">
            <MenuItem href="/">
              <Logo width={120} height={40} />
            </MenuItem>
          </Menu>
          <Menu align="right">
            <MenuItem>{hamburgerButton}</MenuItem>
          </Menu>
        </>
      )}
    </nav>
  )
}
