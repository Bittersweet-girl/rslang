import NAVIGATE from '../constants/actionTypes';
import { ActionNavigate, NavState } from '../types';

export default function navigation(navState: NavState, { type, payload }: ActionNavigate) {
  switch (type) {
    case NAVIGATE:
      return { page: payload.page, pageProps: payload.pageProps || {} };
    default:
      return navState;
  }
}

// export type TNavigation = typeof navigation;
