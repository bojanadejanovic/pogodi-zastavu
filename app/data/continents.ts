// Hardcoded ISO 3166-1 alpha-2 code → continent mapping.
// Continent names match the GameMode values: Europe, Africa, Asia, Americas, Oceania.
export const COUNTRY_CONTINENT: Record<string, string> = {
  // Europe
  al: 'Europe', // Albania
  ad: 'Europe', // Andorra
  am: 'Europe', // Armenia
  at: 'Europe', // Austria
  az: 'Europe', // Azerbaijan
  by: 'Europe', // Belarus
  be: 'Europe', // Belgium
  ba: 'Europe', // Bosnia and Herzegovina
  bg: 'Europe', // Bulgaria
  hr: 'Europe', // Croatia
  cy: 'Europe', // Cyprus
  cz: 'Europe', // Czech Republic
  dk: 'Europe', // Denmark
  ee: 'Europe', // Estonia
  fi: 'Europe', // Finland
  fr: 'Europe', // France
  ge: 'Europe', // Georgia
  de: 'Europe', // Germany
  gr: 'Europe', // Greece
  hu: 'Europe', // Hungary
  is: 'Europe', // Iceland
  ie: 'Europe', // Ireland
  it: 'Europe', // Italy
  xk: 'Europe', // Kosovo
  lv: 'Europe', // Latvia
  li: 'Europe', // Liechtenstein
  lt: 'Europe', // Lithuania
  lu: 'Europe', // Luxembourg
  mk: 'Europe', // North Macedonia
  mt: 'Europe', // Malta
  md: 'Europe', // Moldova
  mc: 'Europe', // Monaco
  me: 'Europe', // Montenegro
  nl: 'Europe', // Netherlands
  no: 'Europe', // Norway
  pl: 'Europe', // Poland
  pt: 'Europe', // Portugal
  ro: 'Europe', // Romania
  ru: 'Europe', // Russia
  sm: 'Europe', // San Marino
  rs: 'Europe', // Serbia
  sk: 'Europe', // Slovakia
  si: 'Europe', // Slovenia
  es: 'Europe', // Spain
  se: 'Europe', // Sweden
  ch: 'Europe', // Switzerland
  tr: 'Europe', // Turkey
  ua: 'Europe', // Ukraine
  gb: 'Europe', // United Kingdom
  va: 'Europe', // Vatican City

  // Africa
  dz: 'Africa', // Algeria
  ao: 'Africa', // Angola
  bj: 'Africa', // Benin
  bw: 'Africa', // Botswana
  bf: 'Africa', // Burkina Faso
  bi: 'Africa', // Burundi
  cm: 'Africa', // Cameroon
  cv: 'Africa', // Cape Verde
  cf: 'Africa', // Central African Republic
  td: 'Africa', // Chad
  km: 'Africa', // Comoros
  cd: 'Africa', // DR Congo
  cg: 'Africa', // Republic of the Congo
  ci: 'Africa', // Côte d\'Ivoire
  dj: 'Africa', // Djibouti
  eg: 'Africa', // Egypt
  gq: 'Africa', // Equatorial Guinea
  er: 'Africa', // Eritrea
  et: 'Africa', // Ethiopia
  ga: 'Africa', // Gabon
  gm: 'Africa', // Gambia
  gh: 'Africa', // Ghana
  gn: 'Africa', // Guinea
  gw: 'Africa', // Guinea-Bissau
  ke: 'Africa', // Kenya
  ls: 'Africa', // Lesotho
  lr: 'Africa', // Liberia
  ly: 'Africa', // Libya
  mg: 'Africa', // Madagascar
  mw: 'Africa', // Malawi
  ml: 'Africa', // Mali
  mr: 'Africa', // Mauritania
  mu: 'Africa', // Mauritius
  ma: 'Africa', // Morocco
  mz: 'Africa', // Mozambique
  na: 'Africa', // Namibia
  ne: 'Africa', // Niger
  ng: 'Africa', // Nigeria
  rw: 'Africa', // Rwanda
  st: 'Africa', // São Tomé and Príncipe
  sn: 'Africa', // Senegal
  sl: 'Africa', // Sierra Leone
  so: 'Africa', // Somalia
  za: 'Africa', // South Africa
  ss: 'Africa', // South Sudan
  sd: 'Africa', // Sudan
  sz: 'Africa', // Eswatini
  tz: 'Africa', // Tanzania
  tg: 'Africa', // Togo
  tn: 'Africa', // Tunisia
  ug: 'Africa', // Uganda
  zm: 'Africa', // Zambia
  zw: 'Africa', // Zimbabwe

  // Asia
  af: 'Asia', // Afghanistan
  bh: 'Asia', // Bahrain
  bd: 'Asia', // Bangladesh
  bt: 'Asia', // Bhutan
  bn: 'Asia', // Brunei
  mm: 'Asia', // Myanmar
  kh: 'Asia', // Cambodia
  cn: 'Asia', // China
  in: 'Asia', // India
  id: 'Asia', // Indonesia
  ir: 'Asia', // Iran
  iq: 'Asia', // Iraq
  il: 'Asia', // Israel
  jp: 'Asia', // Japan
  jo: 'Asia', // Jordan
  kz: 'Asia', // Kazakhstan
  kp: 'Asia', // North Korea
  kr: 'Asia', // South Korea
  kw: 'Asia', // Kuwait
  kg: 'Asia', // Kyrgyzstan
  la: 'Asia', // Laos
  lb: 'Asia', // Lebanon
  my: 'Asia', // Malaysia
  mv: 'Asia', // Maldives
  mn: 'Asia', // Mongolia
  np: 'Asia', // Nepal
  om: 'Asia', // Oman
  pk: 'Asia', // Pakistan
  ps: 'Asia', // Palestine
  ph: 'Asia', // Philippines
  qa: 'Asia', // Qatar
  sa: 'Asia', // Saudi Arabia
  sg: 'Asia', // Singapore
  lk: 'Asia', // Sri Lanka
  sy: 'Asia', // Syria
  tw: 'Asia', // Taiwan
  tj: 'Asia', // Tajikistan
  th: 'Asia', // Thailand
  tl: 'Asia', // Timor-Leste
  tm: 'Asia', // Turkmenistan
  ae: 'Asia', // United Arab Emirates
  uz: 'Asia', // Uzbekistan
  vn: 'Asia', // Vietnam
  ye: 'Asia', // Yemen

  // Americas (North + South + Caribbean)
  ag: 'Americas', // Antigua and Barbuda
  ar: 'Americas', // Argentina
  bs: 'Americas', // Bahamas
  bb: 'Americas', // Barbados
  bz: 'Americas', // Belize
  bo: 'Americas', // Bolivia
  br: 'Americas', // Brazil
  ca: 'Americas', // Canada
  cl: 'Americas', // Chile
  co: 'Americas', // Colombia
  cr: 'Americas', // Costa Rica
  cu: 'Americas', // Cuba
  dm: 'Americas', // Dominica
  do: 'Americas', // Dominican Republic
  ec: 'Americas', // Ecuador
  sv: 'Americas', // El Salvador
  gd: 'Americas', // Grenada
  gt: 'Americas', // Guatemala
  gy: 'Americas', // Guyana
  ht: 'Americas', // Haiti
  hn: 'Americas', // Honduras
  jm: 'Americas', // Jamaica
  mx: 'Americas', // Mexico
  ni: 'Americas', // Nicaragua
  pa: 'Americas', // Panama
  py: 'Americas', // Paraguay
  pe: 'Americas', // Peru
  kn: 'Americas', // Saint Kitts and Nevis
  lc: 'Americas', // Saint Lucia
  vc: 'Americas', // Saint Vincent and the Grenadines
  sr: 'Americas', // Suriname
  tt: 'Americas', // Trinidad and Tobago
  us: 'Americas', // United States
  uy: 'Americas', // Uruguay
  ve: 'Americas', // Venezuela

  // Oceania
  au: 'Oceania', // Australia
  fj: 'Oceania', // Fiji
  ki: 'Oceania', // Kiribati
  mh: 'Oceania', // Marshall Islands
  fm: 'Oceania', // Micronesia
  nr: 'Oceania', // Nauru
  nz: 'Oceania', // New Zealand
  pw: 'Oceania', // Palau
  pg: 'Oceania', // Papua New Guinea
  ws: 'Oceania', // Samoa
  sb: 'Oceania', // Solomon Islands
  to: 'Oceania', // Tonga
  tv: 'Oceania', // Tuvalu
  vu: 'Oceania', // Vanuatu
};

export function getContinent(code: string): string | undefined {
  return COUNTRY_CONTINENT[code.toLowerCase()];
}
