import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Gobierno } from './components/sections/Gobierno'
import { Madurez } from './components/sections/Madurez'
import { Stock } from './components/sections/Stock'
import { Accesos } from './components/sections/Accesos'
import { VPNZeroTrust } from './components/sections/VPNZeroTrust'
import { OnboardingSinStock } from './components/sections/OnboardingSinStock'
import { Riesgos } from './components/sections/Riesgos'
import { Offboarding } from './components/sections/Offboarding'
import { Roadmap } from './components/sections/Roadmap'
import { IA } from './components/sections/IA'
import { Entregables } from './components/sections/Entregables'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Gobierno />
        <Madurez />
        <Stock />
        <Accesos />
        <VPNZeroTrust />
        <OnboardingSinStock />
        <Riesgos />
        <Offboarding />
        <Roadmap />
        <IA />
        <Entregables />
      </main>
      <Footer />
    </>
  )
}
