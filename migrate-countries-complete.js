#!/usr/bin/env node

/**
 * Complete migration script for all countries and territories
 * This includes all 195+ sovereign countries plus territories and dependencies
 * 
 * Usage:
 *   node migrate-countries-complete.js
 *   node migrate-countries-complete.js --upload
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
  }
}

loadEnvFile();

// Complete list of countries and territories
const countries = [
  // Europe (54 entries)
  { code: 'ad', nameEn: 'Andorra', nameSr: 'Андора', flagFile: 'ad.svg', continent: 'Europe' },
  { code: 'al', nameEn: 'Albania', nameSr: 'Албанија', flagFile: 'al.svg', continent: 'Europe' },
  { code: 'am', nameEn: 'Armenia', nameSr: 'Јерменија', flagFile: 'am.svg', continent: 'Europe' },
  { code: 'at', nameEn: 'Austria', nameSr: 'Аустрија', flagFile: 'at.svg', continent: 'Europe' },
  { code: 'ax', nameEn: 'Åland Islands', nameSr: 'Оландска острва', flagFile: 'ax.svg', continent: 'Europe' },
  { code: 'az', nameEn: 'Azerbaijan', nameSr: 'Азербејџан', flagFile: 'az.svg', continent: 'Europe' },
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
  { code: 'fo', nameEn: 'Faroe Islands', nameSr: 'Фарска Острва', flagFile: 'fo.svg', continent: 'Europe' },
  { code: 'fr', nameEn: 'France', nameSr: 'Француска', flagFile: 'fr.svg', continent: 'Europe' },
  { code: 'gb', nameEn: 'United Kingdom', nameSr: 'Уједињено Краљевство', flagFile: 'gb.svg', continent: 'Europe' },
  { code: 'gb-eng', nameEn: 'England', nameSr: 'Енглеска', flagFile: 'gb-eng.svg', continent: 'Europe' },
  { code: 'gb-nir', nameEn: 'Northern Ireland', nameSr: 'Северна Ирска', flagFile: 'gb-nir.svg', continent: 'Europe' },
  { code: 'gb-sct', nameEn: 'Scotland', nameSr: 'Шкотска', flagFile: 'gb-sct.svg', continent: 'Europe' },
  { code: 'gb-wls', nameEn: 'Wales', nameSr: 'Велс', flagFile: 'gb-wls.svg', continent: 'Europe' },
  { code: 'ge', nameEn: 'Georgia', nameSr: 'Грузија', flagFile: 'ge.svg', continent: 'Europe' },
  { code: 'gg', nameEn: 'Guernsey', nameSr: 'Гернзи', flagFile: 'gg.svg', continent: 'Europe' },
  { code: 'gi', nameEn: 'Gibraltar', nameSr: 'Гибралтар', flagFile: 'gi.svg', continent: 'Europe' },
  { code: 'gl', nameEn: 'Greenland', nameSr: 'Гренланд', flagFile: 'gl.svg', continent: 'Europe' },
  { code: 'gr', nameEn: 'Greece', nameSr: 'Грчка', flagFile: 'gr.svg', continent: 'Europe' },
  { code: 'hr', nameEn: 'Croatia', nameSr: 'Хрватска', flagFile: 'hr.svg', continent: 'Europe' },
  { code: 'hu', nameEn: 'Hungary', nameSr: 'Мађарска', flagFile: 'hu.svg', continent: 'Europe' },
  { code: 'ie', nameEn: 'Ireland', nameSr: 'Ирска', flagFile: 'ie.svg', continent: 'Europe' },
  { code: 'im', nameEn: 'Isle of Man', nameSr: 'Острво Ман', flagFile: 'im.svg', continent: 'Europe' },
  { code: 'is', nameEn: 'Iceland', nameSr: 'Исланд', flagFile: 'is.svg', continent: 'Europe' },
  { code: 'it', nameEn: 'Italy', nameSr: 'Италија', flagFile: 'it.svg', continent: 'Europe' },
  { code: 'je', nameEn: 'Jersey', nameSr: 'Џерзи', flagFile: 'je.svg', continent: 'Europe' },
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
  { code: 'sj', nameEn: 'Svalbard and Jan Mayen', nameSr: 'Свалбард и Јан Мајен', flagFile: 'sj.svg', continent: 'Europe' },
  { code: 'sk', nameEn: 'Slovakia', nameSr: 'Словачка', flagFile: 'sk.svg', continent: 'Europe' },
  { code: 'sm', nameEn: 'San Marino', nameSr: 'Сан Марино', flagFile: 'sm.svg', continent: 'Europe' },
  { code: 'ua', nameEn: 'Ukraine', nameSr: 'Украјина', flagFile: 'ua.svg', continent: 'Europe' },
  { code: 'va', nameEn: 'Vatican City', nameSr: 'Ватикан', flagFile: 'va.svg', continent: 'Europe' },
  { code: 'xk', nameEn: 'Kosovo', nameSr: 'Косово', flagFile: 'xk.svg', continent: 'Europe' },

  // Asia (50 entries)
  { code: 'ae', nameEn: 'United Arab Emirates', nameSr: 'Уједињени Арапски Емирати', flagFile: 'ae.svg', continent: 'Asia' },
  { code: 'af', nameEn: 'Afghanistan', nameSr: 'Авганистан', flagFile: 'af.svg', continent: 'Asia' },
  { code: 'bd', nameEn: 'Bangladesh', nameSr: 'Бангладеш', flagFile: 'bd.svg', continent: 'Asia' },
  { code: 'bh', nameEn: 'Bahrain', nameSr: 'Бахреин', flagFile: 'bh.svg', continent: 'Asia' },
  { code: 'bn', nameEn: 'Brunei', nameSr: 'Брунеј', flagFile: 'bn.svg', continent: 'Asia' },
  { code: 'bt', nameEn: 'Bhutan', nameSr: 'Бутан', flagFile: 'bt.svg', continent: 'Asia' },
  { code: 'cc', nameEn: 'Cocos Islands', nameSr: 'Кокосова Острва', flagFile: 'cc.svg', continent: 'Asia' },
  { code: 'cn', nameEn: 'China', nameSr: 'Кина', flagFile: 'cn.svg', continent: 'Asia' },
  { code: 'cx', nameEn: 'Christmas Island', nameSr: 'Божићно острво', flagFile: 'cx.svg', continent: 'Asia' },
  { code: 'hk', nameEn: 'Hong Kong', nameSr: 'Хонг Конг', flagFile: 'hk.svg', continent: 'Asia' },
  { code: 'id', nameEn: 'Indonesia', nameSr: 'Индонезија', flagFile: 'id.svg', continent: 'Asia' },
  { code: 'il', nameEn: 'Israel', nameSr: 'Израел', flagFile: 'il.svg', continent: 'Asia' },
  { code: 'in', nameEn: 'India', nameSr: 'Индија', flagFile: 'in.svg', continent: 'Asia' },
  { code: 'io', nameEn: 'British Indian Ocean Territory', nameSr: 'Британска Индијска Океанска Територија', flagFile: 'io.svg', continent: 'Asia' },
  { code: 'iq', nameEn: 'Iraq', nameSr: 'Ирак', flagFile: 'iq.svg', continent: 'Asia' },
  { code: 'ir', nameEn: 'Iran', nameSr: 'Иран', flagFile: 'ir.svg', continent: 'Asia' },
  { code: 'jo', nameEn: 'Jordan', nameSr: 'Јордан', flagFile: 'jo.svg', continent: 'Asia' },
  { code: 'jp', nameEn: 'Japan', nameSr: 'Јапан', flagFile: 'jp.svg', continent: 'Asia' },
  { code: 'kg', nameEn: 'Kyrgyzstan', nameSr: 'Киргистан', flagFile: 'kg.svg', continent: 'Asia' },
  { code: 'kh', nameEn: 'Cambodia', nameSr: 'Камбоџа', flagFile: 'kh.svg', continent: 'Asia' },
  { code: 'kp', nameEn: 'North Korea', nameSr: 'Северна Кореја', flagFile: 'kp.svg', continent: 'Asia' },
  { code: 'kr', nameEn: 'South Korea', nameSr: 'Јужна Кореја', flagFile: 'kr.svg', continent: 'Asia' },
  { code: 'kw', nameEn: 'Kuwait', nameSr: 'Кувајт', flagFile: 'kw.svg', continent: 'Asia' },
  { code: 'kz', nameEn: 'Kazakhstan', nameSr: 'Казахстан', flagFile: 'kz.svg', continent: 'Asia' },
  { code: 'la', nameEn: 'Laos', nameSr: 'Лаос', flagFile: 'la.svg', continent: 'Asia' },
  { code: 'lb', nameEn: 'Lebanon', nameSr: 'Либан', flagFile: 'lb.svg', continent: 'Asia' },
  { code: 'lk', nameEn: 'Sri Lanka', nameSr: 'Шри Ланка', flagFile: 'lk.svg', continent: 'Asia' },
  { code: 'mm', nameEn: 'Myanmar', nameSr: 'Мјанмар', flagFile: 'mm.svg', continent: 'Asia' },
  { code: 'mn', nameEn: 'Mongolia', nameSr: 'Монголија', flagFile: 'mn.svg', continent: 'Asia' },
  { code: 'mo', nameEn: 'Macau', nameSr: 'Макао', flagFile: 'mo.svg', continent: 'Asia' },
  { code: 'mv', nameEn: 'Maldives', nameSr: 'Малдиви', flagFile: 'mv.svg', continent: 'Asia' },
  { code: 'my', nameEn: 'Malaysia', nameSr: 'Малезија', flagFile: 'my.svg', continent: 'Asia' },
  { code: 'np', nameEn: 'Nepal', nameSr: 'Непал', flagFile: 'np.svg', continent: 'Asia' },
  { code: 'om', nameEn: 'Oman', nameSr: 'Оман', flagFile: 'om.svg', continent: 'Asia' },
  { code: 'ph', nameEn: 'Philippines', nameSr: 'Филипини', flagFile: 'ph.svg', continent: 'Asia' },
  { code: 'pk', nameEn: 'Pakistan', nameSr: 'Пакистан', flagFile: 'pk.svg', continent: 'Asia' },
  { code: 'ps', nameEn: 'Palestine', nameSr: 'Палестина', flagFile: 'ps.svg', continent: 'Asia' },
  { code: 'qa', nameEn: 'Qatar', nameSr: 'Катар', flagFile: 'qa.svg', continent: 'Asia' },
  { code: 'sa', nameEn: 'Saudi Arabia', nameSr: 'Саудијска Арабија', flagFile: 'sa.svg', continent: 'Asia' },
  { code: 'sg', nameEn: 'Singapore', nameSr: 'Сингапур', flagFile: 'sg.svg', continent: 'Asia' },
  { code: 'sy', nameEn: 'Syria', nameSr: 'Сирија', flagFile: 'sy.svg', continent: 'Asia' },
  { code: 'th', nameEn: 'Thailand', nameSr: 'Тајланд', flagFile: 'th.svg', continent: 'Asia' },
  { code: 'tj', nameEn: 'Tajikistan', nameSr: 'Таџикистан', flagFile: 'tj.svg', continent: 'Asia' },
  { code: 'tl', nameEn: 'East Timor', nameSr: 'Источни Тимор', flagFile: 'tl.svg', continent: 'Asia' },
  { code: 'tm', nameEn: 'Turkmenistan', nameSr: 'Туркменистан', flagFile: 'tm.svg', continent: 'Asia' },
  { code: 'tr', nameEn: 'Turkey', nameSr: 'Турска', flagFile: 'tr.svg', continent: 'Asia' },
  { code: 'tw', nameEn: 'Taiwan', nameSr: 'Тајван', flagFile: 'tw.svg', continent: 'Asia' },
  { code: 'uz', nameEn: 'Uzbekistan', nameSr: 'Узбекистан', flagFile: 'uz.svg', continent: 'Asia' },
  { code: 'vn', nameEn: 'Vietnam', nameSr: 'Вијетнам', flagFile: 'vn.svg', continent: 'Asia' },
  { code: 'ye', nameEn: 'Yemen', nameSr: 'Јемен', flagFile: 'ye.svg', continent: 'Asia' },

  // Africa (54 entries)
  { code: 'ao', nameEn: 'Angola', nameSr: 'Ангола', flagFile: 'ao.svg', continent: 'Africa' },
  { code: 'bf', nameEn: 'Burkina Faso', nameSr: 'Буркина Фасо', flagFile: 'bf.svg', continent: 'Africa' },
  { code: 'bi', nameEn: 'Burundi', nameSr: 'Бурунди', flagFile: 'bi.svg', continent: 'Africa' },
  { code: 'bj', nameEn: 'Benin', nameSr: 'Бенин', flagFile: 'bj.svg', continent: 'Africa' },
  { code: 'bw', nameEn: 'Botswana', nameSr: 'Боцвана', flagFile: 'bw.svg', continent: 'Africa' },
  { code: 'cd', nameEn: 'Democratic Republic of the Congo', nameSr: 'Демократска Република Конго', flagFile: 'cd.svg', continent: 'Africa' },
  { code: 'cf', nameEn: 'Central African Republic', nameSr: 'Централноафричка Република', flagFile: 'cf.svg', continent: 'Africa' },
  { code: 'cg', nameEn: 'Republic of the Congo', nameSr: 'Република Конго', flagFile: 'cg.svg', continent: 'Africa' },
  { code: 'ci', nameEn: 'Ivory Coast', nameSr: 'Обала Слоноваче', flagFile: 'ci.svg', continent: 'Africa' },
  { code: 'cm', nameEn: 'Cameroon', nameSr: 'Камерун', flagFile: 'cm.svg', continent: 'Africa' },
  { code: 'cv', nameEn: 'Cape Verde', nameSr: 'Зеленортска Острва', flagFile: 'cv.svg', continent: 'Africa' },
  { code: 'dj', nameEn: 'Djibouti', nameSr: 'Џибути', flagFile: 'dj.svg', continent: 'Africa' },
  { code: 'dz', nameEn: 'Algeria', nameSr: 'Алжир', flagFile: 'dz.svg', continent: 'Africa' },
  { code: 'eg', nameEn: 'Egypt', nameSr: 'Египат', flagFile: 'eg.svg', continent: 'Africa' },
  { code: 'eh', nameEn: 'Western Sahara', nameSr: 'Западна Сахара', flagFile: 'eh.svg', continent: 'Africa' },
  { code: 'er', nameEn: 'Eritrea', nameSr: 'Еритреја', flagFile: 'er.svg', continent: 'Africa' },
  { code: 'et', nameEn: 'Ethiopia', nameSr: 'Етиопија', flagFile: 'et.svg', continent: 'Africa' },
  { code: 'ga', nameEn: 'Gabon', nameSr: 'Габон', flagFile: 'ga.svg', continent: 'Africa' },
  { code: 'gh', nameEn: 'Ghana', nameSr: 'Гана', flagFile: 'gh.svg', continent: 'Africa' },
  { code: 'gm', nameEn: 'Gambia', nameSr: 'Гамбија', flagFile: 'gm.svg', continent: 'Africa' },
  { code: 'gn', nameEn: 'Guinea', nameSr: 'Гвинеја', flagFile: 'gn.svg', continent: 'Africa' },
  { code: 'gq', nameEn: 'Equatorial Guinea', nameSr: 'Екваторијална Гвинеја', flagFile: 'gq.svg', continent: 'Africa' },
  { code: 'gw', nameEn: 'Guinea-Bissau', nameSr: 'Гвинеја Бисао', flagFile: 'gw.svg', continent: 'Africa' },
  { code: 'ke', nameEn: 'Kenya', nameSr: 'Кенија', flagFile: 'ke.svg', continent: 'Africa' },
  { code: 'km', nameEn: 'Comoros', nameSr: 'Комори', flagFile: 'km.svg', continent: 'Africa' },
  { code: 'lr', nameEn: 'Liberia', nameSr: 'Либерија', flagFile: 'lr.svg', continent: 'Africa' },
  { code: 'ls', nameEn: 'Lesotho', nameSr: 'Лесото', flagFile: 'ls.svg', continent: 'Africa' },
  { code: 'ly', nameEn: 'Libya', nameSr: 'Либија', flagFile: 'ly.svg', continent: 'Africa' },
  { code: 'ma', nameEn: 'Morocco', nameSr: 'Мароко', flagFile: 'ma.svg', continent: 'Africa' },
  { code: 'mg', nameEn: 'Madagascar', nameSr: 'Мадагаскар', flagFile: 'mg.svg', continent: 'Africa' },
  { code: 'ml', nameEn: 'Mali', nameSr: 'Мали', flagFile: 'ml.svg', continent: 'Africa' },
  { code: 'mr', nameEn: 'Mauritania', nameSr: 'Мауританија', flagFile: 'mr.svg', continent: 'Africa' },
  { code: 'mu', nameEn: 'Mauritius', nameSr: 'Маурицијус', flagFile: 'mu.svg', continent: 'Africa' },
  { code: 'mw', nameEn: 'Malawi', nameSr: 'Малави', flagFile: 'mw.svg', continent: 'Africa' },
  { code: 'mz', nameEn: 'Mozambique', nameSr: 'Мозамбик', flagFile: 'mz.svg', continent: 'Africa' },
  { code: 'na', nameEn: 'Namibia', nameSr: 'Намибија', flagFile: 'na.svg', continent: 'Africa' },
  { code: 'ne', nameEn: 'Niger', nameSr: 'Нигер', flagFile: 'ne.svg', continent: 'Africa' },
  { code: 'ng', nameEn: 'Nigeria', nameSr: 'Нигерија', flagFile: 'ng.svg', continent: 'Africa' },
  { code: 'rw', nameEn: 'Rwanda', nameSr: 'Руанда', flagFile: 'rw.svg', continent: 'Africa' },
  { code: 'sc', nameEn: 'Seychelles', nameSr: 'Сејшели', flagFile: 'sc.svg', continent: 'Africa' },
  { code: 'sd', nameEn: 'Sudan', nameSr: 'Судан', flagFile: 'sd.svg', continent: 'Africa' },
  { code: 'sh', nameEn: 'Saint Helena', nameSr: 'Света Хелена', flagFile: 'sh.svg', continent: 'Africa' },
  { code: 'sl', nameEn: 'Sierra Leone', nameSr: 'Сијера Леоне', flagFile: 'sl.svg', continent: 'Africa' },
  { code: 'sn', nameEn: 'Senegal', nameSr: 'Сенегал', flagFile: 'sn.svg', continent: 'Africa' },
  { code: 'so', nameEn: 'Somalia', nameSr: 'Сомалија', flagFile: 'so.svg', continent: 'Africa' },
  { code: 'ss', nameEn: 'South Sudan', nameSr: 'Јужни Судан', flagFile: 'ss.svg', continent: 'Africa' },
  { code: 'st', nameEn: 'São Tomé and Príncipe', nameSr: 'Сао Томе и Принсипе', flagFile: 'st.svg', continent: 'Africa' },
  { code: 'sz', nameEn: 'Eswatini', nameSr: 'Есватини', flagFile: 'sz.svg', continent: 'Africa' },
  { code: 'td', nameEn: 'Chad', nameSr: 'Чад', flagFile: 'td.svg', continent: 'Africa' },
  { code: 'tg', nameEn: 'Togo', nameSr: 'Того', flagFile: 'tg.svg', continent: 'Africa' },
  { code: 'tn', nameEn: 'Tunisia', nameSr: 'Тунис', flagFile: 'tn.svg', continent: 'Africa' },
  { code: 'tz', nameEn: 'Tanzania', nameSr: 'Танзанија', flagFile: 'tz.svg', continent: 'Africa' },
  { code: 'ug', nameEn: 'Uganda', nameSr: 'Уганда', flagFile: 'ug.svg', continent: 'Africa' },
  { code: 'za', nameEn: 'South Africa', nameSr: 'Јужна Африка', flagFile: 'za.svg', continent: 'Africa' },
  { code: 'zm', nameEn: 'Zambia', nameSr: 'Замбија', flagFile: 'zm.svg', continent: 'Africa' },
  { code: 'zw', nameEn: 'Zimbabwe', nameSr: 'Зимбабве', flagFile: 'zw.svg', continent: 'Africa' },

  // North America (41 entries)
  { code: 'ag', nameEn: 'Antigua and Barbuda', nameSr: 'Антигва и Барбуда', flagFile: 'ag.svg', continent: 'North America' },
  { code: 'ai', nameEn: 'Anguilla', nameSr: 'Ангила', flagFile: 'ai.svg', continent: 'North America' },
  { code: 'aw', nameEn: 'Aruba', nameSr: 'Аруба', flagFile: 'aw.svg', continent: 'North America' },
  { code: 'bb', nameEn: 'Barbados', nameSr: 'Барбадос', flagFile: 'bb.svg', continent: 'North America' },
  { code: 'bl', nameEn: 'Saint Barthélemy', nameSr: 'Свети Бартоломеј', flagFile: 'bl.svg', continent: 'North America' },
  { code: 'bm', nameEn: 'Bermuda', nameSr: 'Бермуда', flagFile: 'bm.svg', continent: 'North America' },
  { code: 'bq', nameEn: 'Caribbean Netherlands', nameSr: 'Карипска Холандија', flagFile: 'bq.svg', continent: 'North America' },
  { code: 'bs', nameEn: 'Bahamas', nameSr: 'Бахами', flagFile: 'bs.svg', continent: 'North America' },
  { code: 'bz', nameEn: 'Belize', nameSr: 'Белизе', flagFile: 'bz.svg', continent: 'North America' },
  { code: 'ca', nameEn: 'Canada', nameSr: 'Канада', flagFile: 'ca.svg', continent: 'North America' },
  { code: 'cr', nameEn: 'Costa Rica', nameSr: 'Костарика', flagFile: 'cr.svg', continent: 'North America' },
  { code: 'cu', nameEn: 'Cuba', nameSr: 'Куба', flagFile: 'cu.svg', continent: 'North America' },
  { code: 'cw', nameEn: 'Curaçao', nameSr: 'Курасао', flagFile: 'cw.svg', continent: 'North America' },
  { code: 'dm', nameEn: 'Dominica', nameSr: 'Доминика', flagFile: 'dm.svg', continent: 'North America' },
  { code: 'do', nameEn: 'Dominican Republic', nameSr: 'Доминиканска Република', flagFile: 'do.svg', continent: 'North America' },
  { code: 'gd', nameEn: 'Grenada', nameSr: 'Гренада', flagFile: 'gd.svg', continent: 'North America' },
  { code: 'gp', nameEn: 'Guadeloupe', nameSr: 'Гваделуп', flagFile: 'gp.svg', continent: 'North America' },
  { code: 'gt', nameEn: 'Guatemala', nameSr: 'Гватемала', flagFile: 'gt.svg', continent: 'North America' },
  { code: 'hn', nameEn: 'Honduras', nameSr: 'Хондурас', flagFile: 'hn.svg', continent: 'North America' },
  { code: 'ht', nameEn: 'Haiti', nameSr: 'Хаити', flagFile: 'ht.svg', continent: 'North America' },
  { code: 'jm', nameEn: 'Jamaica', nameSr: 'Јамајка', flagFile: 'jm.svg', continent: 'North America' },
  { code: 'kn', nameEn: 'Saint Kitts and Nevis', nameSr: 'Свети Китс и Невис', flagFile: 'kn.svg', continent: 'North America' },
  { code: 'ky', nameEn: 'Cayman Islands', nameSr: 'Кајманска Острва', flagFile: 'ky.svg', continent: 'North America' },
  { code: 'lc', nameEn: 'Saint Lucia', nameSr: 'Света Луција', flagFile: 'lc.svg', continent: 'North America' },
  { code: 'mf', nameEn: 'Saint Martin', nameSr: 'Свети Мартин', flagFile: 'mf.svg', continent: 'North America' },
  { code: 'mq', nameEn: 'Martinique', nameSr: 'Мартиник', flagFile: 'mq.svg', continent: 'North America' },
  { code: 'ms', nameEn: 'Montserrat', nameSr: 'Монтсерат', flagFile: 'ms.svg', continent: 'North America' },
  { code: 'mx', nameEn: 'Mexico', nameSr: 'Мексико', flagFile: 'mx.svg', continent: 'North America' },
  { code: 'ni', nameEn: 'Nicaragua', nameSr: 'Никарагва', flagFile: 'ni.svg', continent: 'North America' },
  { code: 'pa', nameEn: 'Panama', nameSr: 'Панама', flagFile: 'pa.svg', continent: 'North America' },
  { code: 'pm', nameEn: 'Saint Pierre and Miquelon', nameSr: 'Свети Пјер и Микелон', flagFile: 'pm.svg', continent: 'North America' },
  { code: 'pr', nameEn: 'Puerto Rico', nameSr: 'Порторико', flagFile: 'pr.svg', continent: 'North America' },
  { code: 'sv', nameEn: 'El Salvador', nameSr: 'Ел Салвадор', flagFile: 'sv.svg', continent: 'North America' },
  { code: 'sx', nameEn: 'Sint Maarten', nameSr: 'Свети Мартин', flagFile: 'sx.svg', continent: 'North America' },
  { code: 'tc', nameEn: 'Turks and Caicos Islands', nameSr: 'Туркс и Кајкос Острва', flagFile: 'tc.svg', continent: 'North America' },
  { code: 'tt', nameEn: 'Trinidad and Tobago', nameSr: 'Тринидад и Тобаго', flagFile: 'tt.svg', continent: 'North America' },
  { code: 'us', nameEn: 'United States', nameSr: 'Сједињене Америчке Државе', flagFile: 'us.svg', continent: 'North America' },
  { code: 'vc', nameEn: 'Saint Vincent and the Grenadines', nameSr: 'Свети Винсент и Гренадини', flagFile: 'vc.svg', continent: 'North America' },
  { code: 'vg', nameEn: 'British Virgin Islands', nameSr: 'Британска Девичанска Острва', flagFile: 'vg.svg', continent: 'North America' },
  { code: 'vi', nameEn: 'U.S. Virgin Islands', nameSr: 'Америчка Девичанска Острва', flagFile: 'vi.svg', continent: 'North America' },

  // South America (14 entries)
  { code: 'ar', nameEn: 'Argentina', nameSr: 'Аргентина', flagFile: 'ar.svg', continent: 'South America' },
  { code: 'bo', nameEn: 'Bolivia', nameSr: 'Боливија', flagFile: 'bo.svg', continent: 'South America' },
  { code: 'br', nameEn: 'Brazil', nameSr: 'Бразил', flagFile: 'br.svg', continent: 'South America' },
  { code: 'cl', nameEn: 'Chile', nameSr: 'Чиле', flagFile: 'cl.svg', continent: 'South America' },
  { code: 'co', nameEn: 'Colombia', nameSr: 'Колумбија', flagFile: 'co.svg', continent: 'South America' },
  { code: 'ec', nameEn: 'Ecuador', nameSr: 'Еквадор', flagFile: 'ec.svg', continent: 'South America' },
  { code: 'fk', nameEn: 'Falkland Islands', nameSr: 'Фокландска Острва', flagFile: 'fk.svg', continent: 'South America' },
  { code: 'gf', nameEn: 'French Guiana', nameSr: 'Француска Гвајана', flagFile: 'gf.svg', continent: 'South America' },
  { code: 'gs', nameEn: 'South Georgia and South Sandwich Islands', nameSr: 'Јужна Џорџија и Јужна Сендвичка Острва', flagFile: 'gs.svg', continent: 'South America' },
  { code: 'gy', nameEn: 'Guyana', nameSr: 'Гвајана', flagFile: 'gy.svg', continent: 'South America' },
  { code: 'pe', nameEn: 'Peru', nameSr: 'Перу', flagFile: 'pe.svg', continent: 'South America' },
  { code: 'py', nameEn: 'Paraguay', nameSr: 'Парагвај', flagFile: 'py.svg', continent: 'South America' },
  { code: 'sr', nameEn: 'Suriname', nameSr: 'Суринам', flagFile: 'sr.svg', continent: 'South America' },
  { code: 'uy', nameEn: 'Uruguay', nameSr: 'Уругвај', flagFile: 'uy.svg', continent: 'South America' },
  { code: 've', nameEn: 'Venezuela', nameSr: 'Венецуела', flagFile: 've.svg', continent: 'South America' },

  // Australia/Oceania (27 entries)
  { code: 'as', nameEn: 'American Samoa', nameSr: 'Америчка Самоа', flagFile: 'as.svg', continent: 'Australia' },
  { code: 'au', nameEn: 'Australia', nameSr: 'Аустралија', flagFile: 'au.svg', continent: 'Australia' },
  { code: 'ck', nameEn: 'Cook Islands', nameSr: 'Кукова Острва', flagFile: 'ck.svg', continent: 'Australia' },
  { code: 'fj', nameEn: 'Fiji', nameSr: 'Фиџи', flagFile: 'fj.svg', continent: 'Australia' },
  { code: 'fm', nameEn: 'Micronesia', nameSr: 'Микронезија', flagFile: 'fm.svg', continent: 'Australia' },
  { code: 'gu', nameEn: 'Guam', nameSr: 'Гуам', flagFile: 'gu.svg', continent: 'Australia' },
  { code: 'ki', nameEn: 'Kiribati', nameSr: 'Кирибати', flagFile: 'ki.svg', continent: 'Australia' },
  { code: 'mh', nameEn: 'Marshall Islands', nameSr: 'Маршалска Острва', flagFile: 'mh.svg', continent: 'Australia' },
  { code: 'mp', nameEn: 'Northern Mariana Islands', nameSr: 'Северна Маријанска Острва', flagFile: 'mp.svg', continent: 'Australia' },
  { code: 'nc', nameEn: 'New Caledonia', nameSr: 'Нова Каледонија', flagFile: 'nc.svg', continent: 'Australia' },
  { code: 'nf', nameEn: 'Norfolk Island', nameSr: 'Острво Норфок', flagFile: 'nf.svg', continent: 'Australia' },
  { code: 'nr', nameEn: 'Nauru', nameSr: 'Науру', flagFile: 'nr.svg', continent: 'Australia' },
  { code: 'nu', nameEn: 'Niue', nameSr: 'Нијуе', flagFile: 'nu.svg', continent: 'Australia' },
  { code: 'nz', nameEn: 'New Zealand', nameSr: 'Нови Зеланд', flagFile: 'nz.svg', continent: 'Australia' },
  { code: 'pf', nameEn: 'French Polynesia', nameSr: 'Француска Полинезија', flagFile: 'pf.svg', continent: 'Australia' },
  { code: 'pg', nameEn: 'Papua New Guinea', nameSr: 'Папуа Нова Гвинеја', flagFile: 'pg.svg', continent: 'Australia' },
  { code: 'pn', nameEn: 'Pitcairn Islands', nameSr: 'Питкернска Острва', flagFile: 'pn.svg', continent: 'Australia' },
  { code: 'pw', nameEn: 'Palau', nameSr: 'Палау', flagFile: 'pw.svg', continent: 'Australia' },
  { code: 'sb', nameEn: 'Solomon Islands', nameSr: 'Соломонска Острва', flagFile: 'sb.svg', continent: 'Australia' },
  { code: 'tk', nameEn: 'Tokelau', nameSr: 'Токелау', flagFile: 'tk.svg', continent: 'Australia' },
  { code: 'to', nameEn: 'Tonga', nameSr: 'Тонга', flagFile: 'to.svg', continent: 'Australia' },
  { code: 'tv', nameEn: 'Tuvalu', nameSr: 'Тувалу', flagFile: 'tv.svg', continent: 'Australia' },
  { code: 'vu', nameEn: 'Vanuatu', nameSr: 'Вануату', flagFile: 'vu.svg', continent: 'Australia' },
  { code: 'wf', nameEn: 'Wallis and Futuna', nameSr: 'Валис и Футуна', flagFile: 'wf.svg', continent: 'Australia' },
  { code: 'ws', nameEn: 'Samoa', nameSr: 'Самоа', flagFile: 'ws.svg', continent: 'Australia' },

  // Other territories and special cases
  { code: 'ac', nameEn: 'Ascension Island', nameSr: 'Острво Узнесења', flagFile: 'ac.svg', continent: 'Africa' },
  { code: 'aq', nameEn: 'Antarctica', nameSr: 'Антарктик', flagFile: 'aq.svg', continent: 'Antarctica' },
  { code: 'bv', nameEn: 'Bouvet Island', nameSr: 'Буве Острво', flagFile: 'bv.svg', continent: 'Antarctica' },
  { code: 'hm', nameEn: 'Heard and McDonald Islands', nameSr: 'Херд и Макдоналд Острва', flagFile: 'hm.svg', continent: 'Australia' },
  { code: 're', nameEn: 'Réunion', nameSr: 'Реинион', flagFile: 're.svg', continent: 'Africa' },
  { code: 'ta', nameEn: 'Tristan da Cunha', nameSr: 'Тристан да Куња', flagFile: 'ta.svg', continent: 'Africa' },
  { code: 'tf', nameEn: 'French Southern Territories', nameSr: 'Француске Јужне Територије', flagFile: 'tf.svg', continent: 'Antarctica' },
  { code: 'um', nameEn: 'United States Minor Outlying Islands', nameSr: 'Спољна острва САД', flagFile: 'um.svg', continent: 'Australia' },
  { code: 'yt', nameEn: 'Mayotte', nameSr: 'Мајот', flagFile: 'yt.svg', continent: 'Africa' },
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
const outputPath = path.join(__dirname, 'countries-complete-migration.json');
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

console.log('\n=== Complete Migration Data Generated ===');
console.log(`Output file: ${outputPath}`);
console.log('\nStats:');
Object.entries(stats.byContinent).forEach(([continent, count]) => {
  console.log(`  ${continent}: ${count} countries/territories`);
});
console.log(`  Total: ${stats.total} countries/territories`);

console.log('\n=== Next Steps ===');
console.log('1. This includes ALL sovereign countries plus territories and dependencies');
console.log('2. Run with --upload to import to PocketBase');
console.log('3. This will give you much more variety in your flag game!');

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