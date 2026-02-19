
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GrantContactForm from '../components/GrantContactForm'
import { Check, AlertTriangle, FileText, Calendar, ArrowRight, XCircle, Waves, Download } from 'lucide-react'

export default function Hajaasustus() {
    useEffect(() => {
        // Set page title and meta description manually for this specific landing page
        document.title = "Hajaasustuse programm 2026: taotlemise juhend (kanalisatsioon/biopuhasti) | BioPuhastid"

        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Selge juhend hajaasustuse programmi 2026 taotluseks: tingimused, dokumendid, 02.02–02.04 tähtajad, levinud vead. Aitame hinnapakkumuste ja taotluspaketiga.');
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Selge juhend hajaasustuse programmi 2026 taotluseks: tingimused, dokumendid, 02.02–02.04 tähtajad, levinud vead. Aitame hinnapakkumuste ja taotluspaketiga.";
            document.head.appendChild(meta);
        }
    }, [])

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.biopuhastid.com/hajaasustuse-programm/#webpage",
                "url": "https://www.biopuhastid.com/hajaasustuse-programm/",
                "name": "Hajaasustuse programm 2026: taotlemise juhend",
                "description": "Selge juhend hajaasustuse programmi 2026 taotluseks: tingimused, dokumendid, 02.02–02.04 tähtajad, levinud vead.",
                "isPartOf": { "@id": "https://www.biopuhastid.com/#website" },
                "datePublished": "2026-02-19T08:00:00+02:00",
                "dateModified": "2026-02-19T17:00:00+02:00",
                "breadcrumb": { "@id": "https://www.biopuhastid.com/hajaasustuse-programm/#breadcrumb" }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.biopuhastid.com/hajaasustuse-programm/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Avaleht",
                        "item": "https://www.biopuhastid.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Hajaasustuse programm",
                        "item": "https://www.biopuhastid.com/hajaasustuse-programm/"
                    }
                ]
            },
            {
                "@type": "HowTo",
                "name": "Kuidas taotleda hajaasustuse programmi toetust (kanalisatsioon)",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Kontrolli sobivust",
                        "text": "Veendu, et sinu elukoht on rahvastikuregistri järgi hajaasustuses ja sul ei ole maksuvõlgu."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Vali valdkond",
                        "text": "Otsusta, kas taotled toetust kanalisatsioonile, veevarustusele või muule valdkonnale."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Kogu dokumendid ja hinnapakkumised",
                        "text": "Võta kaks võrreldavat hinnapakkumist ja koosta tegevuste kirjeldus ning eelarve."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Esita taotlus KOV-ile",
                        "text": "Esita allkirjastatud taotlus paberil või digitaalselt kohalikule omavalitsusele hiljemalt 02.04.2026."
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Millal on 2026. aasta taotlusvoor avatud?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Taotlusvoor on avatud 02.02.2026 kuni 02.04.2026."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Kui suur on maksimaalne toetus?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Maksimaalne toetus ühele majapidamisele on 6500 eurot, moodustades kuni 67% abikõlblikest kuludest."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Kas biopuhasti paigaldamine on toetatav?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Jah, kanalisatsioonisüsteemide valdkonnas toetatakse omapuhastite (sh biopuhastid, imb- ja filtersüsteemid) rajamist, mis tagavad nõuetekohase reoveekäitluse."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Kuhu tuleb taotlus esitada?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Taotlus tuleb esitada taotleja elukohajärgsele kohalikule omavalitsusele (valda) allkirjastatult paberil või digitaalselt."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Mis on kohustuslik omafinantseering?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oma- ja kaasfinantseering peab katma vähemalt 33% projekti abikõlblikest kuludest."
                        }
                    }
                ]
            },
            {
                "@type": "Organization",
                "name": "Kingspan Biopuhastid",
                "url": "https://www.biopuhastid.com",
                "logo": "https://www.biopuhastid.com/Kingspan%20Logo.jpeg",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+372 5610 3001",
                    "contactType": "customer service",
                    "email": "info@kingspaneesti.com",
                    "areaServed": "EE",
                    "availableLanguage": "Estonian"
                }
            }
        ]
    }

    return (
        <div className="text-kingspan-navy font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-kingspan-blue/5 to-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-kingspan-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-green-100 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-kingspan-blue/10 text-kingspan-blue font-semibold text-sm mb-4">
                        Avatud 02.02.2026 – 02.04.2026
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-kingspan-navy leading-tight">
                        Hajaasustuse programm 2026: <br />
                        <span className="text-kingspan-blue">Taotlemise juhend</span>
                    </h1>
                    <p className="text-lg md:text-xl text-kingspan-slate mb-8 max-w-2xl mx-auto leading-relaxed">
                        Plaanid rajada biopuhastit või veesüsteemi? Siit leiad selge juhendi, kuidas taotleda kuni 6500 € toetust.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#taotlusvorm" className="btn-primary flex items-center justify-center gap-2 px-8 py-3 text-lg">
                            Küsi tasuta eelkontrolli <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="#sammud" className="btn-secondary flex items-center justify-center px-8 py-3 text-lg bg-white">
                            Vaata samme
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Info Box (Kiire ülevaade) */}
            <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-kingspan-cloud/50 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                        <span className="text-sm text-kingspan-slate uppercase tracking-wider font-semibold mb-1">Taotlusvoor</span>
                        <span className="text-lg font-bold text-kingspan-navy">02.02 – 02.04.2026</span>
                    </div>
                    <div className="flex flex-col border-b md:border-b-0 lg:border-r md:border-r-0 border-gray-100 pb-4 md:pb-0">
                        <span className="text-sm text-kingspan-slate uppercase tracking-wider font-semibold mb-1">Max toetus</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-green-600">6500 €</span>
                            <span className="text-sm text-kingspan-slate">per majapidamine</span>
                        </div>
                    </div>
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                        <span className="text-sm text-kingspan-slate uppercase tracking-wider font-semibold mb-1">Toetuse määr</span>
                        <span className="text-lg font-bold text-kingspan-navy">kuni 67%</span>
                        <span className="text-xs text-kingspan-slate">omafinantseering min 33%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-kingspan-slate uppercase tracking-wider font-semibold mb-1">Projekti lõpp</span>
                        <span className="text-lg font-bold text-kingspan-navy">31.10.2027</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">

                {/* 1. Kas sa oled sobiv taotleja? */}
                <section id="kontrollnimekiri">
                    <h2 className="text-3xl font-bold mb-6 text-kingspan-navy">1. Kas sa oled sobiv taotleja?</h2>
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-kingspan-slate">Oled füüsiline isik ja sinu alaline elukoht on rahvastikuregistri järgi taotletavas majapidamises (seisuga 01.01.2026).</span>
                            </li>
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-kingspan-slate">Elukoht asub <strong>hajaasustusega piirkonnas</strong> (veendu KOV-ist, et piirkond ei ole määratud tiheasustusalaks või ühisveevärgialaks).</span>
                            </li>
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-kingspan-slate">Sul ei ole riiklikke ega kohalikke maksuvõlgu (v.a ajatatud).</span>
                            </li>
                            <li className="flex gap-3">
                                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-kingspan-slate">Eelnevate toetuste aruanded on KOV-i poolt kinnitatud.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Toetatavad tegevused */}
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-kingspan-navy">2. Milleks saab toetust?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl border border-kingspan-cloud bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Waves className="text-blue-500" /> Kanalisatsioonisüsteemid
                            </h3>
                            <p className="text-kingspan-slate mb-4 text-sm leading-relaxed">
                                Toetatakse hooneväliseid lahendusi reovee nõuetekohaseks kokkukogumiseks ja puhastamiseks. See on ideaalne võimalus vana septiku asendamiseks kaasaegse biopuhastiga.
                            </p>
                            <ul className="text-sm space-y-2 text-kingspan-slate ml-1">
                                <li className="flex gap-2 items-start"><span className="text-blue-400">•</span> Omapuhastid (biopuhastid, imb- ja filtersüsteemid)</li>
                                <li className="flex gap-2 items-start"><span className="text-blue-400">•</span> Kogumiskaevud</li>
                                <li className="flex gap-2 items-start"><span className="text-blue-400">•</span> Liitumine ühiskanalisatsiooniga</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl border border-kingspan-cloud bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="text-blue-500">💧</span> Veevarustussüsteemid
                            </h3>
                            <p className="text-kingspan-slate mb-4 text-sm leading-relaxed">
                                Puur- ja salvkaevude rajamine või puhastamine, torustike paigaldamine ja veepuhastusseadmed joogivee kvaliteedi tagamiseks.
                            </p>
                        </div>

                        {/* Placeholder cards for Road/Electricity to keep layout balanced */}
                        <div className="p-6 rounded-2xl border border-kingspan-cloud bg-white/50 grayscale opacity-75">
                            <h3 className="text-lg font-bold mb-2">Juurdepääsuteed</h3>
                            <p className="text-xs text-kingspan-slate">Teed eramu ja avaliku tee vahel.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-kingspan-cloud bg-white/50 grayscale opacity-75">
                            <h3 className="text-lg font-bold mb-2">Autonoomne elekter</h3>
                            <p className="text-xs text-kingspan-slate">Kui puudub võrguühendus.</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-kingspan-slate italic">
                        * Toetust saab taotleda ka juurdepääsuteedele ja autonoomsele elektrile (kui võrguühendus puudub).
                    </p>
                </section>

                {/* 3. Samm-sammuline juhend */}
                <section id="sammud">
                    <h2 className="text-3xl font-bold mb-8 text-kingspan-navy">3. Samm-sammuline taotlemine</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-kingspan-cloud before:to-transparent">

                        {/* Step 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-kingspan-blue bg-white group-[.is-active]:bg-kingspan-blue text-kingspan-blue group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-kingspan-cloud bg-white shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-kingspan-navy">Vali lahendus ja küsi hinnad</h4>
                                <p className="text-sm text-kingspan-slate">
                                    Mõtle läbi, mida vajad (nt biopuhasti vs mahuti). Küsi meilt tehniline konsultatsioon ja <strong>kaks võrreldavat hinnapakkumist</strong>. See on kohustuslik dokument.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-kingspan-cloud bg-white text-kingspan-slate shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-kingspan-cloud bg-white shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-kingspan-navy">Koosta taotluspakett</h4>
                                <p className="text-sm text-kingspan-slate">
                                    Täida taotlusvorm, lisa eelarve, tegevuste kirjeldus ja omafinantseeringu garantiikiri.
                                </p>
                                <a href="https://pilv.rtk.ee/s/sH5WcWXY7zs3sb4" target="_blank" rel="noopener noreferrer" className="text-kingspan-blue text-xs font-semibold hover:underline mt-2 inline-block">
                                    Laadi vormid alla (RTK) &rarr;
                                </a>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-kingspan-cloud bg-white text-kingspan-slate shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-kingspan-cloud bg-white shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-kingspan-navy">Esita KOV-ile (02.04)</h4>
                                <p className="text-sm text-kingspan-slate">
                                    Esita digiallkirjastatud taotlus oma valla või linnavalitsuse e-postile hiljemalt 2. aprillil.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-kingspan-cloud bg-white text-kingspan-slate shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-kingspan-cloud bg-white shadow-sm">
                                <h4 className="font-bold text-lg mb-1 text-kingspan-navy">Otsus ja teostus</h4>
                                <p className="text-sm text-kingspan-slate">
                                    KOV teeb otsuse ~60 päeva jooksul. Pärast lepingu sõlmimist on sul aega töödeks 31.10.2027-ni.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 4. Levinud vead */}
                <section className="bg-red-50/50 rounded-2xl p-6 md:p-8 border border-red-100">
                    <h2 className="text-2xl font-bold mb-4 text-kingspan-navy flex items-center gap-2">
                        <AlertTriangle className="text-red-500" />
                        Levinud vead, miks taotlus tagasi lükatakse
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-kingspan-slate"><strong>Puudub 2 hinnapakkumist</strong> või need ei ole võrreldavad. See on üks sagedasemaid vigu.</p>
                        </div>
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-kingspan-slate"><strong>Hoonesisesed tööd:</strong> toetus on mõeldud ainult välistrasside ja -seadmete jaoks (v.a teatud erandid).</p>
                        </div>
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-kingspan-slate"><strong>Ehituslikud vastuolud:</strong> puudub servituut naabri maal paiknevale trassile või projekt ei vasta KOV nõuetele.</p>
                        </div>
                        <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-kingspan-slate"><strong>Aruandlus:</strong> eelmine toetuse aruanne on kinnitamata.</p>
                        </div>
                    </div>
                </section>

                {/* 5. Dokumendid ja lingid */}
                <section id="dokumendid">
                    <h2 className="text-2xl font-bold mb-6 text-kingspan-navy">Vajalikud dokumendid ja lingid</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <a href="https://rtk.ee/meede-hajaasustuse-programm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-kingspan-cloud bg-white hover:bg-gray-50 transition-colors">
                            <FileText className="text-kingspan-blue w-5 h-5" />
                            <span className="font-medium text-kingspan-navy">RTK meetme leht ja tingimused</span>
                        </a>
                        <a href="https://pilv.rtk.ee/s/sH5WcWXY7zs3sb4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-kingspan-cloud bg-white hover:bg-gray-50 transition-colors">
                            <Download className="text-kingspan-blue w-5 h-5" />
                            <span className="font-medium text-kingspan-navy">Taotlusvormid (RTK pilv)</span>
                        </a>
                        <a href="https://www.riigiteataja.ee/akt/107012021004?leiaKehtiv=" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-kingspan-cloud bg-white hover:bg-gray-50 transition-colors">
                            <FileText className="text-kingspan-blue w-5 h-5" />
                            <span className="font-medium text-kingspan-navy">Määrus (Riigi Teataja)</span>
                        </a>
                        <a href="https://pilv.rtk.ee/s/dXxqdo39WYwmHfR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-kingspan-cloud bg-white hover:bg-gray-50 transition-colors">
                            <Calendar className="text-kingspan-blue w-5 h-5" />
                            <span className="font-medium text-kingspan-navy">KOV kontaktisikud</span>
                        </a>
                    </div>
                </section>

                {/* Grant Form Section */}
                <section className="scroll-mt-24" id="taotlusvorm">
                    <div className="max-w-3xl mx-auto">
                        <GrantContactForm />
                    </div>
                </section>

                {/* FAQ - KKK */}
                <section id="kkk" className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center text-kingspan-navy">Korduma kippuvad küsimused</h2>
                    <div className="space-y-4">
                        <details className="group p-4 bg-white rounded-xl border border-kingspan-cloud/50 open:border-kingspan-blue/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-kingspan-navy">
                                Millal raha kätte saab?
                                <span className="text-kingspan-blue group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-kingspan-slate text-sm leading-relaxed">
                                Toetus makstakse välja üldjuhul pärast toetuslepingu sõlmimist (10 tööpäeva jooksul) või tööde teostamise järel, sõltuvalt KOV ja taotleja vahelisest lepingust (sageli kasutatakse kolmepoolset lepingut, kus KOV maksab otse teostajale).
                            </div>
                        </details>

                        <details className="group p-4 bg-white rounded-xl border border-kingspan-cloud/50 open:border-kingspan-blue/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-kingspan-navy">
                                Kas ma võin töid ise teha?
                                <span className="text-kingspan-blue group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-kingspan-slate text-sm leading-relaxed">
                                Üldjuhul nõuab programm, et kanalisatsioonitöid teostaks kvalifitseeritud ettevõtja, et tagada nõuetele vastavus ja garantii. Isetegemine on lubatud piiratud ulatuses ja sel juhul ei ole oma tööaeg abikõlblik kulu.
                            </div>
                        </details>

                        <details className="group p-4 bg-white rounded-xl border border-kingspan-cloud/50 open:border-kingspan-blue/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-kingspan-navy">
                                Mis saab, kui projekt läheb kallimaks?
                                <span className="text-kingspan-blue group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-kingspan-slate text-sm leading-relaxed">
                                Toetuse summa on fikseeritud lepingus. Kui tööd lähevad kallimaks, tuleb lisakulu katta taotlejal endal (omafinantseeringu osa suureneb).
                            </div>
                        </details>

                        <details className="group p-4 bg-white rounded-xl border border-kingspan-cloud/50 open:border-kingspan-blue/30 transition-all">
                            <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none text-kingspan-navy">
                                Kas abihoonetele saab kanalisatsiooni?
                                <span className="text-kingspan-blue group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="mt-3 text-kingspan-slate text-sm leading-relaxed">
                                Ainult juhul, kui abihoone on oluline majapidamise toimimiseks (nt seal asub ainus pesemisvõimalus/saun ja tualett). Garaažid ja kuurid ei kvalifitseeru.
                            </div>
                        </details>
                    </div>
                </section>

            </div>

            <div className="text-center pb-8 text-xs text-kingspan-slate/50">
                Viimati uuendatud: 19.02.2026
            </div>

            <Footer />
        </div>
    )
}
