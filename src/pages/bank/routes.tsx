import { RouteURLs } from './urls';

import { NonIndexRouteObjectWithNav } from '~types/router/route-object-with-nav.type';
import { BankErrorElement } from './bank-error.element';
import { BankElement } from './bank.element';

export const routes: Array<NonIndexRouteObjectWithNav> = [
  {
    path: RouteURLs.ROOT,
    element: <BankElement />,
    errorElement: <BankErrorElement />,
    name: RouteURLs.ROOT,
    showInNav: false,
    order: 1,
  },
];
