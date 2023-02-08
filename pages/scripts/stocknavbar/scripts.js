import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CoreSpectrumProvider } from '@astock/core-react-spectrum/coreSpectrumProvider';
import { CoreSpectrumV3Provider } from '@astock/core-react-spectrum/coreSpectrumV3Provider';
import { IntlProvider } from 'react-intl';
import {
  STOCK_BASENAME_DEFAULT,
  STOCK_BASENAMES,
} from '@astock/stock-locales/basenames';
import STOCK_BASENAME_TO_LANGUAGE from '@astock/stock-locales/basenameToLanguage';
import STOCK_BASENAME_TO_COUNTRY from '@astock/stock-locales/basenameToCountry';
import STOCK_BASENAMES_GSC from '@astock/stock-locales/basenames/gsc';
import STOCK_COUNTRIES_GSC from '@astock/stock-locales/countries/gsc';

import StockNavbar from './StockNavbar';

function WrappedApp() {
  const spectrumContainer = document.createElement('div');
  document.body.appendChild(spectrumContainer);

  // dynamically fetch localized strings file
  const [localizedStrings, setLocalizedStrings] = useState(null);

  const getRouteBasename = () => {
    const { pathname } = window.location;
  
    const urlParts = pathname.split('/');
    const basename = urlParts[1];
  
    return STOCK_BASENAMES.has(basename)
      ? basename
      : STOCK_BASENAME_DEFAULT;
  }

  // get locale info from window
  const basename = getRouteBasename();
  const languageTag = STOCK_BASENAME_TO_LANGUAGE.get(basename).toLowerCase();
  const country = STOCK_BASENAME_TO_COUNTRY.get(basename);

  // GSC
  const isGSCLocale = STOCK_BASENAMES_GSC.has(basename);
  const isGSCCountry = STOCK_COUNTRIES_GSC.has(country);
  const isGloballySafeCollectionEnabled = isGSCLocale || isGSCCountry;

  useEffect(() => {
    const fetchLocalizedStrings = async () => {
      try {
         // hlx
         const res = await fetch(`/pages/artisthub/stocknavbar/strings/${languageTag}.json`);
        
         if (res.status === 200) {
           const json = await res.json();
           const messages = {};
           json.data.forEach((message) => {
            messages[message.Key] = message.Text;
          });
           setLocalizedStrings(messages);
         } else if (res.status === 404) {
           // local
           const res = await fetch(`/pages/scripts/stocknavbar/strings/${languageTag}.json`);
           const json = await res.json();
           setLocalizedStrings(json);
         }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocalizedStrings();
  }, []);

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

if (localizedStrings) {
  return (
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
  );
} 

  return <></>
}

const container = document.createElement('div');
document.querySelector('header').append(container);

ReactDOM.render(<WrappedApp />, container);
