import React from 'react';
import { NextPage } from 'next';
import capitalize from 'lodash.capitalize';
import flatten from 'ramda/src/flatten';
import uniq from 'ramda/src/uniq';
import useLocation from '@/hooks/useLocation';
import CompanyListing from '@/smart/CompanyListing';
import useCompanyListingQuery from '@/hooks/useCompanyListingQuery';
import { Paragraph } from '@/components/Typography';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';

const TheBestAccountantsInCityPage: NextPage = () => {
  const { pathname } = useLocation();
  const city = pathname.replace('/best-accountants-tax-agents-', '').toUpperCase();
  const result = useCompanyListingQuery({ ADDRESS_CITY: { in: [city] } }, 0, 20);
  const suburbs = uniq(
    flatten(
      result.data?.companies?.items?.map(company =>
        company.addresses.map(address => capitalize(address.suburb))
      ) || []
    ) || []
  ).slice(0, 10);
  const capCity = capitalize(city);

  return (
    <PublicSimpleContentLayout
      meta={{
        title: `Best accountants and Tax agents for individual and business in ${capitalize(city)}`,
        description: `Find the best accountants in ${capitalize(city)}.`
      }}
      title={`Recommended Accountants and Tax agents in ${capitalize(city)}`}
    >
      <Paragraph size="large">
        &quot;Do you know a good accountant in {capCity}?&quot; Everyone has heard this sentence at
        least once in their life. Easy Assets allows you to find the right accountant or tax agent
        for total peace of mind. Having the right financial expert gives you professional advice,
        tax return optimisations, cloud accounting, risk management and advising on financial
        structures, Self-managed super fund (SMSF), bookkeeping services and much more. {capCity} is
        a vast city – we help you find financial experts close by in suburbs like{' '}
        {suburbs.join(', ')} and many more, for people preferring a face to face meeting.
      </Paragraph>
      <CompanyListing showEmpty title={<span />} result={result} />
    </PublicSimpleContentLayout>
  );
};

export default TheBestAccountantsInCityPage;
