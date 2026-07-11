import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Calculator as CalculatorIcon, Users, Droplet, Home, Building, Calendar, MapPin, Euro } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { motion } from 'framer-motion'
import pricingData from '../data/pricing.json'

interface PricingProduct {
  productName: string
  model: string
  material: string
  maxFlow: number
  pe: number
  inletHeight: string
  priceExw: number | null
  priceEndUser: number | null
}

interface ProductDetail {
  systemName: string
  description: string
  capacity: string
  dimensions: string
  powerRequirement: string
  features: string[]
  product: PricingProduct
  priceWithoutVat: number
  priceWithVat: number
}

interface CalculationResult {
  recommended: ProductDetail
  alternatives?: ProductDetail[]
  address?: string
}

declare global {
  interface Window {
    InAadress: any
  }
}

export default function Calculator() {
  const { t, i18n } = useTranslation()
  const [numberOfPeople, setNumberOfPeople] = useState<number>(4)
  const [peakPeople, setPeakPeople] = useState<number>(4)
  const [propertyType, setPropertyType] = useState<'house' | 'business' | 'seasonal'>('house')
  const [waterUsage, setWaterUsage] = useState<number>(150)
  const [groundwater, setGroundwater] = useState<'low' | 'high' | 'auto'>('auto')
  const [results, setResults] = useState<CalculationResult | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [mapInitialized, setMapInitialized] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const inAadressInstanceRef = useRef<any>(null)

  // Load the InAadress widget script — only needed on this page, so it's
  // injected here rather than globally in index.html (which shipped it on
  // every route including the homepage).
  useEffect(() => {
    if (document.querySelector('script[src*="inaadress.maaamet.ee"]')) return
    const script = document.createElement('script')
    script.src = 'https://inaadress.maaamet.ee/inaadress/js/inaadress.min.js?d=20220510'
    script.async = true
    document.head.appendChild(script)
  }, [])

  // Initialize map - ensure it loads immediately and stays visible
  useEffect(() => {
    let retryCount = 0
    const maxRetries = 50 // Try for up to 10 seconds (50 * 200ms)

    const initMap = () => {
      retryCount++

      // Check if script is loaded
      if (typeof window === 'undefined' || !(window as any).InAadress) {
        if (retryCount < maxRetries) {
          setTimeout(initMap, 200)
        } else {
          console.error('InAadress script failed to load after multiple retries')
        }
        return
      }

      // Check if container exists
      const container = document.getElementById('InAadressDiv')
      if (!container) {
        if (retryCount < maxRetries) {
          setTimeout(initMap, 200)
        }
        return
      }

      // Don't reinitialize if already initialized
      if (inAadressInstanceRef.current) {
        setMapInitialized(true)
        return
      }

      try {
        const lang = i18n.language === 'ee' ? 'et' : 'en'

        // Initialize InAadress map with minimal config to avoid crashes
        inAadressInstanceRef.current = new (window as any).InAadress({
          container: "InAadressDiv",
          mode: 1, // Control mode
          defaultBaseLayer: "ORTOFOTO",
          baseLayers: ["ALUSKAART", "ORTOFOTO"],
          mapLayers: ["AADRESS"],
          showScale: true,
          lang: lang,
          displayZoomControl: true,
          displayAddressControl: true, // This should provide its own search input
          displayTypeControl: true,
          displayLegendControl: false
        })

        // Map is now initialized
        setMapInitialized(true)
      } catch (error) {
        console.error('Error initializing map:', error)
        if (retryCount < maxRetries) {
          setTimeout(initMap, 500)
        }
      }
    }

    // Start initialization immediately
    const timer = setTimeout(() => {
      initMap()
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [i18n.language])

  const findProduct = (systemType: string, pe: number): PricingProduct | undefined => {
    const products = (pricingData as any)[systemType.toLowerCase()]
    if (!products) return undefined

    // Find the product that matches or is closest to the required PE
    return products.find((p: PricingProduct) => p.pe >= pe) || products[products.length - 1]
  }

  const getSystemDetails = (pe: number, systemType: string): ProductDetail | undefined => {
    let systemName = ''
    let description = ''
    let capacity = ''
    let dimensions = ''
    let powerRequirement = ''
    let features: string[] = []
    let product: PricingProduct | undefined

    if (systemType === 'BioDisc') {
      systemName = 'BioDisc'
      description = t('calculator.systems.biodisc.desc')
      capacity = pe <= 6 ? '6 PE' : pe <= 12 ? '12 PE' : pe <= 18 ? '18 PE' : '25 PE'
      dimensions = pe <= 6 ? 'Ø 2.4m × H 2.1m' : pe <= 12 ? 'Ø 2.4m × H 2.4m' : 'Custom'
      powerRequirement = '0.37 kW'
      features = [
        t('calculator.features.quiet'),
        t('calculator.features.odourFree'),
        t('calculator.features.lowMaintenance')
      ]
      product = findProduct('biodisc', pe)
    } else if (systemType === 'BioFicient') {
      systemName = 'BioFicient'
      description = t('calculator.systems.bioficient.desc')
      capacity = `${pe} PE`
      dimensions = pe <= 10 ? '2.4m × 1.8m × 2.1m' : '2.4m × 2.4m × 2.4m'
      powerRequirement = pe <= 10 ? '0.37 kW' : '0.55 kW'
      features = [
        t('calculator.features.energyEfficient'),
        t('calculator.features.automated'),
        t('calculator.features.compact')
      ]
      product = findProduct('bioficient', pe)
    } else if (systemType === 'BioAir') {
      systemName = 'BioAir'
      description = t('calculator.systems.bioair.desc')
      capacity = `${pe} PE`
      dimensions = 'Variable'
      powerRequirement = pe <= 6 ? '0.37 kW' : '0.75 kW'
      features = [
        t('calculator.features.highEfficiency'),
        t('calculator.features.activatedSludge'),
        t('calculator.features.ipsOption')
      ]
      product = findProduct('bioair', pe)
    } else if (systemType === 'BioTec Flo') {
      systemName = 'BioTec Flo'
      description = t('calculator.systems.biotec.desc')
      capacity = pe <= 6 ? '6 PE' : '8 PE'
      dimensions = '2.4m × 1.8m × 2.1m'
      powerRequirement = t('calculator.noPower')
      features = [
        t('calculator.features.noElectricity'),
        t('calculator.features.gravity'),
        t('calculator.features.offGrid')
      ]
      product = findProduct('biotec', pe)
    }

    if (product && product.priceEndUser) {
      const priceWithoutVat = product.priceEndUser
      const priceWithVat = product.priceEndUser * 1.24 // 24% VAT
      return {
        systemName,
        description,
        capacity,
        dimensions,
        powerRequirement,
        features,
        product,
        priceWithoutVat,
        priceWithVat
      }
    }
    return undefined
  }

  const calculateSystem = () => {
    const basePeople = numberOfPeople
    const effectivePeople = Math.max(numberOfPeople, peakPeople)
    const hasPeak = peakPeople > numberOfPeople

    // Calculate PE (Population Equivalent)
    const pe = Math.ceil((effectivePeople * waterUsage) / 150)

    // Determine groundwater level if auto
    const gwLevel = groundwater === 'auto' ? 'low' : groundwater

    let recommended: ProductDetail | undefined
    let alternatives: ProductDetail[] = []

    if (propertyType === 'seasonal') {
      // Seasonal: Recommend BioTec Flo (no power)
      recommended = getSystemDetails(pe, 'BioTec Flo')
      alternatives = [getSystemDetails(pe, 'BioAir')].filter(Boolean) as ProductDetail[]
    } else if (gwLevel === 'high') {
      // High groundwater: Recommend BioDisc (GRP, very stable)
      recommended = getSystemDetails(pe, 'BioDisc')
      alternatives = [getSystemDetails(pe, 'BioFicient')].filter(Boolean) as ProductDetail[]
    } else if (hasPeak && basePeople <= 4 && peakPeople >= 8) {
      // Occasional peak load: recommend more robust systems
      recommended = getSystemDetails(pe, 'BioFicient')
      alternatives = [getSystemDetails(pe, 'BioDisc')].filter(Boolean) as ProductDetail[]
    } else if (basePeople >= 2 && basePeople <= 4) {
      // 2-4 people: BioAir first, BioFicient and BioDisc as alternatives
      recommended = getSystemDetails(pe, 'BioAir')
      alternatives = [
        getSystemDetails(pe, 'BioFicient'),
        getSystemDetails(pe, 'BioDisc')
      ].filter(Boolean) as ProductDetail[]
    } else if (basePeople > 4 && basePeople <= 6) {
      // 4-6 people: BioFicient first, BioDisc alternative
      recommended = getSystemDetails(pe, 'BioFicient')
      alternatives = [getSystemDetails(pe, 'BioDisc')].filter(Boolean) as ProductDetail[]
    } else {
      // Normal: Recommend BioFicient or BioDisc
      recommended = pe <= 6 ? getSystemDetails(pe, 'BioDisc') : getSystemDetails(pe, 'BioFicient')
      alternatives = [getSystemDetails(pe, 'BioAir')].filter(Boolean) as ProductDetail[]
    }

    if (recommended) {
      setResults({
        recommended,
        alternatives,
        address: selectedAddress || undefined
      })
    }
  }

  return (
    <div className="surface-deep min-h-screen">
      <SEOHead />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 surface-deep water-field overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-dark inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-6"
            >
              <CalculatorIcon className="w-8 h-8 md:w-10 md:h-10 text-aqua-300" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#EAF1F8] mb-4"
            >
              {t('calculator.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#9FB4CC] max-w-2xl mx-auto"
            >
              {t('calculator.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="surface-base py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Input Form */}
            <div className="glass-dark p-6 md:p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#EAF1F8]">{t('calculator.inputs.title')}</h2>

              <div className="space-y-6">
                {/* Number of People */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#EAF1F8] mb-2">
                    <Users className="w-4 h-4" />
                    {t('calculator.inputs.people')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={numberOfPeople}
                    onChange={(e) => {
                      const next = parseInt(e.target.value) || 1
                      setNumberOfPeople(next)
                      setPeakPeople((prev) => Math.max(prev, next))
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-[#EAF1F8] focus:border-white/40 outline-none transition-all"
                  />
                </div>

                {/* Peak People */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#EAF1F8] mb-2">
                    <Users className="w-4 h-4" />
                    {t('calculator.inputs.peoplePeak')}
                  </label>
                  <input
                    type="number"
                    min={numberOfPeople}
                    max="200"
                    value={peakPeople}
                    onChange={(e) => setPeakPeople(Math.max(parseInt(e.target.value) || numberOfPeople, numberOfPeople))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-[#EAF1F8] focus:border-white/40 outline-none transition-all"
                  />
                  <p className="text-xs text-[#9FB4CC] mt-1">{t('calculator.inputs.peoplePeakHint')}</p>
                </div>

                {/* Property Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#EAF1F8] mb-2">
                    <Home className="w-4 h-4" />
                    {t('calculator.inputs.propertyType')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['house', 'business', 'seasonal'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all ${propertyType === type
                          ? 'border-gold-500 bg-gold-500/10 text-gold-400 font-semibold'
                          : 'border-white/20 text-[#9FB4CC] hover:border-white/40'
                          }`}
                      >
                        {type === 'house' && <Home className="w-4 h-4 inline mr-2" />}
                        {type === 'business' && <Building className="w-4 h-4 inline mr-2" />}
                        {type === 'seasonal' && <Calendar className="w-4 h-4 inline mr-2" />}
                        {t(`form.type_options.${type}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Water Usage */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#EAF1F8] mb-2">
                    <Droplet className="w-4 h-4" />
                    {t('calculator.inputs.waterUsage')} (L/person/day)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    step="10"
                    value={waterUsage}
                    onChange={(e) => setWaterUsage(parseInt(e.target.value) || 150)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-[#EAF1F8] focus:border-white/40 outline-none transition-all"
                  />
                  <p className="text-xs text-[#9FB4CC] mt-1">{t('calculator.inputs.waterUsageHint')}</p>
                </div>

                {/* Groundwater Level */}
                <div>
                  <label className="text-sm font-semibold text-[#EAF1F8] mb-2 block">
                    {t('calculator.inputs.groundwater')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setGroundwater('auto')}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${groundwater === 'auto'
                        ? 'border-gold-500 bg-gold-500/10 text-gold-400 font-semibold'
                        : 'border-white/20 text-[#9FB4CC] hover:border-white/40'
                        }`}
                    >
                      <MapPin className="w-4 h-4 inline mr-2" />
                      {t('calculator.inputs.groundwaterAuto')}
                    </button>
                    {(['low', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setGroundwater(level)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all ${groundwater === level
                          ? 'border-gold-500 bg-gold-500/10 text-gold-400 font-semibold'
                          : 'border-white/20 text-[#9FB4CC] hover:border-white/40'
                          }`}
                      >
                        {t(`form.gw_options.${level}`)}
                      </button>
                    ))}
                  </div>
                  {groundwater === 'auto' && (
                    <p className="text-xs text-[#9FB4CC] mt-2">{t('calculator.inputs.groundwaterAutoHint')}</p>
                  )}
                  {selectedAddress && (
                    <p className="text-xs text-aqua-300 mt-2">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {selectedAddress}
                    </p>
                  )}
                </div>

                {/* Calculate Button */}
                <motion.button
                  onClick={calculateSystem}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-gold"
                >
                  {t('calculator.calculate')}
                </motion.button>
              </div>
            </div>

            {/* Map */}
            <div className="glass-dark p-6 md:p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#EAF1F8] flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                {t('calculator.map.title')}
              </h2>

              {selectedAddress && (
                <p className="text-sm text-aqua-300 mb-4 flex items-center gap-1 font-semibold">
                  <MapPin className="w-4 h-4" />
                  {selectedAddress}
                </p>
              )}

              {/* Map Container */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#001A30] h-[320px] sm:h-[420px] md:h-[500px]">
                <div
                  ref={mapContainerRef}
                  id="InAadressDiv"
                  style={{ width: '100%', height: '100%' }}
                />
                {!mapInitialized && (
                  <div className="flex items-center justify-center h-full text-[#9FB4CC]">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500 mx-auto mb-2"></div>
                      <p>{t('calculator.map.loading')}</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-[#9FB4CC] mt-3">{t('calculator.map.hint')}</p>
            </div>
          </div>

          {/* Results */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 max-w-5xl mx-auto px-4"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-[#EAF1F8] text-center">
                {t('calculator.results.title')}
              </h2>

              <div className="grid gap-12">
                {/* Recommended Product */}
                <div className="glass-dark p-5 sm:p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                    <span className="px-5 py-2 rounded-full bg-gold-500 text-ink-950 text-xs font-black uppercase tracking-[0.2em] shadow-xl">
                      {t('calculator.recommended') || 'Soovituslik'}
                    </span>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-aqua-300 mb-4 tracking-tight">
                      {results.recommended.systemName}
                      <span className="text-[#9FB4CC]/60 sm:ml-4 ml-2 font-light text-xl sm:text-4xl md:text-5xl">{results.recommended.product.model}</span>
                    </h3>
                    <p className="text-xl text-[#9FB4CC] leading-relaxed max-w-3xl">
                      {results.recommended.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                      { label: t('calculator.results.capacity'), value: results.recommended.capacity },
                      { label: t('calculator.results.dimensions'), value: results.recommended.dimensions },
                      { label: t('calculator.results.power'), value: results.recommended.powerRequirement },
                      { label: t('calculator.results.material'), value: results.recommended.product.material }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9FB4CC]/60 mb-2">{item.label}</p>
                        <p className="text-xl font-bold text-[#EAF1F8]">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 sm:p-8 md:p-10 rounded-[1.5rem] bg-gradient-to-br from-kingspan-blue via-kingspan-blue to-kingspan-navy text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                      <div className="text-center lg:text-left">
                        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-60 mb-2">{t('calculator.results.priceWithVat')} (24%)</p>
                        <p className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter">
                          {results.recommended.priceWithVat.toLocaleString('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                        </p>
                      </div>
                      <div className="hidden lg:block h-20 w-px bg-white/20" />
                      <div className="text-center lg:text-right">
                        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-60 mb-2">{t('calculator.results.priceWithoutVat')}</p>
                        <p className="text-3xl font-bold opacity-80">
                          {results.recommended.priceWithoutVat.toLocaleString('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-10 border-t border-white/10">
                    <p className="text-xs font-black text-[#9FB4CC]/60 mb-4 uppercase tracking-[0.2em]">{t('calculator.results.features')}</p>
                    <div className="flex flex-wrap gap-2">
                      {results.recommended.features.map((f, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl glass-dark text-[#EAF1F8] text-xs font-bold shadow-sm">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alternative Products */}
                {results.alternatives && results.alternatives.length > 0 && (
                  <div className="space-y-6">
                    {results.alternatives.map((alt, index) => (
                      <div key={`${alt.systemName}-${index}`} className="glass-dark p-5 sm:p-8 md:p-12 rounded-[2rem] opacity-90 transition-all border-dashed hover:opacity-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-8 md:mb-10">
                          <div>
                            <span className="px-4 py-1 rounded-full bg-white/10 text-[#EAF1F8] text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                              {t('calculator.alternative') || 'Soodne alternatiiv'}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-black text-[#EAF1F8]">
                              {alt.systemName}
                              <span className="text-[#9FB4CC]/60 ml-3 font-light">{alt.product.model}</span>
                            </h3>
                          </div>
                          <div className="glass-dark p-4 sm:p-6 rounded-2xl text-right w-full sm:w-auto sm:min-w-[200px]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9FB4CC]/60 mb-2">{t('calculator.results.priceWithVat')} (24%)</p>
                            <p className="text-3xl font-black text-gold-400">
                              {alt.priceWithVat.toLocaleString('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                            </p>
                          </div>
                        </div>

                        <p className="text-lg text-[#9FB4CC] mb-8 italic leading-relaxed max-w-2xl">{alt.description}</p>

                        <div className="flex flex-wrap gap-8">
                          {[
                            { label: t('calculator.results.capacity'), value: alt.capacity },
                            { label: t('calculator.results.dimensions'), value: alt.dimensions },
                            { label: t('calculator.results.material'), value: alt.product.material }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-aqua-300/50" />
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-tighter text-[#9FB4CC]/60">{item.label}</p>
                                <p className="text-sm font-bold text-[#EAF1F8]">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-10 text-center">
                  <p className="text-sm text-[#9FB4CC] mb-8 max-w-2xl mx-auto leading-relaxed">{t('calculator.results.note')}</p>
                  <a
                    href="/#contact"
                    className="btn-gold inline-flex items-center gap-4"
                  >
                    <span className="tracking-widest uppercase text-sm">{t('calculator.results.contact')}</span>
                    <Euro className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
