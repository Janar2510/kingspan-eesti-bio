import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calculator as CalculatorIcon, Users, Droplet, Home, Building, Calendar } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { motion } from 'framer-motion'

interface CalculationResult {
  recommendedSystem: string
  systemDescription: string
  capacity: string
  dimensions: string
  powerRequirement: string
  features: string[]
}

export default function Calculator() {
  const { t } = useTranslation()
  const [numberOfPeople, setNumberOfPeople] = useState<number>(4)
  const [propertyType, setPropertyType] = useState<'house' | 'business' | 'seasonal'>('house')
  const [waterUsage, setWaterUsage] = useState<number>(150)
  const [groundwater, setGroundwater] = useState<'low' | 'high'>('low')
  const [results, setResults] = useState<CalculationResult | null>(null)

  const calculateSystem = () => {
    // Calculate PE (Population Equivalent)
    // Standard: 1 person = 1 PE, but can vary based on water usage
    const pe = Math.ceil((numberOfPeople * waterUsage) / 150)
    
    // Determine recommended system based on PE and requirements
    let recommendedSystem = ''
    let systemDescription = ''
    let capacity = ''
    let dimensions = ''
    let powerRequirement = ''
    let features: string[] = []

    if (pe <= 4) {
      // Small residential
      if (groundwater === 'low' && propertyType !== 'seasonal') {
        recommendedSystem = 'BioDisc'
        systemDescription = t('calculator.systems.biodisc.desc')
        capacity = '4 PE'
        dimensions = 'Ø 2.4m × H 2.1m'
        powerRequirement = '0.37 kW'
        features = [
          t('calculator.features.quiet'),
          t('calculator.features.odourFree'),
          t('calculator.features.lowMaintenance')
        ]
      } else {
        recommendedSystem = 'BioTec Flo'
        systemDescription = t('calculator.systems.biotec.desc')
        capacity = '4 PE'
        dimensions = '2.4m × 1.8m × 2.1m'
        powerRequirement = t('calculator.noPower')
        features = [
          t('calculator.features.noElectricity'),
          t('calculator.features.gravity'),
          t('calculator.features.offGrid')
        ]
      }
    } else if (pe <= 8) {
      recommendedSystem = 'BioDisc'
      systemDescription = t('calculator.systems.biodisc.desc')
      capacity = '8 PE'
      dimensions = 'Ø 2.4m × H 2.4m'
      powerRequirement = '0.37 kW'
      features = [
        t('calculator.features.quiet'),
        t('calculator.features.odourFree'),
        t('calculator.features.lowMaintenance')
      ]
    } else if (pe <= 12) {
      recommendedSystem = 'BioFicient'
      systemDescription = t('calculator.systems.bioficient.desc')
      capacity = '12 PE'
      dimensions = '2.4m × 1.8m × 2.4m'
      powerRequirement = '0.55 kW'
      features = [
        t('calculator.features.energyEfficient'),
        t('calculator.features.automated'),
        t('calculator.features.compact')
      ]
    } else if (pe <= 20) {
      recommendedSystem = 'BioFicient'
      systemDescription = t('calculator.systems.bioficient.desc')
      capacity = '20 PE'
      dimensions = '2.4m × 2.4m × 2.4m'
      powerRequirement = '0.75 kW'
      features = [
        t('calculator.features.energyEfficient'),
        t('calculator.features.automated'),
        t('calculator.features.highEfficiency')
      ]
    } else if (pe <= 50) {
      recommendedSystem = 'BioAir'
      systemDescription = t('calculator.systems.bioair.desc')
      capacity = '50 PE'
      dimensions = '3.0m × 2.4m × 2.4m'
      powerRequirement = '1.5 kW'
      features = [
        t('calculator.features.highEfficiency'),
        t('calculator.features.activatedSludge'),
        t('calculator.features.ipsOption')
      ]
    } else {
      recommendedSystem = 'BioAir'
      systemDescription = t('calculator.systems.bioair.desc')
      capacity = `${pe} PE`
      dimensions = t('calculator.customDimensions')
      powerRequirement = t('calculator.customPower')
      features = [
        t('calculator.features.highEfficiency'),
        t('calculator.features.activatedSludge'),
        t('calculator.features.scalable')
      ]
    }

    setResults({
      recommendedSystem,
      systemDescription,
      capacity,
      dimensions,
      powerRequirement,
      features
    })
  }

  return (
    <div className="text-kingspan-navy min-h-screen bg-kingspan-cloud">
      <SEOHead />
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-kingspan-blue/10 to-transparent">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-kingspan-blue/10 mb-6"
            >
              <CalculatorIcon className="w-8 h-8 md:w-10 md:h-10 text-kingspan-blue" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-kingspan-navy mb-4"
            >
              {t('calculator.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-kingspan-slate max-w-2xl mx-auto"
            >
              {t('calculator.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="card-spotlight card-border p-6 md:p-8 bg-white/70 shadow-card rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('calculator.inputs.title')}</h2>
            
            <div className="space-y-6">
              {/* Number of People */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-kingspan-navy mb-2">
                  <Users className="w-4 h-4" />
                  {t('calculator.inputs.people')}
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-kingspan-navy mb-2">
                  <Home className="w-4 h-4" />
                  {t('calculator.inputs.propertyType')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['house', 'business', 'seasonal'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        propertyType === type
                          ? 'border-kingspan-blue bg-kingspan-blue/10 text-kingspan-blue font-semibold'
                          : 'border-kingspan-cloud hover:border-kingspan-blue/50'
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
                <label className="flex items-center gap-2 text-sm font-semibold text-kingspan-navy mb-2">
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
                  className="w-full px-4 py-3 rounded-xl border border-kingspan-cloud focus:border-kingspan-blue focus:ring-2 focus:ring-kingspan-blue/20 outline-none transition-all"
                />
                <p className="text-xs text-kingspan-slate mt-1">{t('calculator.inputs.waterUsageHint')}</p>
              </div>

              {/* Groundwater Level */}
              <div>
                <label className="text-sm font-semibold text-kingspan-navy mb-2 block">
                  {t('calculator.inputs.groundwater')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['low', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setGroundwater(level)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        groundwater === level
                          ? 'border-kingspan-blue bg-kingspan-blue/10 text-kingspan-blue font-semibold'
                          : 'border-kingspan-cloud hover:border-kingspan-blue/50'
                      }`}
                    >
                      {t(`form.gw_options.${level}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                onClick={calculateSystem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 rounded-xl bg-kingspan-blue text-white font-semibold shadow-card hover:opacity-90 transition-all"
              >
                {t('calculator.calculate')}
              </motion.button>
            </div>
          </div>

          {/* Results */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 card-spotlight card-border p-6 md:p-8 bg-white/70 shadow-card rounded-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-kingspan-blue">
                {t('calculator.results.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-kingspan-blue/5 border border-kingspan-blue/20">
                  <h3 className="text-xl font-bold text-kingspan-blue mb-2">
                    {results.recommendedSystem}
                  </h3>
                  <p className="text-kingspan-slate mb-4">{results.systemDescription}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-semibold text-kingspan-navy mb-1">{t('calculator.results.capacity')}</p>
                      <p className="text-lg">{results.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-kingspan-navy mb-1">{t('calculator.results.dimensions')}</p>
                      <p className="text-lg">{results.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-kingspan-navy mb-1">{t('calculator.results.power')}</p>
                      <p className="text-lg">{results.powerRequirement}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-kingspan-navy mb-1">{t('calculator.results.features')}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {results.features.map((feature, idx) => (
                          <li key={idx} className="text-kingspan-slate">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-kingspan-cloud">
                  <p className="text-sm text-kingspan-slate mb-4">{t('calculator.results.note')}</p>
                  <a
                    href="/#contact"
                    className="inline-block px-6 py-3 rounded-xl bg-kingspan-blue text-white font-semibold hover:opacity-90 transition-all"
                  >
                    {t('calculator.results.contact')}
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
