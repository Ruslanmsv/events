import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "@/components/layout/layout";

import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>NextJS Test Project</title>
        <meta
          name="description"
          content="Test description for test nextjs project"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
