import { PAGIN_DEFAULT_OFFSET, PAGIN_DEFAULT_PAGE } from 'common/constants';
import { PaginationArgType } from 'common/models';

export function getPaginationParameters(
  paginOptitons: PaginationArgType,
): PaginationArgType {
  const { page, offset } = paginOptitons;
  return {
    page: page ?? PAGIN_DEFAULT_PAGE,
    offset: offset ?? PAGIN_DEFAULT_OFFSET,
  };
}
