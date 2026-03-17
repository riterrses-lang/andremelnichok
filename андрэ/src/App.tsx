import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Trophy, Info, Camera } from 'lucide-react';

const tabs = [
  { id: 'location', title: 'местоположение мельника', shortTitle: 'Место', icon: MapPin, content: 'он живет где то на химаше в городе саранске точно место не помню' },
  { id: 'number', title: 'намбер мельника', shortTitle: 'Номер', icon: Phone, content: '79648417542 обязательно звонить в 3 часа ночи он это любит' },
  { id: 'achievements', title: 'достижения мельника', shortTitle: 'Успехи', icon: Trophy, content: 'раньше ходил в вымпел щя ходит купаться в басик и то не всегда дрочит по 8 раз в день вообщем скатился' },
  { id: 'conclusion', title: 'вывод', shortTitle: 'Итог', icon: Info, content: 'мельник или так называемый Андрей мельников прошивающий на химаше в городе саранск такой себе тип' },
  { id: 'photos', title: 'фото мельника', shortTitle: 'Фото', icon: Camera, content: 'photos' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  // Fallback to first tab to prevent any potential crashes if state gets out of sync
  const activeData = tabs.find(t => t.id === activeTab) || tabs[0];
  const ActiveIcon = activeData.icon;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#fffdfa] to-[#ffe4e1] text-gray-800 font-sans selection:bg-pink-300 selection:text-white overflow-hidden flex flex-col pb-20 md:pb-0">
      <header className="w-full py-3 sm:py-6 px-4 sm:px-8 flex items-center justify-center sm:justify-start bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink-100/50">
        <div className="max-w-5xl w-full mx-auto flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white shadow-sm flex-shrink-0 border-2 border-pink-200 p-0.5 sm:p-1">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Логотип" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-lg sm:text-4xl font-bold text-pink-500 tracking-tight drop-shadow-sm leading-tight">докс эндрю мельника</h1>
        </div>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto p-3 sm:p-8 flex flex-col md:flex-row gap-4 sm:gap-8 items-stretch">
        <nav className="hidden md:flex w-64 flex-shrink-0 flex-col gap-2" role="tablist" aria-orientation="vertical">
          {tabs.map((tab) => (
            <button 
              key={`desktop-${tab.id}`} 
              role="tab" 
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)} 
              className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ease-out ${activeTab === tab.id ? 'text-pink-600 font-semibold shadow-md bg-white/80 backdrop-blur-sm scale-105' : 'text-gray-500 hover:bg-pink-100/50 hover:text-pink-400'}`}
            >
              {activeTab === tab.id && <motion.div layoutId="desktop-active" className="absolute inset-0 bg-white rounded-2xl shadow-sm border border-pink-100" initial={false} transition={{ type: 'spring', stiffness: 400, damping: 30 }} style={{ zIndex: -1 }} />}
              <tab.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'}`} />
              <span className="text-sm sm:text-base leading-tight">{tab.title}</span>
            </button>
          ))}
        </nav>

        <div className="flex-grow w-full bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg border border-pink-100 overflow-hidden relative flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeData.id} 
              id={`panel-${activeData.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 15, scale: 0.98 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -15, scale: 0.98 }} 
              transition={{ duration: 0.3 }} 
              className="absolute inset-0 p-5 sm:p-10 overflow-y-auto flex flex-col"
            >
              <h2 className="text-xl sm:text-3xl font-bold text-pink-500 mb-5 sm:mb-6 flex items-center gap-3">
                <ActiveIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                {activeData.title}
              </h2>
              {activeData.id === 'photos' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-4">
                  {[1, 2].map(num => (
                    <motion.div key={num} whileHover={{ scale: 1.02, rotate: num === 1 ? -1 : 1 }} className="rounded-2xl overflow-hidden shadow-md border-4 border-white bg-pink-50 aspect-[4/5] sm:aspect-square">
                      <img src={`${import.meta.env.BASE_URL}photo${num}.jpg`} alt={`Фото ${num}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/60 rounded-2xl p-5 sm:p-8 shadow-sm border border-pink-100 flex-grow">
                  <p className="text-base sm:text-xl leading-relaxed text-gray-700 font-medium">{activeData.content}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-pink-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 pb-[env(safe-area-inset-bottom,0.5rem)] pt-1" role="tablist" aria-orientation="horizontal">
        <div className="flex justify-around items-center px-1 py-1">
          {tabs.map((tab) => (
            <button 
              key={`mobile-${tab.id}`} 
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)} 
              className={`relative flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'text-pink-600' : 'text-gray-400 hover:text-pink-400'}`}
            >
              {activeTab === tab.id && <motion.div layoutId="mobile-active" className="absolute inset-0 bg-pink-100/60 rounded-xl" initial={false} transition={{ type: 'spring', stiffness: 400, damping: 30 }} style={{ zIndex: -1 }} />}
              <tab.icon className={`w-6 h-6 mb-1 ${activeTab === tab.id ? 'scale-110' : 'scale-100'} transition-transform duration-300`} />
              <span className="text-[10px] font-semibold leading-none truncate w-full text-center px-1">{tab.shortTitle}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-200/30 blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-300/20 blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
    </div>
  );
}
