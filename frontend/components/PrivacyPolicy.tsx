"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05584e] to-[#2EC4B6] pt-30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#40DDCB] to-[#2EC4B6] text-white py-8 px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Ochrana osobných údajov
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            ZÁSADY SPRACÚVANIA OSOBNÝCH ÚDAJOV A INFORMÁCIE PRE DOTKNUTÚ OSOBU
          </h2>
          <p className="text-lg opacity-90">
            V SÚVISLOSTI SO ZÍSKAVANÍM A SPRACÚVANÍM OSOBNÝCH ÚDAJOV
          </p>
          <div className="mt-4 pt-4 border-t border-white/30">
            <p className="text-sm opacity-80">
              / Zásady a poučenia o ochrane osobných údajov /
            </p>
            <p className="text-sm opacity-80 mt-1">
              poskytnuté prevádzkovateľom dotknutej osobe pri získavaní osobných údajov od dotknutej osoby
            </p>
            <p className="text-base font-semibold mt-2">Internetového obchodu magicice.sk</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-12">
          <div className="prose prose-lg max-w-none">
            {/* Úvod */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Prevádzkovateľ týmto v súlade s článkom 13 ods. 1. a 2. Nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679 z 27. mája 2016 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov, ktorým sa zrušuje smernica 95/46/ES (všeobecné nariadenie o ochrane údajov) (ďalej len „Nariadenie“) poskytuje Dotknutej osobe, od ktorej Prevádzkovateľ získava osobné údaje, ktoré sa jej týkajú, nasledovné informácie:
              </p>
            </div>

            {/* Sekcie */}
            <div className="space-y-8">
              {/* 1. Totožnosť prevádzkovateľa */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">1. Totožnosť a kontaktné údaje Prevádzkovateľa:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Obchodné meno:</span> AZIN s.r.o.</li>
                  <li><span className="font-semibold">Sídlo:</span> Jedľová 3, Košice - mestská časť Sever 040 01, Slovenská republika</li>
                  <li><span className="font-semibold">Zapísaná v registri:</span> Mestského súdu Košice I, Oddiel Sro, Vložka číslo 40818/V</li>
                  <li><span className="font-semibold">IČO:</span> 50 732 692</li>
                  <li><span className="font-semibold">DIČ:</span> 212 043 99 04</li>
                  <li><span className="font-semibold">IČ DPH:</span> SK212043990 – len na dovoz tovaru z členských štátov Európskej únie podľa § 7 Zákon č. 222/2004 Z. z. v znení neskorších predpisov zákona o dani z pridanej hodnoty.</li>
                  <li><span className="font-semibold">Bankový účet:</span> SK8483300000002901187780</li>
                </ul>
              </section>

              {/* 2. Spracúvané osobné údaje */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">2. Spracúvané osobné údaje:</h3>
                <p className="text-gray-700">
                  Prevádzkovateľ spracúva nasledovné osobné údaje: meno, priezvisko, bydlisko, emailová adresa, telefónne číslo, údaje získané zo súborov cookies, IP adresy.
                </p>
              </section>

              {/* 3. Zástupca a zodpovedná osoba */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">3. Totožnosť a kontaktné údaje zástupcu Prevádzkovateľa:</h3>
                <p className="text-gray-700 mb-4">Zástupca Prevádzkovateľa nie je ustanovený.</p>
                <h4 className="text-xl font-semibold text-[#2EC4B6] mb-2">Kontaktné údaje zodpovednej osoby:</h4>
                <p className="text-gray-700">Zodpovedná osoba nie je ustanovená.</p>
              </section>

              {/* 4. Účely spracúvania */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">4. Účely spracúvania osobných údajov Dotknutej osoby:</h3>
                <p className="text-gray-700 mb-2">Účelmi spracúvania osobných údajov Dotknutej osoby sú:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>spracovanie účtovných dokladov</li>
                  <li>evidencia zmlúv a klientov na účely uzatvárania a plnenia zmlúv</li>
                  <li>archivácia dokumentov v súlade s právnymi predpismi</li>
                  <li>marketingové aktivity prevádzkovateľa</li>
                </ul>
              </section>

              {/* 5. Právny základ */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">5. Právny základ spracúvania osobných údajov Dotknutej osoby:</h3>
                <p className="text-gray-700">
                  Právnym základom spracúvania osobných údajov Dotknutej osoby bude, v závislosti od konkrétnych osobných údajov a účelu ich spracúvania súhlas Dotknutej osoby so spracovaním osobných údajov, splnenie zákonnej povinnosti prevádzkovateľa, splnenie zmluvy, zmluvnou stranou ktorej je dotknutá osoba.
                </p>
              </section>

              {/* 6. Príjemcovia */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">6. Príjemcovia alebo kategórie príjemcov osobných údajov:</h3>
                <p className="text-gray-700 mb-4">
                  Príjemcom osobných údajov Dotknutej osoby budú alebo minimálne môžu byť (i) štatutárne orgány alebo členovia štatutárnych orgánov Prevádzkovateľa a (ii) zamestnanci Prevádzkovateľa(i) obchodní zástupcovia prevádzkovateľa a ďalšie osoby spolupracujúce s Prevádzkovateľom pri plnení úloh Prevádzkovateľa. Na účely tohto dokumentu sa za zamestnancov Prevádzkovateľa budú považovať všetky fyzické osoby vykonávajúce pre Prevádzkovateľa závislú prácu na základe pracovnej zmluvy alebo dohôd o prácach vykonávaných mimo pracovného pomeru.
                </p>
                <p className="text-gray-700">
                  Príjemcom osobných údajov Dotknutej osoby budú tiež spolupracovníci prevádzkovateľa, jeho obchodní partneri, dodávatelia a zmluvní partneri, a to najmä: účtovná spoločnosť, spoločnosť zabezpečujúca služby súvisiace s tvorbou a údržbou softwéru, spoločnosť poskytujúca prevádzkovateľovi právne služby, spoločnosť poskytujúca prevádzkovateľovi poradenstvo.
                </p>
                <p className="text-gray-700 mt-4">
                  Príjemcom osobných údajov budú tiež súdy, orgány činné v trestnom konaní, daňový úrad a ďalšie štátne orgány, v zákonom stanovených prípadoch.
                </p>
              </section>

              {/* 7. Prenos do tretej krajiny */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">7. Informácia o zamýšľanom prenose osobných údajov do tretej krajiny:</h3>
                <p className="text-gray-700">
                  Neuplatňuje sa – Prevádzkovateľ nezamýšľa previesť osobné údaje do tretej krajiny.
                </p>
              </section>

              {/* 8. Doba uchovávania */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">8. Doba uchovávania osobných údajov:</h3>
                <p className="text-gray-700">
                  Osobné údaje budú v súlade s právnymi predpismi uchovávané na nevyhnutný čas, na ktorý budú potrebné na účely plnenia zmluvy a ich následnej archivácie.
                </p>
              </section>

              {/* 9. Práva dotknutej osoby */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">9. Poučenie o existencii relevantných práv Dotknutej osoby:</h3>
                <p className="text-gray-700 mb-4">
                  Dotknutá osoba má okrem iného nasledovné práva:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">a) právo Dotknutej osoby na prístup k údajom podľa článku 15 Nariadenia</h4>
                    <p className="text-gray-700">
                      Toto zahŕňa právo získať potvrdenie o spracúvaní osobných údajov, prístup k spracúvaným údajom, informácie o účeloch spracúvania, kategóriách údajov, príjemcoch, dobe uchovávania a ďalšie súvisiace informácie.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">b) právo Dotknutej osoby na opravu podľa článku 16 Nariadenia</h4>
                    <p className="text-gray-700">
                      Právo na opravu nesprávnych osobných údajov a doplnenie neúplných osobných údajov.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">c) právo Dotknutej osoby na vymazanie osobných údajov (tzv. právo „na zabudnutie") podľa článku 17 Nariadenia</h4>
                    <p className="text-gray-700">
                      Právo dosiahnuť vymazanie osobných údajov za splnenia určitých podmienok.
                    </p>
                  </div>
                  {/* Ďalšie práva možno pridať podľa potreby */}
                </div>
              </section>

              {/* 10. Odvolanie súhlasu */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">10. Poučenie o práve Dotknutej osoby odvolať súhlas so spracovaním osobných údajov:</h3>
                <p className="text-gray-700 mb-2">
                  Dotknutá osoba je kedykoľvek oprávnená odvolať svoj súhlas so spracovaním osobných údajov, a to bez toho, aby to malo vplyv na zákonnosť spracúvania osobných údajov založeného na súhlase udelenom pred jeho odvolaním.
                </p>
                <p className="text-gray-700">
                  Právo odvolať súhlas so spracovaním osobných údajov môže Dotknutá osoba realizovať v listinnej podobe na adresu Prevádzkovateľa zapísanú ako jeho sídlo v obchodnom registri v čase odvolania súhlasu so spracovaním osobných údajov alebo v elektronickej podobe prostredníctvom elektronických prostriedkov.
                </p>
              </section>

              {/* 11. Sťažnosti */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">11. Poučenie o práve Dotknutej osoby podať sťažnosť dozornému orgánu:</h3>
                <p className="text-gray-700 mb-2">
                  Dotknutá osoba má právo podať sťažnosť dozornému orgánu, a to najmä v členskom štáte svojho obvyklého pobytu, mieste výkonu práce alebo v mieste údajného porušenia, ak sa domnieva, že spracúvanie osobných údajov, ktoré sa jej týka, je v rozpore s Nariadením.
                </p>
                <p className="text-gray-700">
                  Dozorným orgánom v Slovenskej republike je <span className="font-semibold">Úrad na ochranu osobných údajov Slovenskej republiky</span>.
                </p>
              </section>

              {/* 12. Povinnosť poskytnúť údaje */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">12. Informácia o existencii / neexistencii povinnosti Dotknutej osoby poskytnúť osobné údaje:</h3>
                <p className="text-gray-700">
                  Poskytnutie osobných údajov Dotknutej osoby je potrebné na uzatvorenie kúpnej zmluvy a na jej splnenie. Dotknutá osoba nie je povinná poskytnúť osobné údaje ani nie je povinná udeliť súhlas s ich spracovaním. Následkom neposkytnutia osobných údajov a/alebo následkom neudelenia súhlasu so spracovaním osobných údajov bude, že Prevádzkovateľ nebude môcť uzatvoriť a splniť kúpnu zmluvu.
                </p>
              </section>

              {/* 13. Automatické rozhodovanie */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">13. Informácia súvisiaca s automatickým rozhodovaním vrátane profilovania:</h3>
                <p className="text-gray-700">
                  Neuplatňuje sa. - Keďže v prípade Prevádzkovateľa nejde o spracovanie osobných údajov Dotknutej osoby v podobe automatizovaného rozhodovania vrátane profilovania uvedeného v článku 22 ods. 1. a 4. Nariadenia, Prevádzkovateľ nie je povinný uviesť informácie podľa článku 13 ods. 2 písm. f) Nariadenia.
                </p>
              </section>

              {/* 14. Cookies */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">14. Ochrana osobných údajov a používanie cookies</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Čo je to súbor cookie?</h4>
                    <p className="text-gray-700">
                      Súbory cookies sú textové súbory, ktoré obsahujú malé množstvo informácií, ktoré sa pri návšteve webovej stránky natiahnu do vášho počítača, mobilu alebo iného zariadenia. Súbory cookies sú užitočné, pretože umožňujú internetovej stránke nielen rozpoznať zariadenie užívateľa, ale súčasne užívateľovi umožniť prístup k funkciám na stránke.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Ako používame súbory cookie?</h4>
                    <p className="text-gray-700 mb-2">
                      Náš Internetový obchod používa súbory cookie, aby sme uchovali:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>vaše preferencie zobrazenia, napríklad nastavenia kontrastu farieb alebo veľkosti písma;</li>
                      <li>skutočnosť, že ste už odpovedali na prieskum zobrazujúci sa v samostatnom okne (pop-up);</li>
                      <li>skutočnosť, či ste súhlasili (alebo nesúhlasili) s tým, aby sme využívali súbory cookie na tejto webovej lokalite;</li>
                      <li>remarketing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Ako kontrolovať súbory cookie</h4>
                    <p className="text-gray-700">
                      Súbory cookie môžete kontrolovať a/alebo zmazať podľa uváženia – podrobnosti si pozrite na stránke aboutcookies.org.
                    </p>
                  </div>
                </div>
              </section>

              {/* 15. Záverečné ustanovenia */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-[#2EC4B6] mb-4">15. Záverečné ustanovenia</h3>
                <p className="text-gray-700">
                  Tieto Zásady a poučenia o ochrane osobných údajov tvoria neoddeliteľnú súčasť Všeobecných obchodných podmienok a Reklamačného poriadku. Dokumenty – Všeobecné obchodné podmienky a Reklamačný poriadok tohto internetového obchodu sú zverejnené na doméne Internetového obchodu Predávajúceho.
                </p>
                <p className="text-gray-700 mt-4 font-semibold">
                  Tieto zásady ochrany osobných údajov nadobúdajú platnosť a účinnosť ich zverejnením v Internetovom obchode predávajúceho 20.01.2020
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#40DDCB] to-[#2EC4B6] text-white py-6 px-6 md:px-12 text-center">
          <p className="text-lg font-semibold">Ďakujeme za prečítanie našich zásad ochrany osobných údajov</p>
          <p className="text-sm opacity-90 mt-2">V prípade otázok nás neváhajte kontaktovať</p>
        </div>
      </div>
    </div>
  );
}