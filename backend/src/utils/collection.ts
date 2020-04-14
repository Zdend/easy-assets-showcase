import { SelectQueryBuilder, Brackets } from 'typeorm';
import { generate } from 'shortid';
import { SortDirection, StringCriteria } from '../generated/types';

const alphaKey = () => generate().replace(/[^\w]+/g, '');

export const applyInCriteria = <T>(
  query: SelectQueryBuilder<T>,
  field: string,
  criteria: any,
  isOr: boolean = false
): SelectQueryBuilder<T> => {
  if (criteria && typeof criteria === 'object') {
    const not = criteria?.notIn?.length;
    const values = not ? criteria.notIn : criteria.in;

    if (values?.length) {
      const brackets = new Brackets(qb => {
        values.forEach(value => {
          const key = alphaKey();
          qb[not ? 'andWhere' : 'orWhere'](`${field} ${not ? '!=' : '='} (:${key})`, {
            [key]: value
          });
        });
      });

      if (isOr) {
        return query.orWhere(brackets);
      }
      return query.andWhere(brackets);
    }
  }
  return query;
};

export const applyEqCriteria = <T>(
  query: SelectQueryBuilder<T>,
  field: string,
  value: any
): SelectQueryBuilder<T> => {
  if (typeof value !== 'undefined') {
    const key = alphaKey();
    return query.andWhere(`${field} = :${key}`, {
      [key]: value
    });
  }
  return query;
};

export const applyOrderBy = <T>(
  query: SelectQueryBuilder<T>,
  field: string,
  sortDir: SortDirection
): SelectQueryBuilder<T> => {
  if (field) {
    return query.orderBy(field, sortDir);
  }

  return query;
};

export const applySearchCriteria = <T>(
  query: SelectQueryBuilder<T>,
  fields: string[],
  searchExpression: string,
  isOr: boolean = false
) => {
  if (!searchExpression || !fields) {
    return query;
  }
  const brackets = new Brackets(qb => {
    const searchTerms = searchExpression.split(',');
    const createSearchCriteria = term => ({
      search: `%${term}%`
    });
    searchTerms.forEach(term => {
      fields.forEach(field => {
        qb.orWhere(`${field} like :search`, createSearchCriteria(term));
      });
    });
  });

  if (isOr) {
    return query.orWhere(brackets);
  }
  return query.andWhere(brackets);
};

export const addAnyTypeToStringCriteria = (
  criteria: StringCriteria,
  anyType: string
): StringCriteria => {
  if (!criteria) {
    return null;
  }

  return {
    in: criteria.in ? [...criteria.in, anyType] : null,
    notIn: criteria.notIn ? [...criteria.notIn, anyType] : null
  };
};
