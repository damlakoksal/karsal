import React, { ReactElement } from 'react'
import { GetStaticProps } from 'next'

import Head from 'next/head'
import Layout from '../../components/layout/layout.component'
import Section from '../../components/section/section.component'
import Content from '../../components/content/content.component'
import ImageBox from '../../components/image-box/image-box.component'
import BlockQuote from '../../components/block-quote/block-quote.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import Logo from '../../components/logo/logo.component'

import './factory.module.scss'

import { getData } from '../../lib'
import { CommonModel, FactoryModel } from '../../interfaces/index'

interface Props {
  common: CommonModel
  page: FactoryModel
}

export const getStaticProps: GetStaticProps = async ({ locale = 'tr' }) => {
  const commonData = await getData<CommonModel>('common', locale)
  const pageData = await getData<FactoryModel>('factory', locale)

  return {
    props: {
      common: commonData,
      page: pageData
    }
  }
}

export default function Factory ({
  common,
  page: {
    title
  }
}: Props
): ReactElement {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout data={common} navbarBg={true}>
        <Section>
          <Content
            backgroundColor={'#bed0bd20'}
            left={<Logo width={120} height={40} />}
            title={'Test'}
            blockquote={
              <BlockQuote>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting.
              </BlockQuote>
            }
            button={
              <CustomButton href="/en/factory">
                <span>Daha Fazlası</span>
                <span>&#8594;</span>
              </CustomButton>
            }
          />
          <ImageBox
            src="/assets/images/about_us_hero.jpg"
            alt="banner-image"
            priority
            quality={100}
            objectFit="cover"
            hero
            placeholderColor="#404040"
          />
        </Section>
      </Layout>
    </>
  )
}
