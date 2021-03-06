import React, { ReactElement } from 'react'
import { GetStaticProps } from 'next'

import Head from 'next/head'
import Layout from '../../components/layout/layout.component'
import Section from '../../components/section/section.component'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'

import styles from './factory.module.scss'

import { CommonModel, FactoryModel } from '../../interfaces/index'
import { getBase64Values } from '../../utils/imageUtils'
import { getData } from '../../utils/dbUtils'
import CustomContainer from '../../components/custom-container/custom-container.component'

interface Props {
  common: CommonModel
  page: FactoryModel
  Base64Values: string[]
}

export const getStaticProps: GetStaticProps = async ({ locale = 'tr' }) => {
  const commonData = await getData<CommonModel>('common', locale)
  const pageData = await getData<FactoryModel>('factory', locale)

  const images = ['factory_hero']
  const base64Values: string[] = getBase64Values(images)

  return {
    props: {
      common: commonData,
      page: pageData,
      Base64Values: base64Values
    }
  }
}

export default function Factory ({
  common,
  page: {
    title
  },
  Base64Values
}: Props
): ReactElement {
  const data: readonly ReactImageGalleryItem[] = [

    {
      original: 'https://res.cloudinary.com/dqht7aysn/image/upload/c_scale,h_600,w_1000/v1618071726/factory/1.jpg',
      thumbnail: 'https://res.cloudinary.com/dqht7aysn/image/upload/c_scale,h_150,w_250/v1618071726/factory/1.jpg'
    },
    {
      original: 'https://res.cloudinary.com/dqht7aysn/image/upload/c_scale,h_600,w_1000/v1618071729/factory/2.jpg',
      thumbnail: 'https://res.cloudinary.com/dqht7aysn/image/upload/c_scale,h_150,w_250/v1618071729/factory/2.jpg'
    },
    {
      original: 'https://res.cloudinary.com/dqht7aysn/image/upload/c_scale,h_600,w_1000/v1618071168/factory/3.jpg',
      thumbnail: 'https://res.cloudinary.com/dqht7aysn/image/upload/c_scale,h_150,w_250/v1618071168/factory/3.jpg'
    }

  ]
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout data={common} navbarBg>
        <Section relative minHeight={'60vh'}>
          <div className={styles.container}>
            <video className={styles.video} autoPlay loop muted poster='assets/images/factory-1.jpg'>
              <source src='https://res.cloudinary.com/dqht7aysn/video/upload/v1614270816/karsal_factory_da1rr4.mp4' type='video/mp4'/>
              Your browser does not support the video tag.
            </video>
          </div>
        </Section>
        <Section relative>
          <CustomContainer h1="Fabrikamız">
            <ImageGallery items={data} showThumbnails={false}/>
          </CustomContainer>
        </Section>
      </Layout>
    </>
  )
}
