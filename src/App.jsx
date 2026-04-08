import Home from './Home'
import Navbar from './Navbar'
import ThreeBackground from './ThreeBackground'

function App() {
  return (
    <div className="relative w-full bg-slate-900 text-white overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      <Home />
    </div>
  )
}

export default App
