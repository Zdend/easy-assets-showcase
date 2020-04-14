import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { NowRequest, NowResponse } from '@now/node';
import ORMConfig from '../ormconfig';
import { Post, Company, Feature } from './entity';

const generateUrlSet = (body: string) => `<urlset 
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${body}
</urlset>`;

const generateItem = (hostname: string) => (
  loc: string,
  priority: number = 1.0,
  lastmod: Date = new Date()
) => {
  return `<url>
  <loc>${hostname}/${loc}</loc>
  <lastmod>${lastmod.toISOString()}</lastmod>
  <priority>${priority}</priority>
</url>`;
};

const staticPages = [
  '',
  'blog',
  'best-accountants-tax-agents-adelaide',
  'best-accountants-tax-agents-brisbane',
  'best-accountants-tax-agents-canberra',
  'best-accountants-tax-agents-melbourne',
  'best-accountants-tax-agents-perth',
  'best-accountants-tax-agents-sydney',
  'legal/privacy-policy',
  'legal/terms-of-use',
  'tools/compound-interest-calculator',
  'tools/loan-repayment-calculator',
  'tools/money-allocation-chart',
  'tools/net-salary-calculator',
  'tools/rent-or-buy-property-calculator',
  'tools/salary-sacrifice-calculator',
  'tax-return'
];

const connectionPromise = createConnection(ORMConfig);

export default async (req: NowRequest, res: NowResponse) => {
  const connection = await connectionPromise;
  const origin = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  const genItem = generateItem(origin);

  const staticUrls = staticPages.map(url => genItem(url));
  const posts = await connection
    .getRepository(Post)
    .createQueryBuilder('post')
    .select('post.slug')
    .andWhere('post.published = true')
    .andWhere('post.slug != ""')
    .getMany();

  const companies = await connection
    .getRepository(Company)
    .createQueryBuilder('company')
    .select('company.slug')
    .andWhere('company.slug != ""')
    .getMany();

  const services = await connection
    .getRepository(Feature)
    .createQueryBuilder('feature')
    .select('feature.slug')
    .andWhere('feature.slug != ""')
    .getMany();

  const postUrls = posts.map(post => genItem(`blog/${post.slug}`));
  const companyUrls = companies.map(company => genItem(`company/${company.slug}`));
  const serviceUrls = services.map(service => genItem(`services/${service.slug}`));

  const sitemap = generateUrlSet(
    [...staticUrls, ...postUrls, ...companyUrls, ...serviceUrls].join('\n')
  );

  res.setHeader('content-type', 'application/xml');

  res.status(200).send(sitemap);
};
