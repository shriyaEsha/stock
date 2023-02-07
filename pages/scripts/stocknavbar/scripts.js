import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CoreSpectrumProvider } from '@astock/core-react-spectrum/coreSpectrumProvider';
import { CoreSpectrumV3Provider } from '@astock/core-react-spectrum/coreSpectrumV3Provider';
// import {
//   FeatureFlagsProvider,
// } from '@astock/react-feature-flags';
import { IntlProvider } from 'react-intl';
import {
  CoreContextProvider,
  FEATURE_FLAGS_NAMESPACE,
} from '@astock/core-react-context/core';
import {
  STOCK_BASENAME_DEFAULT,
  STOCK_BASENAMES,
} from '@astock/stock-locales/basenames';
import STOCK_BASENAME_TO_LANGUAGE from '@astock/stock-locales/basenameToLanguage';
import STOCK_BASENAME_TO_COUNTRY from '@astock/stock-locales/basenameToCountry';
import STOCK_BASENAMES_GSC from '@astock/stock-locales/basenames/gsc';
import STOCK_COUNTRIES_GSC from '@astock/stock-locales/countries/gsc';

import FEATURE_FLAGS from './featureFlags';
import strings from './strings';
import StockNavbar from './StockNavbar';

function WrappedApp() {
  const spectrumContainer = document.createElement('div');
  document.body.appendChild(spectrumContainer);

  // dynamically fetch localized strings file
  const [localizedStrings, setLocalizedStrings] = useState({});

  const getRouteBasename = () => {
    const pathname = '/fr'; // const { pathname } = window.location;
  
    const urlParts = pathname.split('/');
    const basename = urlParts[1];
  
    return STOCK_BASENAMES.has(basename)
      ? basename
      : STOCK_BASENAME_DEFAULT;
  }

  // get locale info from window
  const basename = getRouteBasename();
  const languageTag = STOCK_BASENAME_TO_LANGUAGE.get(basename);
  const country = STOCK_BASENAME_TO_COUNTRY.get(basename);

  // GSC
  const isGSCLocale = STOCK_BASENAMES_GSC.has(basename);
  const isGSCCountry = STOCK_COUNTRIES_GSC.has(country);
  const isGloballySafeCollectionEnabled = isGSCLocale || isGSCCountry;

  useEffect(() => {
    fetch(`/pages/scripts/stocknavbar/strings/${languageTag}.json`)
      .then(res => res.json())
      .then((response) => {
        setLocalizedStrings(response);
      })
      .catch(error => console.log(error));
  
    // import(`/pages/scripts/stocknavbar/strings/fr-FR.js`).then(({default: strings}) => setLocalizedStrings(strings));
  }, []);

  const context = {
    [FEATURE_FLAGS_NAMESPACE]: FEATURE_FLAGS,
  };

  // Privacy & Consent for GDPR Banner

//   function checkConsent() {
//     const activeGroups = window.adobePrivacy.activeCookieGroups();
//     if (activeGroups.indexOf('C0004') !== -1) { // the group I want to check
//         // load your tracking script
//         // perform group related actions
//         console.log('Tracking now!')
//     }
// }
 
// window.addEventListener('adobePrivacy:PrivacyConsent', () => {
//     console.log('all groups and hosts enabled');
//     checkConsent();
// });
 
// window.addEventListener('adobePrivacy:PrivacyCustom', () => {
//     console.log('user selected groups and hosts');
//     checkConsent();
// });
 
// window.addEventListener('adobePrivacy:PrivacyReject', () => {
//     console.log('only core groups and hosts enabled - C0001');
//     checkConsent();
// });

  return (
    <CoreContextProvider {...context}>
      <IntlProvider
        locale={languageTag}
        defaultLocale={languageTag}
        messages={localizedStrings}
      >
        <CoreSpectrumProvider theme="light" toastPlacement="bottom center">
          <CoreSpectrumV3Provider>
            <StockNavbar isGloballySafeCollectionEnabled={isGloballySafeCollectionEnabled} />
          </CoreSpectrumV3Provider>
        </CoreSpectrumProvider>
      </IntlProvider>
    </CoreContextProvider>
  );
}

const container = document.createElement('div');
// document.getElementsByClassName('navbar-placeholder')[0].append(container);
document.querySelector('header').append(container);

ReactDOM.render(<WrappedApp />, container);
