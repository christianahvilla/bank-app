import { NonIndexRouteObjectWithNav } from '~types/router/route-object-with-nav.type';
import { RouteURLs } from './urls';
import { HomeRouteErrorElement } from './home-route-error.element';
import { loader as homeRouteLoader } from './loader';
import { routes as serverErrorRoutes } from '~pages/500/routes';
import { routes as notFoundRoutes } from '~pages/404/routes';
import { routes as notAuthorizedRoutes } from '~pages/403/routes';
import { routes as loginRoutes } from '~pages/login/routes';
import { routes as bankRoutes } from '~pages/bank/routes';
import { routes as signupRoutes } from '~pages/signup/routes';
import { routes as accountRoutes } from '~pages/account/routes';
import { routes as transactionRoutes } from '~pages/transactions/routes';
import { HomeRouteElement } from './home-route.element';

export const routes: Array<NonIndexRouteObjectWithNav> = [
  {
    path: RouteURLs.ROOT,
    element: <HomeRouteElement />,
    errorElement: <HomeRouteErrorElement />,
    name: RouteURLs.ROOT,
    showInNav: false,
    order: 1,
    loader: homeRouteLoader,
    children: [
      ...serverErrorRoutes,
      ...notAuthorizedRoutes,
      ...notFoundRoutes,
      ...loginRoutes,
      ...bankRoutes,
      ...signupRoutes,
      ...accountRoutes,
      ...transactionRoutes,
    ],
  },
];
