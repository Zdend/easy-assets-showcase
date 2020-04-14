import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/constants';
import GoogleTagManagerScript from '@/components/GoogleTagManagerScript';
import { COLORS } from '@/styles/variables';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content={COLORS.BRAND[5]} />
          {process.env.NODE_ENV === 'production' && (
            <GoogleTagManagerScript id={GOOGLE_TAG_MANAGER_ID} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default AppDocument;
