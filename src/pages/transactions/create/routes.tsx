import { CreateTransactionElement } from './create-transaction.element';
import { CreateTransactionErrorElement } from './create-transaction-error.element';
import { RouteURLs } from './urls';

import { NonIndexRouteObjectWithNav } from '~types/router/route-object-with-nav.type';

export const routes: Array<NonIndexRouteObjectWithNav> = [
  {
    path: RouteURLs.ROOT,
    element: <CreateTransactionElement />,
    errorElement: <CreateTransactionErrorElement />,
    name: RouteURLs.ROOT,
    showInNav: false,
    order: 1,
  },
];
