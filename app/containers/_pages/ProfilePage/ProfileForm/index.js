import React, { useState } from 'react';

import { Paper } from 'components/_ui-elements';

import FetchedContent from 'containers/FetchedContent';
import { useQuery } from 'containers/ApiConnector/apollo/fetchers';
import { PROFILE_QUERY } from './graphql';

import Form from './Form';
import Wrapper from './Wrapper';

function ProfilePage() {
  const [user, setUser] = useState();

  const { loading } = useQuery(PROFILE_QUERY, {
    onCompleted: (data) => setUser(data.profile),
  });

  return (
    <Wrapper>
      <Paper>
        <FetchedContent processing={user === undefined || loading}>
          <Form user={user} />
        </FetchedContent>
      </Paper>
    </Wrapper>
  );
}

export default ProfilePage;
