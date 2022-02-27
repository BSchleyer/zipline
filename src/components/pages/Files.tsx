import React, { useEffect, useState } from 'react';

import ZiplineImage from 'components/Image';
import useFetch from 'hooks/useFetch';
import { Box, Accordion, Pagination, Title, SimpleGrid, Skeleton, Group, ActionIcon } from '@mantine/core';
import { PlusIcon } from '@modulz/radix-icons';
import Link from 'next/link';

export default function Files() {
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [favoritePages, setFavoritePages] = useState([]);
  const [favoritePage, setFavoritePage] = useState(1);

  const updatePages = async favorite => {
    const pages = await useFetch('/api/user/files?paged=true&filter=media');
    if (favorite) {
      const fPages = await useFetch('/api/user/files?paged=true&favorite=media');
      setFavoritePages(fPages);
    } 
    setPages(pages);
  };

  useEffect(() => {
    updatePages(true);
  }, []);

  return (
    <>
      <Group>
        <Title sx={{ marginBottom: 12 }}>Files</Title>
        <Link href='/dashboard/upload' passHref>
          <ActionIcon component='a' variant='filled' color='primary'><PlusIcon/></ActionIcon>
        </Link>
      </Group>
      <Accordion
        offsetIcon={false}
        sx={t => ({
          marginTop: 2,
          border: '1px solid',
          marginBottom: 12,
          borderColor: t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[0] ,
        })}
      >
        <Accordion.Item label={<Title>Favorite Files</Title>}>
          <SimpleGrid
            cols={3}
            spacing='lg'
            breakpoints={[
              { maxWidth: 'sm', cols: 1, spacing: 'sm' },
            ]}
          >
            {favoritePages.length ? favoritePages[(favoritePage - 1) ?? 0].map(image => (
              <div key={image.id}>
                <ZiplineImage image={image} updateImages={() => updatePages(true)} />
              </div>
            )) : null}
          </SimpleGrid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 12,
              paddingBottom: 3,
            }}
          >
            <Pagination total={favoritePages.length} page={favoritePage} onChange={setFavoritePage}/>
          </Box>
        </Accordion.Item>
      </Accordion>
      <SimpleGrid
        cols={3}
        spacing='lg'
        breakpoints={[
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        ]}
      >
        {pages.length ? pages[(page - 1) ?? 0].map(image => (
          <div key={image.id}>
            <ZiplineImage image={image} updateImages={() => updatePages(true)} />
          </div>
        )) : [1,2,3,4].map(x => (
          <div key={x}>
            <Skeleton width='100%' height={220} sx={{ borderRadius: 1 }}/>
          </div>
        ))}
      </SimpleGrid>
      {pages.length ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 12,
            paddingBottom: 3,
          }}
        >
          <Pagination total={pages.length} page={page} onChange={setPage}/>
        </Box>
      ) : null}
    </>
  );
}