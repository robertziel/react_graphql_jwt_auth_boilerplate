import { defineMessages } from 'react-intl';

export const scope = 'app.components.Footer';

const messages = defineMessages({
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Designed by {author}.
    `,
  },
});

export default messages;
