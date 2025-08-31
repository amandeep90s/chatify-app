import { Helmet } from 'react-helmet-async';

function Title({ title = 'Chatify App', description = 'Built with React & Material-UI' }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default Title;
