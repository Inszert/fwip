import { motion } from 'framer-motion'
import { fadeUp } from '../design-system/animations'
import { useMotionSafe } from '../hooks/useMotionSafe'
import { PAGE_META, usePageMeta } from '../hooks/usePageMeta'

interface Section {
  title: string
  paragraphs?: string[]
  list?: string[]
  subsections?: { title: string; text: string }[]
}

/* Legal copy ported verbatim from the original frontend (PrivacyPolicy.tsx). */
const SECTIONS: Section[] = [
  {
    title: '1. Totožnosť a kontaktné údaje Prevádzkovateľa:',
    list: [
      'Obchodné meno: PRENAKO s.r.o.',
      'Sídlo: Jedľová 3, Košice - mestská časť Sever 040 01, Slovenská republika',
      'Zapísaná v registri: Mestského súdu Košice I, Oddiel Sro, Vložka číslo 58896/V',
      'IČO: 56 066 643',
      'DIČ: 212 217 49 01',
      'IČ DPH: SK212 217 49 01',
      'Bankový účet: SK2083300000002902797580',
    ],
  },
  {
    title: '2. Spracúvané osobné údaje:',
    paragraphs: [
      'Prevádzkovateľ spracúva nasledovné osobné údaje: meno, priezvisko, bydlisko, emailová adresa, telefónne číslo, údaje získané zo súborov cookies, IP adresy.',
    ],
  },
  {
    title: '3. Totožnosť a kontaktné údaje zástupcu Prevádzkovateľa:',
    paragraphs: [
      'Zástupca Prevádzkovateľa nie je ustanovený.',
      'Kontaktné údaje zodpovednej osoby: Zodpovedná osoba nie je ustanovená.',
    ],
  },
  {
    title: '4. Účely spracúvania osobných údajov Dotknutej osoby:',
    paragraphs: ['Účelmi spracúvania osobných údajov Dotknutej osoby sú:'],
    list: [
      'spracovanie účtovných dokladov',
      'evidencia zmlúv a klientov na účely uzatvárania a plnenia zmlúv',
      'archivácia dokumentov v súlade s právnymi predpismi',
      'marketingové aktivity prevádzkovateľa',
    ],
  },
  {
    title: '5. Právny základ spracúvania osobných údajov Dotknutej osoby:',
    paragraphs: [
      'Právnym základom spracúvania osobných údajov Dotknutej osoby bude, v závislosti od konkrétnych osobných údajov a účelu ich spracúvania súhlas Dotknutej osoby so spracovaním osobných údajov, splnenie zákonnej povinnosti prevádzkovateľa, splnenie zmluvy, zmluvnou stranou ktorej je dotknutá osoba.',
    ],
  },
  {
    title: '6. Príjemcovia alebo kategórie príjemcov osobných údajov:',
    paragraphs: [
      'Príjemcom osobných údajov Dotknutej osoby budú alebo minimálne môžu byť (i) štatutárne orgány alebo členovia štatutárnych orgánov Prevádzkovateľa a (ii) zamestnanci Prevádzkovateľa(i) obchodní zástupcovia prevádzkovateľa a ďalšie osoby spolupracujúce s Prevádzkovateľom pri plnení úloh Prevádzkovateľa. Na účely tohto dokumentu sa za zamestnancov Prevádzkovateľa budú považovať všetky fyzické osoby vykonávajúce pre Prevádzkovateľa závislú prácu na základe pracovnej zmluvy alebo dohôd o prácach vykonávaných mimo pracovného pomeru.',
      'Príjemcom osobných údajov Dotknutej osoby budú tiež spolupracovníci prevádzkovateľa, jeho obchodní partneri, dodávatelia a zmluvní partneri, a to najmä: účtovná spoločnosť, spoločnosť zabezpečujúca služby súvisiace s tvorbou a údržbou softwéru, spoločnosť poskytujúca prevádzkovateľovi právne služby, spoločnosť poskytujúca prevádzkovateľovi poradenstvo.',
      'Príjemcom osobných údajov budú tiež súdy, orgány činné v trestnom konaní, daňový úrad a ďalšie štátne orgány, v zákonom stanovených prípadoch.',
    ],
  },
  {
    title: '7. Informácia o zamýšľanom prenose osobných údajov do tretej krajiny:',
    paragraphs: ['Neuplatňuje sa – Prevádzkovateľ nezamýšľa previesť osobné údaje do tretej krajiny.'],
  },
  {
    title: '8. Doba uchovávania osobných údajov:',
    paragraphs: [
      'Osobné údaje budú v súlade s právnymi predpismi uchovávané na nevyhnutný čas, na ktorý budú potrebné na účely plnenia zmluvy a ich následnej archivácie.',
    ],
  },
  {
    title: '9. Poučenie o existencii relevantných práv Dotknutej osoby:',
    paragraphs: ['Dotknutá osoba má okrem iného nasledovné práva:'],
    subsections: [
      {
        title: 'a) právo Dotknutej osoby na prístup k údajom podľa článku 15 Nariadenia',
        text: 'Toto zahŕňa právo získať potvrdenie o spracúvaní osobných údajov, prístup k spracúvaným údajom, informácie o účeloch spracúvania, kategóriách údajov, príjemcoch, dobe uchovávania a ďalšie súvisiace informácie.',
      },
      {
        title: 'b) právo Dotknutej osoby na opravu podľa článku 16 Nariadenia',
        text: 'Právo na opravu nesprávnych osobných údajov a doplnenie neúplných osobných údajov.',
      },
      {
        title:
          'c) právo Dotknutej osoby na vymazanie osobných údajov (tzv. právo „na zabudnutie") podľa článku 17 Nariadenia',
        text: 'Právo dosiahnuť vymazanie osobných údajov za splnenia určitých podmienok.',
      },
    ],
  },
  {
    title: '10. Poučenie o práve Dotknutej osoby odvolať súhlas so spracovaním osobných údajov:',
    paragraphs: [
      'Dotknutá osoba je kedykoľvek oprávnená odvolať svoj súhlas so spracovaním osobných údajov, a to bez toho, aby to malo vplyv na zákonnosť spracúvania osobných údajov založeného na súhlase udelenom pred jeho odvolaním.',
      'Právo odvolať súhlas so spracovaním osobných údajov môže Dotknutá osoba realizovať v listinnej podobe na adresu Prevádzkovateľa zapísanú ako jeho sídlo v obchodnom registri v čase odvolania súhlasu so spracovaním osobných údajov alebo v elektronickej podobe prostredníctvom elektronických prostriedkov.',
    ],
  },
  {
    title: '11. Poučenie o práve Dotknutej osoby podať sťažnosť dozornému orgánu:',
    paragraphs: [
      'Dotknutá osoba má právo podať sťažnosť dozornému orgánu, a to najmä v členskom štáte svojho obvyklého pobytu, mieste výkonu práce alebo v mieste údajného porušenia, ak sa domnieva, že spracúvanie osobných údajov, ktoré sa jej týka, je v rozpore s Nariadením.',
      'Dozorným orgánom v Slovenskej republike je Úrad na ochranu osobných údajov Slovenskej republiky.',
    ],
  },
  {
    title:
      '12. Informácia o existencii / neexistencii povinnosti Dotknutej osoby poskytnúť osobné údaje:',
    paragraphs: [
      'Poskytnutie osobných údajov Dotknutej osoby je potrebné na uzatvorenie kúpnej zmluvy a na jej splnenie. Dotknutá osoba nie je povinná poskytnúť osobné údaje ani nie je povinná udeliť súhlas s ich spracovaním. Následkom neposkytnutia osobných údajov a/alebo následkom neudelenia súhlasu so spracovaním osobných údajov bude, že Prevádzkovateľ nebude môcť uzatvoriť a splniť kúpnu zmluvu.',
    ],
  },
  {
    title: '13. Informácia súvisiaca s automatickým rozhodovaním vrátane profilovania:',
    paragraphs: [
      'Neuplatňuje sa. - Keďže v prípade Prevádzkovateľa nejde o spracovanie osobných údajov Dotknutej osoby v podobe automatizovaného rozhodovania vrátane profilovania uvedeného v článku 22 ods. 1. a 4. Nariadenia, Prevádzkovateľ nie je povinný uviesť informácie podľa článku 13 ods. 2 písm. f) Nariadenia.',
    ],
  },
  {
    title: '14. Ochrana osobných údajov a používanie cookies',
    subsections: [
      {
        title: 'Čo je to súbor cookie?',
        text: 'Súbory cookies sú textové súbory, ktoré obsahujú malé množstvo informácií, ktoré sa pri návšteve webovej stránky natiahnu do vášho počítača, mobilu alebo iného zariadenia. Súbory cookies sú užitočné, pretože umožňujú internetovej stránke nielen rozpoznať zariadenie užívateľa, ale súčasne užívateľovi umožniť prístup k funkciám na stránke.',
      },
      {
        title: 'Ako používame súbory cookie?',
        text: 'Náš Internetový obchod používa súbory cookie, aby sme uchovali: vaše preferencie zobrazenia, napríklad nastavenia kontrastu farieb alebo veľkosti písma; skutočnosť, že ste už odpovedali na prieskum zobrazujúci sa v samostatnom okne (pop-up); skutočnosť, či ste súhlasili (alebo nesúhlasili) s tým, aby sme využívali súbory cookie na tejto webovej lokalite; remarketing.',
      },
      {
        title: 'Ako kontrolovať súbory cookie',
        text: 'Súbory cookie môžete kontrolovať a/alebo zmazať podľa uváženia – podrobnosti si pozrite na stránke aboutcookies.org.',
      },
    ],
  },
  {
    title: '15. Záverečné ustanovenia',
    paragraphs: [
      'Tieto Zásady a poučenia o ochrane osobných údajov tvoria neoddeliteľnú súčasť Všeobecných obchodných podmienok a Reklamačného poriadku. Dokumenty – Všeobecné obchodné podmienky a Reklamačný poriadok tohto internetového obchodu sú zverejnené na doméne Internetového obchodu Predávajúceho.',
      'Tieto zásady ochrany osobných údajov nadobúdajú platnosť a účinnosť ich zverejnením v Internetovom obchode predávajúceho 15.01.2026',
    ],
  },
]

export default function PrivacyPage() {
  usePageMeta(PAGE_META.privacy)
  const fadeUpSafe = useMotionSafe(fadeUp)

  return (
    <>
      <section className="bg-primary pt-32 pb-14 md:pt-40 md:pb-16">
        <motion.div
          variants={fadeUpSafe}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ochrana osobných údajov
          </h1>
          <p className="text-dark/80 font-semibold mt-4 text-sm md:text-base uppercase tracking-wide">
            Zásady spracúvania osobných údajov a informácie pre dotknutú osobu
          </p>
          <p className="text-dark/60 mt-2 text-sm">
            V súvislosti so získavaním a spracúvaním osobných údajov — internetový obchod fwip.sk
          </p>
        </motion.div>
      </section>

      <section className="py-14 md:py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-text leading-relaxed mb-10">
            Prevádzkovateľ týmto v súlade s článkom 13 ods. 1. a 2. Nariadenia Európskeho parlamentu
            a Rady (EÚ) 2016/679 z 27. mája 2016 o ochrane fyzických osôb pri spracúvaní osobných
            údajov a o voľnom pohybe takýchto údajov, ktorým sa zrušuje smernica 95/46/ES (všeobecné
            nariadenie o ochrane údajov) (ďalej len „Nariadenie") poskytuje Dotknutej osobe, od
            ktorej Prevádzkovateľ získava osobné údaje, ktoré sa jej týkajú, nasledovné informácie:
          </p>

          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <section key={section.title} className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl font-bold text-primary-dark mb-4">
                  {section.title}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)} className="text-text leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-5 space-y-1.5 text-text">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.subsections?.map((sub) => (
                  <div key={sub.title} className="mt-4">
                    <h3 className="font-semibold text-dark mb-1.5">{sub.title}</h3>
                    <p className="text-muted leading-relaxed">{sub.text}</p>
                  </div>
                ))}
              </section>
            ))}
          </div>

          <p className="text-center text-muted text-sm mt-12">
            Ďakujeme za prečítanie našich zásad ochrany osobných údajov. V prípade otázok nás
            neváhajte kontaktovať.
          </p>
        </div>
      </section>
    </>
  )
}
