import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';

const mainFeaturedPost = {
  title: 'WHATNOW SERVICE',
  description:
  'Global Red Cross / Red Crescent Key Safety Messages',
  image: process.env.PUBLIC_URL + '/homeBG.jpeg',
  imageText: 'main image description',
};

const featuredPosts = [
  {
    title: 'WHATNOW CONTENT',
    href: '/content',
    description:
    'develop period',
    image: process.env.PUBLIC_URL + '/people-rtl@3x.png',
    imageLabel: 'Image Text',
  },
  {
    title: 'AUDIT LOG',
    href: '/auditlog',
    description:
    'develop period',
    image: process.env.PUBLIC_URL + '/people-rtl@3x.png',
    imageLabel: 'Image Text',
  },
  {
    title: 'BULK UPLOAD',
    href: '/bulkupload',
    description:
    'develop period',
    image: process.env.PUBLIC_URL + '/speech-rtl@3x.png',
    imageLabel: 'Image Text',
  },
  {
    title: 'REGIONS',
    href: '/regions',
    description:
    'develop period',
    image: process.env.PUBLIC_URL + '/computer-rtl@3x.png',
    imageLabel: 'Image Text',
  },
];

export default function Blog() {
  return (
    <>
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="IFRC"
        description="@WHATNOW MESSAGE SERVICE"
      />
    </>
  );
}
