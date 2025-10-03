import { Metadata } from 'next'

const SITE_URL = process.env.SITE_URL || 'https://iconiclogs.com'
const SITE_NAME = 'ICONIC LOGISTICS VIETNAM'
const SITE_DESCRIPTION =
  'CÔNG TY TNHH ICONIC LOGISTICS - Dịch vụ logistics chuyên nghiệp: vận chuyển đường biển, khai báo hải quan, kho bãi và vận chuyển nội địa tại Việt Nam.'

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const metaDescription = description || SITE_DESCRIPTION
  const url = `${SITE_URL}${path}`
  const imageUrl = image || `${SITE_URL}/og-image.jpg`

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'vi_VN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateArticleJsonLd({
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  author = 'ICONIC LOGISTICS VIETNAM',
  slug,
}: {
  title: string
  description: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  author?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${SITE_URL}/og-image.jpg`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news/${slug}`,
    },
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-986-066-174',
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['Vietnamese', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '25/49 Đường 6, Khu phố 26',
      addressLocality: 'Phường Hiệp Bình',
      addressRegion: 'TP.HCM',
      addressCountry: 'VN',
    },
    sameAs: [
      // Add social media links here
    ],
  }
}
