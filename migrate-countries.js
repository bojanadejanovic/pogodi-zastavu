#!/usr/bin/env node

/**
 * Migration script to populate PocketBase countries collection
 * This script contains a comprehensive list of countries with continents assigned
 * 
 * Usage:
 *   node migrate-countries.js
 *   node migrate-countries.js --upload
 * 
 * Requirements for upload:
 *   - Set POCKETBASE_URL environment variable (or in .env.local)
 *   - Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD (or in .env.local)
 *   - PocketBase should have a 'countries' collection with fields:
 *     - code (text, required)
 *     - nameEn (text, required)
 *     - nameSr (text, required) 
 *     - flagFile (text, required)
 *     - continent (text, required)
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local if it exists
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    console.log('Loading environment variables from .env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
        if (key && value !== undefined) {
          process.env[key] = value;
        }
      }
    });
  } else {
    console.log('No .env.local file found, using system environment variables');
  }
}

// Load environment variables
loadEnvFile();

// Comprehensive countries data with continents
const countries = [
  // Europe
  { code: 'ad', nameEn: 'Andorra', nameSr: 'Андора', flagFile: 'ad.svg', continent: 'Europe' },
  { code: 'al', nameEn: 'Albania', nameSr: 'Албанија', flagFile: 'al.svg', continent: 'Europe' },
  { code: 'at', nameEn: 'Austria', nameSr: 'Аустрија', flagFile: 'at.svg', continent: 'Europe' },
  { code: 'ba', nameEn: 'Bosnia and Herzegovina', nameSr: 'Босна и Херцеговина', flagFile: 'ba.svg', continent: 'Europe' },
  { code: 'be', nameEn: 'Belgium', nameSr: 'Белгија', flagFile: 'be.svg', continent: 'Europe' },
  { code: 'bg', nameEn: 'Bulgaria', nameSr: 'Бугарска', flagFile: 'bg.svg', continent: 'Europe' },
  { code: 'by', nameEn: 'Belarus', nameSr: 'Белорусија', flagFile: 'by.svg', continent: 'Europe' },
  { code: 'ch', nameEn: 'Switzerland', nameSr: 'Швајцарска', flagFile: 'ch.svg', continent: 'Europe' },
  { code: 'cy', nameEn: 'Cyprus', nameSr: 'Кипар', flagFile: 'cy.svg', continent: 'Europe' },
  { code: 'cz', nameEn: 'Czech Republic', nameSr: 'Чешка', flagFile: 'cz.svg', continent: 'Europe' },
  { code: 'de', nameEn: 'Germany', nameSr: 'Немачка', flagFile: 'de.svg', continent: 'Europe' },
  { code: 'dk', nameEn: 'Denmark', nameSr: 'Данска', flagFile: 'dk.svg', continent: 'Europe' },
  { code: 'ee', nameEn: 'Estonia', nameSr: 'Естонија', flagFile: 'ee.svg', continent: 'Europe' },
  { code: 'es', nameEn: 'Spain', nameSr: 'Шпанија', flagFile: 'es.svg', continent: 'Europe' },
  { code: 'fi', nameEn: 'Finland', nameSr: 'Финска', flagFile: 'fi.svg', continent: 'Europe' },
  { code: 'fr', nameEn: 'France', nameSr: 'Француска', flagFile: 'fr.svg', continent: 'Europe' },
  { code: 'gb', nameEn: 'United Kingdom', nameSr: 'Уједињено Краљевство', flagFile: 'gb.svg', continent: 'Europe' },
  { code: 'gr', nameEn: 'Greece', nameSr: 'Грчка', flagFile: 'gr.svg', continent: 'Europe' },
  { code: 'hr', nameEn: 'Croatia', nameSr: 'Хрватска', flagFile: 'hr.svg', continent: 'Europe' },
  { code: 'hu', nameEn: 'Hungary', nameSr: 'Мађарска', flagFile: 'hu.svg', continent: 'Europe' },
  { code: 'ie', nameEn: 'Ireland', nameSr: 'Ирска', flagFile: 'ie.svg', continent: 'Europe' },
  { code: 'is', nameEn: 'Iceland', nameSr: 'Исланд', flagFile: 'is.svg', continent: 'Europe' },
  { code: 'it', nameEn: 'Italy', nameSr: 'Италија', flagFile: 'it.svg', continent: 'Europe' },
  { code: 'li', nameEn: 'Liechtenstein', nameSr: 'Лихтенштајн', flagFile: 'li.svg', continent: 'Europe' },
  { code: 'lt', nameEn: 'Lithuania', nameSr: 'Литванија', flagFile: 'lt.svg', continent: 'Europe' },
  { code: 'lu', nameEn: 'Luxembourg', nameSr: 'Луксембург', flagFile: 'lu.svg', continent: 'Europe' },
  { code: 'lv', nameEn: 'Latvia', nameSr: 'Летонија', flagFile: 'lv.svg', continent: 'Europe' },
  { code: 'mc', nameEn: 'Monaco', nameSr: 'Монако', flagFile: 'mc.svg', continent: 'Europe' },
  { code: 'md', nameEn: 'Moldova', nameSr: 'Молдавија', flagFile: 'md.svg', continent: 'Europe' },
  { code: 'me', nameEn: 'Montenegro', nameSr: 'Црна Гора', flagFile: 'me.svg', continent: 'Europe' },
  { code: 'mk', nameEn: 'North Macedonia', nameSr: 'Северна Македонија', flagFile: 'mk.svg', continent: 'Europe' },
  { code: 'mt', nameEn: 'Malta', nameSr: 'Малта', flagFile: 'mt.svg', continent: 'Europe' },
  { code: 'nl', nameEn: 'Netherlands', nameSr: 'Холандија', flagFile: 'nl.svg', continent: 'Europe' },
  { code: 'no', nameEn: 'Norway', nameSr: 'Норвешка', flagFile: 'no.svg', continent: 'Europe' },
  { code: 'pl', nameEn: 'Poland', nameSr: 'Пољска', flagFile: 'pl.svg', continent: 'Europe' },
  { code: 'pt', nameEn: 'Portugal', nameSr: 'Португалија', flagFile: 'pt.svg', continent: 'Europe' },
  { code: 'ro', nameEn: 'Romania', nameSr: 'Румунија', flagFile: 'ro.svg', continent: 'Europe' },
  { code: 'rs', nameEn: 'Serbia', nameSr: 'Србија', flagFile: 'rs.svg', continent: 'Europe' },
  { code: 'ru', nameEn: 'Russia', nameSr: 'Русија', flagFile: 'ru.svg', continent: 'Europe' },
  { code: 'se', nameEn: 'Sweden', nameSr: 'Шведска', flagFile: 'se.svg', continent: 'Europe' },
  { code: 'si', nameEn: 'Slovenia', nameSr: 'Словенија', flagFile: 'si.svg', continent: 'Europe' },
  { code: 'sk', nameEn: 'Slovakia', nameSr: 'Словачка', flagFile: 'sk.svg', continent: 'Europe' },
  { code: 'sm', nameEn: 'San Marino', nameSr: 'Сан Марино', flagFile: 'sm.svg', continent: 'Europe' },
  { code: 'ua', nameEn: 'Ukraine', nameSr: 'Украјина', flagFile: 'ua.svg', continent: 'Europe' },
  { code: 'va', nameEn: 'Vatican City', nameSr: 'Ватикан', flagFile: 'va.svg', continent: 'Europe' },

  // North America
  { code: 'ca', nameEn: 'Canada', nameSr: 'Канада', flagFile: 'ca.svg', continent: 'North America' },
  { code: 'mx', nameEn: 'Mexico', nameSr: 'Мексико', flagFile: 'mx.svg', continent: 'North America' },
  { code: 'us', nameEn: 'United States', nameSr: 'Сједињене Америчке Државе', flagFile: 'us.svg', continent: 'North America' },
  { code: 'bs', nameEn: 'Bahamas', nameSr: 'Бахами', flagFile: 'bs.svg', continent: 'North America' },
  { code: 'bb', nameEn: 'Barbados', nameSr: 'Барбадос', flagFile: 'bb.svg', continent: 'North America' },
  { code: 'bz', nameEn: 'Belize', nameSr: 'Белизе', flagFile: 'bz.svg', continent: 'North America' },
  { code: 'cr', nameEn: 'Costa Rica', nameSr: 'Костарика', flagFile: 'cr.svg', continent: 'North America' },
  { code: 'cu', nameEn: 'Cuba', nameSr: 'Куба', flagFile: 'cu.svg', continent: 'North America' },
  { code: 'dm', nameEn: 'Dominica', nameSr: 'Доминика', flagFile: 'dm.svg', continent: 'North America' },
  { code: 'do', nameEn: 'Dominican Republic', nameSr: 'Доминиканска Република', flagFile: 'do.svg', continent: 'North America' },
  { code: 'gd', nameEn: 'Grenada', nameSr: 'Гренада', flagFile: 'gd.svg', continent: 'North America' },
  { code: 'gt', nameEn: 'Guatemala', nameSr: 'Гватемала', flagFile: 'gt.svg', continent: 'North America' },
  { code: 'hn', nameEn: 'Honduras', nameSr: 'Хондурас', flagFile: 'hn.svg', continent: 'North America' },
  { code: 'ht', nameEn: 'Haiti', nameSr: 'Хаити', flagFile: 'ht.svg', continent: 'North America' },
  { code: 'jm', nameEn: 'Jamaica', nameSr: 'Јамајка', flagFile: 'jm.svg', continent: 'North America' },
  { code: 'ni', nameEn: 'Nicaragua', nameSr: 'Никарагва', flagFile: 'ni.svg', continent: 'North America' },
  { code: 'pa', nameEn: 'Panama', nameSr: 'Панама', flagFile: 'pa.svg', continent: 'North America' },
  { code: 'sv', nameEn: 'El Salvador', nameSr: 'Ел Салвадор', flagFile: 'sv.svg', continent: 'North America' },
  { code: 'tt', nameEn: 'Trinidad and Tobago', nameSr: 'Тринидад и Тобаго', flagFile: 'tt.svg', continent: 'North America' },

  // South America
  { code: 'ar', nameEn: 'Argentina', nameSr: 'Аргентина', flagFile: 'ar.svg', continent: 'South America' },
  { code: 'bo', nameEn: 'Bolivia', nameSr: 'Боливија', flagFile: 'bo.svg', continent: 'South America' },
  { code: 'br', nameEn: 'Brazil', nameSr: 'Бразил', flagFile: 'br.svg', continent: 'South America' },
  { code: 'cl', nameEn: 'Chile', nameSr: 'Чиле', flagFile: 'cl.svg', continent: 'South America' },
  { code: 'co', nameEn: 'Colombia', nameSr: 'Колумбија', flagFile: 'co.svg', continent: 'South America' },
  { code: 'ec', nameEn: 'Ecuador', nameSr: 'Еквадор', flagFile: 'ec.svg', continent: 'South America' },
  { code: 'gy', nameEn: 'Guyana', nameSr: 'Гвајана', flagFile: 'gy.svg', continent: 'South America' },
  { code: 'pe', nameEn: 'Peru', nameSr: 'Перу', flagFile: 'pe.svg', continent: 'South America' },
  { code: 'py', nameEn: 'Paraguay', nameSr: 'Парагвај', flagFile: 'py.svg', continent: 'South America' },
  { code: 'sr', nameEn: 'Suriname', nameSr: 'Суринам', flagFile: 'sr.svg', continent: 'South America' },
  { code: 'uy', nameEn: 'Uruguay', nameSr: 'Уругвај', flagFile: 'uy.svg', continent: 'South America' },
  { code: 've', nameEn: 'Venezuela', nameSr: 'Венецуела', flagFile: 've.svg', continent: 'South America' },

  // Asia
  { code: 'af', nameEn: 'Afghanistan', nameSr: 'Авганистан', flagFile: 'af.svg', continent: 'Asia' },
  { code: 'bd', nameEn: 'Bangladesh', nameSr: 'Бангладеш', flagFile: 'bd.svg', continent: 'Asia' },
  { code: 'bt', nameEn: 'Bhutan', nameSr: 'Бутан', flagFile: 'bt.svg', continent: 'Asia' },
  { code: 'cn', nameEn: 'China', nameSr: 'Кина', flagFile: 'cn.svg', continent: 'Asia' },
  { code: 'id', nameEn: 'Indonesia', nameSr: 'Индонезија', flagFile: 'id.svg', continent: 'Asia' },
  { code: 'in', nameEn: 'India', nameSr: 'Индија', flagFile: 'in.svg', continent: 'Asia' },
  { code: 'ir', nameEn: 'Iran', nameSr: 'Иран', flagFile: 'ir.svg', continent: 'Asia' },
  { code: 'jp', nameEn: 'Japan', nameSr: 'Јапан', flagFile: 'jp.svg', continent: 'Asia' },
  { code: 'kh', nameEn: 'Cambodia', nameSr: 'Камбоџа', flagFile: 'kh.svg', continent: 'Asia' },
  { code: 'kp', nameEn: 'North Korea', nameSr: 'Северна Кореја', flagFile: 'kp.svg', continent: 'Asia' },
  { code: 'kr', nameEn: 'South Korea', nameSr: 'Јужна Кореја', flagFile: 'kr.svg', continent: 'Asia' },
  { code: 'la', nameEn: 'Laos', nameSr: 'Лаос', flagFile: 'la.svg', continent: 'Asia' },
  { code: 'lk', nameEn: 'Sri Lanka', nameSr: 'Шри Ланка', flagFile: 'lk.svg', continent: 'Asia' },
  { code: 'mm', nameEn: 'Myanmar', nameSr: 'Мјанмар', flagFile: 'mm.svg', continent: 'Asia' },
  { code: 'mn', nameEn: 'Mongolia', nameSr: 'Монголија', flagFile: 'mn.svg', continent: 'Asia' },
  { code: 'my', nameEn: 'Malaysia', nameSr: 'Малезија', flagFile: 'my.svg', continent: 'Asia' },
  { code: 'np', nameEn: 'Nepal', nameSr: 'Непал', flagFile: 'np.svg', continent: 'Asia' },
  { code: 'ph', nameEn: 'Philippines', nameSr: 'Филипини', flagFile: 'ph.svg', continent: 'Asia' },
  { code: 'pk', nameEn: 'Pakistan', nameSr: 'Пакистан', flagFile: 'pk.svg', continent: 'Asia' },
  { code: 'sg', nameEn: 'Singapore', nameSr: 'Сингапур', flagFile: 'sg.svg', continent: 'Asia' },
  { code: 'th', nameEn: 'Thailand', nameSr: 'Тајланд', flagFile: 'th.svg', continent: 'Asia' },
  { code: 'tw', nameEn: 'Taiwan', nameSr: 'Тајван', flagFile: 'tw.svg', continent: 'Asia' },
  { code: 'vn', nameEn: 'Vietnam', nameSr: 'Вијетнам', flagFile: 'vn.svg', continent: 'Asia' },

  // Africa
  { code: 'dz', nameEn: 'Algeria', nameSr: 'Алжир', flagFile: 'dz.svg', continent: 'Africa' },
  { code: 'ao', nameEn: 'Angola', nameSr: 'Ангола', flagFile: 'ao.svg', continent: 'Africa' },
  { code: 'bw', nameEn: 'Botswana', nameSr: 'Боцвана', flagFile: 'bw.svg', continent: 'Africa' },
  { code: 'eg', nameEn: 'Egypt', nameSr: 'Египат', flagFile: 'eg.svg', continent: 'Africa' },
  { code: 'et', nameEn: 'Ethiopia', nameSr: 'Етиопија', flagFile: 'et.svg', continent: 'Africa' },
  { code: 'gh', nameEn: 'Ghana', nameSr: 'Гана', flagFile: 'gh.svg', continent: 'Africa' },
  { code: 'ke', nameEn: 'Kenya', nameSr: 'Кенија', flagFile: 'ke.svg', continent: 'Africa' },
  { code: 'ly', nameEn: 'Libya', nameSr: 'Либија', flagFile: 'ly.svg', continent: 'Africa' },
  { code: 'ma', nameEn: 'Morocco', nameSr: 'Мароко', flagFile: 'ma.svg', continent: 'Africa' },
  { code: 'mz', nameEn: 'Mozambique', nameSr: 'Мозамбик', flagFile: 'mz.svg', continent: 'Africa' },
  { code: 'na', nameEn: 'Namibia', nameSr: 'Намибија', flagFile: 'na.svg', continent: 'Africa' },
  { code: 'ng', nameEn: 'Nigeria', nameSr: 'Нигерија', flagFile: 'ng.svg', continent: 'Africa' },
  { code: 'sd', nameEn: 'Sudan', nameSr: 'Судан', flagFile: 'sd.svg', continent: 'Africa' },
  { code: 'tn', nameEn: 'Tunisia', nameSr: 'Тунис', flagFile: 'tn.svg', continent: 'Africa' },
  { code: 'tz', nameEn: 'Tanzania', nameSr: 'Танзанија', flagFile: 'tz.svg', continent: 'Africa' },
  { code: 'ug', nameEn: 'Uganda', nameSr: 'Уганда', flagFile: 'ug.svg', continent: 'Africa' },
  { code: 'za', nameEn: 'South Africa', nameSr: 'Јужна Африка', flagFile: 'za.svg', continent: 'Africa' },
  { code: 'zm', nameEn: 'Zambia', nameSr: 'Замбија', flagFile: 'zm.svg', continent: 'Africa' },
  { code: 'zw', nameEn: 'Zimbabwe', nameSr: 'Зимбабве', flagFile: 'zw.svg', continent: 'Africa' },

  // Australia/Oceania
  { code: 'au', nameEn: 'Australia', nameSr: 'Аустралија', flagFile: 'au.svg', continent: 'Australia' },
  { code: 'fj', nameEn: 'Fiji', nameSr: 'Фиџи', flagFile: 'fj.svg', continent: 'Australia' },
  { code: 'nz', nameEn: 'New Zealand', nameSr: 'Нови Зеланд', flagFile: 'nz.svg', continent: 'Australia' },
  { code: 'pg', nameEn: 'Papua New Guinea', nameSr: 'Папуа Нова Гвинеја', flagFile: 'pg.svg', continent: 'Australia' },
  { code: 'sb', nameEn: 'Solomon Islands', nameSr: 'Соломонска Острва', flagFile: 'sb.svg', continent: 'Australia' },
  { code: 'vu', nameEn: 'Vanuatu', nameSr: 'Вануату', flagFile: 'vu.svg', continent: 'Australia' },
];

// Generate stats
const stats = {
  total: countries.length,
  byContinent: countries.reduce((acc, country) => {
    acc[country.continent] = (acc[country.continent] || 0) + 1;
    return acc;
  }, {})
};

// Generate JSON output
const outputData = { countries, stats };

// Write to file
const outputPath = path.join(__dirname, 'countries-migration.json');
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

console.log('\n=== Migration Data Generated ===');
console.log(`Output file: ${outputPath}`);
console.log('\nStats:');
Object.entries(stats.byContinent).forEach(([continent, count]) => {
  console.log(`  ${continent}: ${count} countries`);
});
console.log(`  Total: ${stats.total} countries`);

console.log('\n=== Next Steps ===');
console.log('1. Create a PocketBase collection named "countries" with fields:');
console.log('   - code (text, required)');
console.log('   - nameEn (text, required)');
console.log('   - nameSr (text, required)');
console.log('   - flagFile (text, required)');
console.log('   - continent (text, required)');
console.log('2. Import the data from countries-migration.json into PocketBase');
console.log('3. Set your POCKETBASE_URL environment variable');
console.log('4. Test the /api/countries endpoint');

// Handle upload flag
if (process.argv.includes('--upload')) {
  if (!process.env.POCKETBASE_URL) {
    console.error('\nError: POCKETBASE_URL environment variable is required for upload');
    process.exit(1);
  }
  
  uploadToPocketBase(countries);
}

async function uploadToPocketBase(countries) {
  console.log('\nUploading to PocketBase...');
  console.log('Note: You may need to authenticate as an admin first.');
  
  // Check if we need authentication
  const authEmail = process.env.POCKETBASE_ADMIN_EMAIL;
  const authPassword = process.env.POCKETBASE_ADMIN_PASSWORD;
  
  let authToken = null;
  
  // Try to authenticate if credentials are provided
  if (authEmail && authPassword) {
    console.log('Attempting to authenticate...');
    try {
      const authResponse = await fetch(`${process.env.POCKETBASE_URL}/api/admins/auth-with-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: authEmail,
          password: authPassword,
        }),
      });
      
      if (authResponse.ok) {
        const authData = await authResponse.json();
        authToken = authData.token;
        console.log('✅ Authentication successful');
      } else {
        console.error('❌ Authentication failed');
        const error = await authResponse.text();
        console.error('Auth error:', error);
      }
    } catch (error) {
      console.error('❌ Authentication error:', error.message);
    }
  } else {
    console.log('⚠️  No authentication credentials provided.');
    console.log('Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD environment variables for automatic auth.');
    console.log('Or authenticate manually in PocketBase admin and set the collection to allow API access.');
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const country of countries) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add auth token if available
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch(`${process.env.POCKETBASE_URL}/api/collections/countries/records`, {
        method: 'POST',
        headers,
        body: JSON.stringify(country),
      });
      
      if (response.ok) {
        successCount++;
        process.stdout.write('.');
      } else {
        errorCount++;
        const error = await response.text();
        
        // Only show the first few errors to avoid spam
        if (errorCount <= 3) {
          console.error(`\nError uploading ${country.code}: ${error}`);
        } else if (errorCount === 4) {
          console.error('\n... (suppressing further error details)');
        }
      }
    } catch (error) {
      errorCount++;
      if (errorCount <= 3) {
        console.error(`\nError uploading ${country.code}: ${error.message}`);
      }
    }
  }
  
  console.log(`\n\nUpload complete!`);
  console.log(`✅ Success: ${successCount} countries`);
  console.log(`❌ Errors: ${errorCount} countries`);
  
  if (errorCount > 0) {
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure the "countries" collection exists in PocketBase');
    console.log('2. Check that all required fields are created: code, nameEn, nameSr, flagFile, continent');
    console.log('3. Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD environment variables');
    console.log('4. Or configure the collection to allow API access without authentication');
  }
} 