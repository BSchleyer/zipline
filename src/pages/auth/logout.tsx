import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';

export default function Logout() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);


  useEffect(() => {
    (async () => {
      const userRes = await fetch('/api/user');
      if (userRes.ok) {
        const res = await fetch('/api/auth/logout');
        if (res.ok) router.push('/auth/login');
      } else {
        router.push('/auth/login');
      }
    })();
  }, []);

  return (
    <LoadingOverlay visible={visible} />
  );
}

Logout.title = 'Zipline - Logout';