import { useSearchParams, useParams } from 'react-router-dom';
import { useMemo } from 'react';

interface UseRouteParamsReturn {
  params: Record<string, string>;
  searchParams: URLSearchParams;
  updateSearchParam: (key: string, value: string | null) => void;
  getSearchParam: (key: string, defaultValue?: string) => string;
  clearSearchParams: () => void;
  buildUrl: (path: string, params?: Record<string, string>) => string;
}

export const useRouteParams = (): UseRouteParamsReturn => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    
    setSearchParams(newParams);
  };

  const getSearchParam = (key: string, defaultValue = '') => {
    return searchParams.get(key) || defaultValue;
  };

  const clearSearchParams = () => {
    setSearchParams({});
  };

  const buildUrl = (path: string, urlParams?: Record<string, string>) => {
    if (!urlParams || Object.keys(urlParams).length === 0) {
      return path;
    }
    
    const query = new URLSearchParams(urlParams).toString();
    return `${path}?${query}`;
  };

  const memoizedParams = useMemo(() => params as Record<string, string>, [params]);

  return {
    params: memoizedParams,
    searchParams,
    updateSearchParam,
    getSearchParam,
    clearSearchParams,
    buildUrl,
  };
};

export default useRouteParams;