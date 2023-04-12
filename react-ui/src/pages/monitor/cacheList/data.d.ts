export type CacheDataType = {
  cacheKey: string;
  cacheName: string;
  cacheValue: string;
  remark: string;
};

export type CacheNamesResponseType = {
  data: CacheDataType[];
  code: number;
  msg: string;
};
