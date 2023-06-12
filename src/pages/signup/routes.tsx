import { SignupElementError } from './signup-error.element';
import SignupElement from './signup.element';
import { RouteURLs } from './urls';

import { NonIndexRouteObjectWithNav } from '~types/router/route-object-with-nav.type';

export const routes: Array<NonIndexRouteObjectWithNav> = [
  {
    path: RouteURLs.ROOT,
    element: <SignupElement />,
    errorElement: <SignupElementError />,
    name: RouteURLs.ROOT,
    showInNav: false,
    order: 1,
  },
];
