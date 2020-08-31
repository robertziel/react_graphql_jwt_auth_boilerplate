import React, { useEffect, useState } from 'react';

import { Paper } from 'components/_ui-elements';

import FetchedContent from 'containers/FetchedContent';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import Form from './Form';
import Wrapper from './Wrapper';

export default function AvatarForm() {
  const [avatar, setAvatar] = useState();

  const fetcher = useApiFetcher();

  const fetchData = () => {
    fetcher.get({
      path: '/profile/avatar',
      afterSuccess: (result) => {
        setAvatar(result.avatar);
      },
    });
  };

  useEffect(() => fetchData(), []);

  return (
    <Wrapper>
      <Paper>
        <FetchedContent processing={avatar === undefined || fetcher.processing}>
          <Form avatar={avatar} onAvatarUpdate={() => fetchData()} />
        </FetchedContent>
      </Paper>
    </Wrapper>
  );
}
