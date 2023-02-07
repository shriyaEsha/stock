import {
  isNavbarV2EnabledFF,
  isNavbarV2WithoutFreePremiumEnabledFF,
} from '@astock/react-feature-flags';

/**
   * Flag to indicate if Navbar V2 is enabled or not
   */
export const isNavbarV2Enabled = true;

/**
   * Flag to indicate if Navbar V2 without Free or Premium is enabled or not
   */
export const isNavbarV2WithoutFreePremiumEnabled = true;

/**
   * Stock feature flags map
   *
   * This is used to supply to the FeatureFlagsProvider
   */
export default Object.freeze({
  [isNavbarV2EnabledFF.id]: Object.freeze({
    value: isNavbarV2Enabled,
  }),
  [isNavbarV2WithoutFreePremiumEnabledFF.id]: Object.freeze({
    value: isNavbarV2WithoutFreePremiumEnabled,
  }),
});
