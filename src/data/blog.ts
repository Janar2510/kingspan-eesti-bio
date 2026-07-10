export interface BlogSection {
  type: 'h2' | 'p' | 'ul' | 'cta'
  content: string | string[]
}

export interface BlogPost {
  slug: string
  titleEE: string
  titleEN: string
  excerptEE: string
  excerptEN: string
  date: string
  readingTime: number
  accentColor: string
  keywords: string[]
  sections: BlogSection[]
  sectionsEN: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'biopuhastid-vs-septik-2026',
    titleEE: 'Biopuhastid vs septik: kumb on parem valik 2026. aastal?',
    titleEN: 'Biological treatment vs septic tank: which is better in 2026?',
    excerptEE: 'Septik töötab. Selle eest keegi ei vaidle. Küsimus on selles, kas see töötab piisavalt hästi ja mida see tegelikult maksab pikemas perspektiivis.',
    excerptEN: 'A septic tank works. Nobody argues otherwise. The question is whether it works well enough and what it actually costs over time.',
    date: '2026-07-01',
    readingTime: 5,
    accentColor: 'from-aqua-900/40 to-ink-950',
    keywords: ['biopuhastid', 'septik', 'biopuhasti vs septik', 'reoveepuhastus', 'Kingspan'],
    sections: [
      {
        type: 'p',
        content: 'Septik töötab. Selle eest keegi ei vaidle. Küsimus on pigem selles, kas see töötab piisavalt hästi ja mis see maksab 15-20 aasta perspektiivis.'
      },
      { type: 'h2', content: 'Kulu aastas' },
      {
        type: 'p',
        content: 'Tüüpiline kolmesektsiooniline septik maksab käitada 300-480 eurot aastas: kaks tühjendust aastas, 80-120 eurot kord, pluss vedu ja käitlemine. Kingspan BioDisc tarbib elektrienergiat 35-40 kWh kuus ehk umbes 85-110 eurot aastas elektrile. See on rohkem kui poole odavam.'
      },
      {
        type: 'p',
        content: 'Paigaldushind on teine asi. Odav septik maksab paigaldatult 2000-3500 eurot. BioDisc algab umbes 4500-5500 eurost. See vahe tundub suur, aga arvesta ka imbväljakut, mida septik vajab ja biopuhasti ei vaja.'
      },
      { type: 'h2', content: 'Veeseadus 2026' },
      {
        type: 'p',
        content: 'Eestis kehtib veeseaduse nõue, et 2026. aasta lõpuks peavad kõik ühisveevärgi ja kanalisatsiooniga liitumata kinnistud vastama reovee puhastamise nõuetele. Tavaline leotusseptik seda nõuet ei täida. Biopuhasti täidab.'
      },
      {
        type: 'p',
        content: 'See ei ole teoreetiline oht. Kohalikud omavalitsused viivad läbi kontrolle ja trahvid on reaalsed. Kui kinnistu vahetab omanikku, nõuab notar tihti kehtivat reoveepuhastuse lahendust.'
      },
      { type: 'h2', content: 'Mis juhtub, kui pinnas vett läbi ei lase' },
      {
        type: 'p',
        content: 'Kui krundi pinnas on liiga savine, ei luba KOV-id imbvälja ehitada. Septiku vesi läheb siis... kuhu ei peaks. Biopuhasti puhastab reovee nii, et seda saab juhtida otse kraavi. See ei ole nüanss, see on oluline erinevus seal, kus savi on sügav.'
      },
      { type: 'h2', content: 'Kokkuvõtteks' },
      {
        type: 'p',
        content: 'Kui kinnistul elab rohkem kui kolm inimest ja plaan on seal elada järgmised 15-20 aastat, on biopuhasti tõenäoliselt odavam valik kogu eluea peale arvutatuna. Kui tegemist on suvila või ajutise elukohaga, on septik veel põhjendatav. Aga nõuded karmistuvad ja aeg töötab biopuhastite kasuks.'
      },
      { type: 'cta', content: 'Küsi tasuta nõustamist' }
    ],
    sectionsEN: [
      {
        type: 'p',
        content: 'A septic tank works. Nobody disputes that. The real question is whether it works well enough and what it costs over a 15-20 year horizon.'
      },
      { type: 'h2', content: 'Annual running costs' },
      {
        type: 'p',
        content: 'A typical three-chamber septic tank costs 300-480 euros a year to run: two emptying services annually at 80-120 euros each, plus transport and treatment fees. A Kingspan BioDisc uses 35-40 kWh of electricity per month, adding roughly 85-110 euros to your annual electricity bill. More than twice cheaper to operate.'
      },
      {
        type: 'p',
        content: 'Installation is a different story. A basic septic tank costs 2000-3500 euros installed. BioDisc starts at around 4500-5500 euros. That gap looks large until you factor in the leach field a septic tank needs and a biodisc does not.'
      },
      { type: 'h2', content: 'Estonian wastewater law in 2026' },
      {
        type: 'p',
        content: 'Estonian water law requires that by the end of 2026, all properties not connected to municipal sewer must meet wastewater treatment standards. A standard soakaway septic tank does not meet these standards. A biological treatment system does.'
      },
      {
        type: 'p',
        content: 'This is not a theoretical risk. Local municipalities are running inspections and fines are real. When a property changes hands, notaries increasingly require proof of compliant wastewater treatment.'
      },
      { type: 'h2', content: 'When the soil does not drain' },
      {
        type: 'p',
        content: 'If a plot has poor soil permeability, local authorities will not permit a leach field. The septic tank effluent then has to go somewhere it should not. A biological treatment system cleans wastewater to a standard that allows discharge directly into a ditch. That is a meaningful difference on clay-heavy land.'
      },
      { type: 'h2', content: 'Bottom line' },
      {
        type: 'p',
        content: 'If more than three people live on the property and you plan to stay for 15-20 years, a biological system is probably the cheaper option over its lifetime. For a summer cottage or temporary residence, a septic tank may still make sense. But regulations are tightening and time is working against septic tanks.'
      },
      { type: 'cta', content: 'Ask for free consultation' }
    ]
  },
  {
    slug: 'kingspan-biodisc-eesti-populaarseim-biopuhasti',
    titleEE: 'Kingspan BioDisc: miks see on Eesti enim paigaldatud biopuhasti?',
    titleEN: 'Kingspan BioDisc: why is it Estonia\'s most installed biological treatment system?',
    excerptEE: 'Üle 3000 paigalduse Eestis. See on arv, millest on raske mööda vaadata, eriti kui arvestada, et biopuhastite turg oli kuni hiljutiseni väike.',
    excerptEN: 'Over 3,000 installations in Estonia. A number that is hard to ignore, especially given how small the biodisc market was until recently.',
    date: '2026-06-20',
    readingTime: 4,
    accentColor: 'from-blue-900/40 to-ink-950',
    keywords: ['Kingspan BioDisc', 'BioDisc Eesti', 'Kingspan biopuhastid', 'biopuhasti hind', 'Kingspan'],
    sections: [
      {
        type: 'p',
        content: 'Üle 3000 paigalduse Eestis. See on arv, millest on raske mööda vaadata, eriti arvestades, et biopuhastite turg oli kuni hiljutiseni üsna väike. Kust see populaarsus tuleb?'
      },
      { type: 'h2', content: 'Kuidas BioDisc töötab' },
      {
        type: 'p',
        content: 'BioDisc kasutab rotatsioonilist bioloogilist filtreerimist. Plastikust kettad pöörlevad aeglaselt reovees, arendades aja jooksul bakterikolooniad, mis lagundavad orgaanilist ainet. Lihtne mehhanism, vähe liikuvaid osi, madal hooldusvajadus.'
      },
      {
        type: 'p',
        content: 'Tegelikkuses tähendab see, et esimesel aastal käib meistri kontrollkäik. Pärast seda hoiavad enamik kasutajaid süsteemi ise korda: kord aastas puhastus, seadme silmaga ülevaatus. Midagi muud tavaliselt ei nõuta.'
      },
      { type: 'h2', content: 'Mis eristab BioDisci odavamatest analoogidest' },
      {
        type: 'p',
        content: 'Põhiliselt kaks asja: materjali kvaliteet ja tootmismastaap. Kingspan on üks Euroopa suurimaid ehitusmaterjalide tootjaid, mis tagab standardiseeritud tootmise ja varuosad, mis on kättesaadavad ka 10 aasta pärast. BioDiscile antakse 20-aastane garantii.'
      },
      {
        type: 'p',
        content: 'Odavamatel analoogidel on sageli varuosade probleem: viis aastat pärast ostu selgub, et tootja on muutunud, mudel on vananenud ja varuosa ei saa enam mõistliku hinnaga. BioDisciga seda probleemi ei ole.'
      },
      { type: 'h2', content: 'Mida müügijutt sageli ei maini' },
      {
        type: 'p',
        content: 'BioDisc vajab kindlat horisontaalset paigaldust ja vähemalt 30 cm maakattekihti. Enamik paigaldusprobleeme tuleb sellest, et krunt mõõdetakse valesti ja süsteem käivitub viltu. Tagajärjed: vibratsioon, mehaaniline kulumine, puhastuse efektiivsuse langus.'
      },
      {
        type: 'p',
        content: 'Teine asi: BioDisc on elussüsteem. Kui majapidamine on tühi rohkem kui paar nädalat järjest, võivad bakterikolooniad osaliselt surra. Seda saab vältida bakteripreparaadiga, aga see nõuab teadlikku kasutamist.'
      },
      { type: 'h2', content: 'Kas BioDisc sobib sinu kinnistule' },
      {
        type: 'p',
        content: 'BioDisc sobib peaaegu kõigile püsielamisena kasutatavatele kinnistutele, kus on 1-10 inimest. Väiksematele majapidamistele on BioFicient kompaktsem valik. Suvemajadele, kus hoone on suure osa aastast tühi, tasub kaaluda alternatiive. Parim viis teada saada on lasta Kingspan Eesti esindajal konkreetne olukord üle hinnata.'
      },
      { type: 'cta', content: 'Küsi tasuta nõustamist' }
    ],
    sectionsEN: [
      {
        type: 'p',
        content: 'Over 3,000 installations in Estonia. That is a number worth paying attention to, especially considering how small the biological treatment market was until recently. Where does that popularity come from?'
      },
      { type: 'h2', content: 'How BioDisc works' },
      {
        type: 'p',
        content: 'BioDisc uses a rotating biological contactor. Plastic discs rotate slowly through the wastewater, developing bacterial colonies over time that break down organic matter. Simple mechanism, few moving parts, low maintenance requirements.'
      },
      {
        type: 'p',
        content: 'In practice this means one service visit in the first year. After that, most users maintain the system themselves: an annual clean, a visual check on the unit. Nothing more is usually required.'
      },
      { type: 'h2', content: 'What sets BioDisc apart from cheaper alternatives' },
      {
        type: 'p',
        content: 'Two things mainly: material quality and production scale. Kingspan is one of Europe\'s largest construction materials manufacturers, which means standardized production and spare parts that are still available 10 years later. BioDisc comes with a 20-year guarantee.'
      },
      {
        type: 'p',
        content: 'Cheaper alternatives often run into a parts problem: five years after purchase, the manufacturer has changed, the model is discontinued, and spares cost a fortune. BioDisc does not have this problem.'
      },
      { type: 'h2', content: 'What the sales pitch often leaves out' },
      {
        type: 'p',
        content: 'BioDisc requires a level installation surface and at least 30 cm of soil cover. Most installation problems stem from plots being measured incorrectly and the system starting at an angle. The consequences: vibration, mechanical wear, reduced treatment efficiency.'
      },
      {
        type: 'p',
        content: 'The other thing: BioDisc is a living system. If the household is empty for more than a couple of weeks at a time, the bacterial colonies can partially die off. A bacterial preparation prevents this, but it requires informed use.'
      },
      { type: 'h2', content: 'Is BioDisc right for your property' },
      {
        type: 'p',
        content: 'BioDisc suits almost any permanently occupied property with 1-10 people. For smaller households, BioFicient is a more compact choice. For summer cottages empty for most of the year, alternatives are worth considering. The best way to find out is to have a Kingspan Estonia representative assess your specific situation.'
      },
      { type: 'cta', content: 'Ask for free consultation' }
    ]
  },
  {
    slug: 'hajaasustuse-programm-2026-toetus',
    titleEE: 'Hajaasustuse programm 2026: kuidas saada kuni 6500 eurot toetust?',
    titleEN: 'Rural settlement support 2026: how to get up to €6,500 in grants?',
    excerptEE: '6500 eurot on olemas. Aga raha läheb kiiresti, vallad erinevad ja dokumentatsioon on nõudlik. Siin on see, mida pead teadma enne taotluse esitamist.',
    excerptEN: 'The €6,500 grant exists. But funds go fast, municipalities differ, and documentation is demanding. Here is what you need to know before applying.',
    date: '2026-06-10',
    readingTime: 6,
    accentColor: 'from-gold-900/30 to-ink-950',
    keywords: ['hajaasustuse programm 2026', 'toetus septik', 'biopuhasti toetus', 'EIS toetus', 'Kingspan'],
    sections: [
      {
        type: 'p',
        content: '6500 eurot on olemas. Aga raha läheb kiiresti, vallad on erinevad ja dokumentatsioon on nõudlik. Siin on see, mida pead teadma enne taotluse esitamist.'
      },
      { type: 'h2', content: 'Mis on hajaasustuse programm' },
      {
        type: 'p',
        content: 'Hajaasustuse programm on riiklik toetusmeede, mis aitab maapiirkondade majapidamistel rajada nõuetekohane reoveepuhastussüsteem, kaev või juurdepääsutee. 2026. aastal on maksimaalne toetus reoveesüsteemile 6500 eurot. Omafinantseering peab olema vähemalt 33% kogumaksumusest.'
      },
      { type: 'h2', content: 'Kes saab taotleda' },
      {
        type: 'p',
        content: 'Põhitingimused: elamu asub hajaasustusega piirkonnas, kus ühisveevärk ja kanalisatsioon puuduvad; omanik elab kinnistul alaliselt; viimase kümne aasta jooksul ei ole sama meetme raames toetust saadud; kinnistul on kehtiv ehitusluba.'
      },
      {
        type: 'p',
        content: 'Rendikorterid, suvemajad ja kinnistud, kus omanik ei ela alaliselt, ei kvalifitseeru. See on üks levinumaid väärarvamusi, mis taotluse juba varases staadiumis tagasi lükkab.'
      },
      { type: 'h2', content: 'Kuidas taotlus käib' },
      {
        type: 'p',
        content: 'Taotlused esitatakse EIS (Ettevõtluse ja Innovatsiooni Sihtasutuse) e-keskkonna kaudu. Taotlusvooru avamise aeg sõltub vallast: mõned avavad juba veebruaris, teised märtsis-aprillis. Raha jagatakse esimesena esitanute vahel.'
      },
      {
        type: 'p',
        content: 'Dokumentide nimekiri on pikk: asendiplaan koos mõõtudega, hinnapakkumine sertifitseeritud paigaldajalt, kinnistu omandi tõend, omaniku elukohajärgse omavalitsuse kinnitus, mõnel juhul ka veemajanduskava.'
      },
      { type: 'h2', content: 'Miks taotlusi tagasi lükatakse' },
      {
        type: 'p',
        content: 'Kõige levinum põhjus on puudulik asendiplaani projekt. Kohalik omavalitsus nõuab täpset projekti koos meetmete kirjeldusega. Ilma selleta jäetakse taotlus menetlemata, aga uuesti esitamine tähendab järjekorras tagapoole minekut.'
      },
      {
        type: 'p',
        content: 'Teine levinud probleem: hinnapakkumine, mis ei kata kõiki toetusega kaetavaid kulutusi. Biopuhasti ise on kaetav kulu, aga nii ka torustik, kaevude rajamine ja pinnase taastamine. Kui need read on puudu, ei toeta KOV nende eest.'
      },
      { type: 'h2', content: 'Praktilised soovitused' },
      {
        type: 'p',
        content: 'Alusta oma vallaga. Küsi sealt, millal 2026. aasta voor avaneb ja mida konkreetselt nõutakse. Seejärel telli Kingspan Eesti esindajalt tasuta nõustamine: aitame koostada toetuseks nõutava dokumentatsiooni ja hinnapakkumuse nii, et see läbib menetluse. Parem teha üks kord õigesti, kui esitada kaks korda ja kaotada järjekord.'
      },
      { type: 'cta', content: 'Küsi tasuta nõustamist' }
    ],
    sectionsEN: [
      {
        type: 'p',
        content: 'The €6,500 grant exists. But funds go fast, municipalities differ, and documentation is demanding. Here is what you need to know before starting your application.'
      },
      { type: 'h2', content: 'What the programme is' },
      {
        type: 'p',
        content: 'The rural settlement support programme is a national grant scheme that helps rural households build a compliant wastewater treatment system, well, or access road. In 2026, the maximum grant for a wastewater system is €6,500. You must contribute at least 33% of the total cost yourself.'
      },
      { type: 'h2', content: 'Who can apply' },
      {
        type: 'p',
        content: 'Main conditions: the property is in a rural area without municipal water and sewer connections; the owner lives on the property permanently; no grant has been received under the same scheme in the past ten years; the property has a valid building permit.'
      },
      {
        type: 'p',
        content: 'Rental apartments, summer cottages, and properties where the owner does not permanently reside do not qualify. This is one of the most common misunderstandings, and it gets applications rejected early.'
      },
      { type: 'h2', content: 'How the application works' },
      {
        type: 'p',
        content: 'Applications are submitted through the EIS (Enterprise Estonia) online environment. The timing of the application round depends on the municipality: some open in February, others in March or April. Funds are distributed on a first-come, first-served basis.'
      },
      {
        type: 'p',
        content: 'The document list is long: a site plan with measurements, a quote from a certified installer, proof of ownership, certificate of permanent residence, and in some cases a water management plan.'
      },
      { type: 'h2', content: 'Why applications get rejected' },
      {
        type: 'p',
        content: 'The most common reason is an incomplete site plan. Local authorities require a precise plan with a description of the measures. Without it, the application is returned, and resubmitting in the same round means losing your place in the queue.'
      },
      {
        type: 'p',
        content: 'Another common problem: a quote that does not cover all eligible costs. The biodisc unit is a covered cost, but so is the pipework, chamber installation, and ground reinstatement. If those line items are missing, the municipality will not fund them.'
      },
      { type: 'h2', content: 'Practical advice' },
      {
        type: 'p',
        content: 'Start with your municipality. Ask when the 2026 round opens and exactly what is required. Then contact Kingspan Estonia for a free consultation: we help prepare the documentation and quote to the standard that passes the review. Better to do it right once than submit twice and lose your queue position.'
      },
      { type: 'cta', content: 'Ask for free consultation' }
    ]
  }
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function formatDate(dateStr: string, lang: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(lang === 'ee' ? 'et-EE' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
