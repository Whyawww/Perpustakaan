import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
}

export const SEOMeta = ({ title, description }: SEOProps) => {
  return (
    <Helmet>
      <title>{title} | Sistem Informasi Perpustakaan</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};