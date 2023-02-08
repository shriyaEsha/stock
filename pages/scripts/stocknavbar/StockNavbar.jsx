import React from 'react';
import { injectIntl } from 'react-intl';

import { 
  useFeatureFlags,
  isNavbarV2EnabledFF,
  isNavbarV2WithoutFreePremiumEnabledFF,
 } from '@astock/react-feature-flags';
import { StockNavbarFranklinWrapper } from '../../../stock.navbar';

const config = {
    authentication: {
      imsClientId: 'AdobeStockClient2',
      imsLocale: 'en_US',
      scopes: [
        'account_cluster.read',
        'additional_info.address.mail_to',
        'additional_info.dob',
        'additional_info.projectedProductContext',
        'additional_info.roles',
        'AdobeID',
        'cc_private',
        'creative_cloud',
        'creative_sdk',
        'gnav',
        'openid',
        'read_organizations',
        'read_pc.stock',
        'read_pc.stock_credits',
        'sao.cce_private',
        'sao.stock',
        'stk.a.internal.cru'
      ],
      imsUrlParams: {
        ctx_id: 'adbstk_c',
        state: '{"ac":"stock.adobe.com"}'
      }
    },
    app: {
      stockUrl: 'https://adobestock.dev.stage.adobe.com',
      url: 'https://adobestock.dev.stage.adobe.com',
      environment: 'local',
      proxyBaseUri: '/premium'
    },
    basename: '',
    locale: 'en-US',
    localeCountry: 'US',
    isGloballySafeCollectionEnabled: false,
    isStorageTokenEnabled: true,
    storageAccessTokenUrl: '/premium/_storageToken',
    ccLibrariesBaseUrl: 'https://ccx-melville-stage.adobe.io/api/v1',
    isUnsupportedRoute: false,
    isK12: false,
    languageCode: 'en',
    phoneNumberForPage: '800-685-3602',
    urls: {
      nonLocalized: {
        adobeAccount: 'https://stage.account.adobe.com',
        adobeBlog: 'https://blog.adobe.com',
        adobeDotCom: 'https://www.stage.adobe.com',
        adobeEnterprise: 'https://stockenterprise.adobe.com',
        adobeFontsTypekit: 'https://use.typekit.net',
        adobeHelpX: 'https://helpx.stage.adobe.com',
        adobeIms: 'https://ims-na1-stg1.adobelogin.com',
        adobeSpark: 'https://spark.adobe.com',
        adobeStock: 'https://primary.stock.stage.adobe.com',
        adobeStockContributor: 'https://primary.stock-contributor.stage.adobe.com',
        adobeStockBrowseStandardAssets: 'https://primary.stock.stage.adobe.com/search?filters[content_type:photo]=1&filters[content_type:illustration]=1&filters[content_type:zip_vector]=1&filters[content_type:video]=1&filters[content_type:template]=1&filters[content_type:3d]=1&filters[content_type:audio]=0&filters[include_stock_enterprise]=0&filters[is_editorial]=0&filters[free_collection]=0&filters[content_type:image]=1&order=relevance&safe_search=1&price[$]=1&search_type=filter-select&get_facets=1'
      },
      localized: {
        adobeAccount: 'https://stage.account.adobe.com?lang=en',
        adobeBlog: 'https://blog.adobe.com',
        adobeDotCom: 'https://www.stage.adobe.com',
        adobeEnterprise: 'https://stockenterprise.adobe.com',
        adobeFontsTypekit: 'https://use.typekit.net',
        adobeHelpX: 'https://helpx.stage.adobe.com',
        adobeIms: 'https://ims-na1-stg1.adobelogin.com?locale=en_US',
        adobeSpark: 'https://spark.adobe.com',
        adobeStock: 'https://primary.stock.stage.adobe.com',
        adobeStockContributor: 'https://primary.stock-contributor.stage.adobe.com',
        adobeStockBrowseStandardAssets: 'https://primary.stock.stage.adobe.com/search?filters[content_type:photo]=1&filters[content_type:illustration]=1&filters[content_type:zip_vector]=1&filters[content_type:video]=1&filters[content_type:template]=1&filters[content_type:3d]=1&filters[content_type:audio]=0&filters[include_stock_enterprise]=0&filters[is_editorial]=0&filters[free_collection]=0&filters[content_type:image]=1&order=relevance&safe_search=1&price[$]=1&search_type=filter-select&get_facets=1'
      }
    },
    analytics: {
      marketingTechBootstrapUrl: 'https://www.adobe.com/marketingtech/main.stage.min.js',
      launchEmbedCode: 'd4d114c60e50/26d60dad928c/launch-beeceef6fc77-staging'
    },
    csrfToken: 'T73vR9nL-FyOZg0OTljqiVlMSTZbiLZjPV8M',
    hostUrl: 'http://adobestock.dev.stage.adobe.com'
  };

function StockNavbar({ intl, isGloballySafeCollectionEnabled }) {  
  // const {
  //   [isNavbarV2EnabledFF.id]: isNavbarV2Enabled = { value: false },
  //   [isNavbarV2WithoutFreePremiumEnabledFF.id]: isNavbarV2WithoutFreePremiumEnabled = { value: false },
  // } = useFeatureFlags();

  const appConfig = {
    ...config,
    isGloballySafeCollectionEnabled,
  };

  // read FFs from Franklin
  // <meta name="feature-flags" content="isNavbarV2Enabled">
  const featureFlags = document.head.getElementsByTagName('meta')['feature-flags'].content;
  // super simple for now - assume only 1 FF is passed
  const ffName = featureFlags.split(':')[0];
  const ffValue = featureFlags.split(':')[1];

  // Phone number
  const phoneNumber = document.head.getElementsByTagName('meta')['phone-number'].content;

  console.log(featureFlags);
  return (
    <StockNavbarFranklinWrapper
      config={appConfig}
      intl={intl}
      {...{
        [ffName]: eval(ffValue),
      }}
      // Can Phone number come dynamically from Franklin? Or use set of ph nos by locale
      phoneNumber={phoneNumber}
    />
    )
  }

export default injectIntl(StockNavbar);
