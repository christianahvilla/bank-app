import { TransactionsErrorElement } from './transactions-error.element';
import { TransactionsElement } from './transactions.element';
import { RouteURLs } from './urls';
import { routes as createTrasanctionRoutes } from './create/routes';
import { routes as listTransactionRoutes } from './list/routes';

import { NonIndexRouteObjectWithNav } from '~types/router/route-object-with-nav.type';

export const routes: Array<NonIndexRouteObjectWithNav> = [
  {
    path: RouteURLs.ROOT,
    element: <TransactionsElement />,
    errorElement: <TransactionsErrorElement />,
    name: RouteURLs.ROOT,
    showInNav: false,
    order: 1,
    children: [...createTrasanctionRoutes, ...listTransactionRoutes],
  },
];
