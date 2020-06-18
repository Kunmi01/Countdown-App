import { PROMO_DATA, PROMO_END_DATE } from './constants';

export const supportsLocalStorage = () => {
  try {
    return 'localStorage' in window && window.localStorage != null;
  } catch (e) {
    return false;
  }
};

export const savePromoData = promoData => {
  try {
    const serializedData = JSON.stringify(promoData);
    localStorage.setItem(PROMO_DATA, serializedData);
  } catch {
    // ignore write errors
  }
};

export const loadPromoData = () => {
  try {
    const storedData =
      JSON.parse(localStorage.getItem(PROMO_DATA)) || undefined;
    return storedData;
  } catch (err) {
    return undefined;
  }
};

export const savePromoEndDate = endDate => {
  try {
    const serializedEndDate = JSON.stringify(endDate);
    localStorage.setItem(PROMO_END_DATE, serializedEndDate);
  } catch {
    // ignore write errors
  }
};

export const loadPromoEndDate = () => {
  try {
    const storedEndDate =
      JSON.parse(localStorage.getItem(PROMO_END_DATE)) || undefined;
    return storedEndDate;
  } catch (err) {
    return undefined;
  }
};
