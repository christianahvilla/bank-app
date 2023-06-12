import { ListTransactionErrorElement } from './list-error-transaction.element';
import { ListTransactionElement } from './list-transaction.element';
import { RouteURLs } from './urls';

import { NonIndexRouteObjectWithNav } from '~types/router/route-object-with-nav.type';

export const routes: Array<NonIndexRouteObjectWithNav> = [
  {
    path: RouteURLs.ROOT,
    element: <ListTransactionElement />,
    errorElement: <ListTransactionErrorElement />,
    name: RouteURLs.ROOT,
    showInNav: false,
    order: 1,
  },
];
