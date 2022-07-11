import { matchPath, useLocation } from 'react-router-dom';

import { Path, getRoute__UNSAFE } from 'router/routing';

const matchPathOptions = {
  exact: true,
  path: Object.values(Path),
  strict: true,
};

export function useQueryParams() {
  const params = {};
  const { search } = useLocation();
  const query = new URLSearchParams(search).entries();
  for (let cur = query.next(); !cur.done; cur = query.next()) {
    const [key, value] = cur.value;
    params[key] = value;
  }
  return params;
}

export default function useDikastisRouting() {
  const { pathname } = useLocation();
  const routeMatch = matchPath(pathname, matchPathOptions);

  const { params, path, url } = routeMatch;
  const route = getRoute__UNSAFE(path);

  return {
    domain: route.domain,
    params,
    path,
    tabs: route.tabs,
    url,
  };
}
