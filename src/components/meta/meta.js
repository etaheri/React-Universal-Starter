import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';


/* TODO add these to constants or config.json */
const _iconDir = '/media/images/icon/';
const _shareImgDir = '/media/images/share/';
const _twitterAcc = '@Temp';
/* END */

let _rootDomain = null;
let env = null;
if(typeof window !== 'undefined') {
  env = window.__apienv
} else {
  env = process.env.API_ENV;;
}
switch (env) {
  case 'production':
    _rootDomain = ''
    break;
  case 'staging':
    _rootDomain = ''
    break;
  case 'dev':
    _rootDomain = ''
    break;
  default:
    _rootDomain = ''
}


const _iconSizeObj = {
  'apple-touch-icon': [
    '57x57',
    '60x60',
    '72x72',
    '76x76',
    '114x114',
    '120x120',
    '144x144',
    '152x152',
    '180x180',
  ],
  icon: [
    '16x16',
    '32x32',
    '96x96',
    '192x192',
    '196x196',
    '256x256',
  ],
};

const _ar = [];
Object.keys(_iconSizeObj).map(item => {
  _iconSizeObj[item].map(icon => {
    _ar.push({
      href: `${_iconDir}${item}-${icon}.png`,
      rel: `${item}`,
      size: `${icon}`,
      type: 'image/png',
    });
    return null;
  });
  return null;
});

const Meta = ({
  appTitle,
  title,
  description,
  imageFilename,
  imageWidth,
  imageHeight,
  pathname,
  root,
}) => {
  const _title = title || 'October';
  const _meta = [];

  /* TITLE */
  _meta.push({
    name: 'apple-mobile-web-app-title',
    content: `${_title}`,
  }, {
    property: 'og:title',
    content: `${_title}`,
  }, {
    name: 'twitter:title',
    content: `${_title}`,
  });

  /* DESCRIPTION */
  if (description) {
    const _dLimited = 160;
    if (description.length > _dLimited) {
      if (process.env.IS_BROWSER) {
        console.warn(`description is above seo limit of ${_dLimited}`); // eslint-disable-line no-console, max-len
      }
    }
    const _description = description.substring(0, 160);
    _meta.push({
      name: 'description',
      content: `${_description}`,
    }, {
      property: 'og:description',
      itemprop: 'description',
      content: `${_description}`,
    }, {
      name: 'twitter:description',
      content: `${_description}`,
    });
  }

  /* APP ROOT */
  if (root) {
    _meta.push({
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    }, {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    }, {
      name: 'theme-color',
      content: '#000000',
    }, {
      property: 'og:type',
      content: 'website',
    }, {
      name: 'application-name',
      content: `${_title}`,
    }, {
      property: 'og:site_name',
      content: `${_title}`,
    }, {
      name: 'twitter:card',
      content: 'summary_large_image',
    }, {
      name: 'twitter:site',
      content: `${_twitterAcc}`,
    }, {
      name: 'twitter:creator',
      content: `${_twitterAcc}`,
    }, {
      name: 'twitter:text:title',
      content: `${_title}`,
    }, {
      name: 'msapplication-TileColor',
      content: '#000000',
    }, {
      name: 'msapplication-square70x70',
      content: `${_iconDir}mstile-70x70.png`,
    }, {
      name: 'msapplication-square144x144',
      content: `${_iconDir}mstile-144x144.png`,
    },{
      name: 'msapplication-square150x150',
      content: `${_iconDir}mstile-150x150.png`,
    },{
      name: 'msapplication-wide310x150',
      content: `${_iconDir}mstile-310x150.png`,
    },{
      name: 'msapplication-square310x310',
      content: `${_iconDir}mstile-310x310.png`,
    });
  }

  /* SHARE URL */
  _meta.push({
    property: 'og:url',
    content: `${_rootDomain}${pathname}`,
  }, {
    name: 'twitter:url',
    content: `${_rootDomain}${pathname}`,
  });

  /* IMAGE */

  _meta.push({
    property: 'og:image',
    content: `${imageFilename}`,
  }, {
    property: 'og:image:width',
    content: `${imageWidth}`,
  }, {
    property: 'og:image:height',
    content: `${imageHeight}`,
  }, {
    name: 'twitter:image',
    content: `${imageFilename}`,
  }, {
    name: 'twitter:image:width',
    content: `${imageWidth}`,
  }, {
    name: 'twitter:image:height',
    content: `${imageHeight}`,
  });

  if (root) {
    return (
      <Helmet
        title={title}
        titleTemplate={`%s | October`}
        link={_ar}
        meta={_meta}
        />
    );
  }

  return (
    <Helmet
      title={title}
      meta={_meta}
      />
  );
};

Meta.propTypes = {
  appTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageFilename: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  pathname: PropTypes.string.isRequired,
  root: PropTypes.bool,
};

Meta.defaultProps = {
  imageFilename: 'generic.jpg',
  imageWidth: 1200,
  imageHeight: 630,
  root: false,
  title: '',
};

export default Meta;
