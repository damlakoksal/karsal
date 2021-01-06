import React, { ReactNode, useState, useEffect, ReactElement } from 'react'

import Announcement from './announcement/announcement.component'
import Footer from './footer/footer.component'
import NavBar from './nav-bar/nav-bar.component'
import SideBar from './side-bar/side-bar.component'
import HamburgerButton from '../hamburger-button/hamburger-button.component'
import Image from 'next/image'

import styles from './layout.module.scss'

import { useMediaQuery } from 'react-responsive'
import { CommonModel } from '../../interfaces/index'

interface Props {
  children: ReactNode
  data: CommonModel
  navbarBg: boolean
}

export default function Layout ({
  children,
  data: {
    announcement,
    sidebar,
    navbar,
    footer
  },
  navbarBg
}: Props
): ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useMediaQuery({ query: '(max-width: 475px)' })
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1131px)'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') disableScrollBody(isOpen)
  }, [isOpen])

  const onClick: () => void = () => {
    setIsOpen(!isOpen)
  }

  const disableScrollBody: (isOpen: boolean) => void = (isOpen) => {
    isOpen
      ? document?.querySelector('body')?.classList.add('disableScroll')
      : document?.querySelector('body')?.classList.remove('disableScroll')
  }

  return (
    <div className={styles.container}>
      <Announcement>
        {isMobile ? (
          <>
            <a href={announcement.email.link}>
              <Image
                src="/assets/svgs/envelope-solid.svg"
                width={20}
                height={20}
                alt={announcement.email.image_alt}
              />
            </a>
            <span>{announcement.text}</span>
            <a href={announcement.phone.link}>
              <Image
                src="/assets/svgs/phone-solid.svg"
                width={15}
                height={15}

                alt={announcement.phone.image_alt}
              />
            </a>
          </>
        ) : (
          <>
            <a href={announcement.email.link}>{announcement.email.text}</a>
            <a href={announcement.phone.link}>{announcement.phone.text}</a>
          </>
        )}
      </Announcement>
      <SideBar
        isOpen={isOpen}
        hamburgerButton={
          <HamburgerButton onClickHandler={onClick} menuActive />
        }
        data={sidebar}
      />
      {(isDesktopOrLaptop ? false : isOpen) || (
        <NavBar
          data={navbar}
          hamburgerButton={<HamburgerButton onClickHandler={onClick} />}
          navbarBg={navbarBg} />
      )}
      <div className={styles.container__body}>{children}</div>
      <Footer data={footer} />
    </div>
  )
}
