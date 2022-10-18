import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { ListRes } from '../types/global';
import { Pair } from '../types/pair';
import { getCookies } from '../utils/cookie';
import { getDomainName } from '../utils/utils';
import { instance } from './utils';

const PAIRS = "PAIRS"

export const useGetPairs = (clientId?: string) => useQuery<AxiosResponse<ListRes<Pair>>>([PAIRS], () =>
  instance.post('pairs/list', {
    type: "query",
    filter: {
      domain: getDomainName(),
      type: "basic"
    },
    clientId: clientId || getCookies("clientId"),
  }), {
    enabled: !!clientId || !!getCookies("clientId"),
  }
)
