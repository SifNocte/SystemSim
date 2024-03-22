import React, { useState, useEffect } from 'react';
import ProcessList from './ProcessList';
import ControlHandler from './ControlHandler';
import StartupScreen from './StartupScreen';
import { addNewProcess, updateProcessStates } from './ProcessManagement';
import CollapsibleProcessList from './CollapsibleProcessList';
import Sidebar from './Sidebar'; 
import Controls from './Controls';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [processes, setProcesses] = useState({
    new: [],
    ready: [],
    running: [],
    blocked: [],
    finished: []
  });
  const [processId, setProcessId] = useState(0);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showNoMoreProcessesMessage, setShowNoMoreProcessesMessage] = useState(false);
  const { handleControl } = ControlHandler({ setProcesses, setPaused, processes });

  useEffect(() => {
    if (!isStarted || paused) return;

    const hasActiveProcesses = processes.new.length > 0 || processes.ready.length > 0 || processes.blocked.length > 0 || processes.running.length > 0;

    if (!hasActiveProcesses) {
      setShowNoMoreProcessesMessage(true); // Actualiza el estado para mostrar el mensaje
      setIsSidebarOpen(true);
      return;
    } else {
      setShowNoMoreProcessesMessage(false); // Asegúrate de que el mensaje se oculta si hay procesos activos
    }




    
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1); // Incrementa el tiempo
      updateProcessStates(processes, time, setProcesses);
  }, 1000);

  return () => clearInterval(timer);
  
}, [isStarted, paused, processes, time]);





const handleStart = (numProcesses) => {
  setIsStarted(true);
  const currentTime = time; // Captura el tiempo actual justo antes de crear los procesos
  for (let i = 0; i < numProcesses; i++) {
    addNewProcess(processId + i, setProcessId, setProcesses, currentTime);
  }
};


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  if (!isStarted) {
    return <StartupScreen onStart={handleStart} />;
  }

return (
  
  <div>
      

    <div class="vhs-overlay"></div>
    <h1>FCFS Scheduling Simulator</h1>
    <Controls onControl={handleControl} />
    <CollapsibleProcessList title="Nuevos" 
    processes={processes.new} 
    currentTime={time}showResult={false}       
    showElapsedTime={false} 
    showRemainingTime={false}/>
    <ProcessList
      title="Listos"
      processes={processes.ready} // Pasa directamente, sin modificar
      showElapsedTime={true}
      showRemainingTime={true}
      showResult={false}
      showServiceTime={true} 
    />
    <ProcessList
      title="Ejecución"
      processes={processes.running} // Pasa directamente, sin modificar
      showElapsedTime={true}
      showRemainingTime={true}
      showResult={false} 
      showServiceTime={true} 
    />
    <ProcessList
      title="Bloqueados"
      processes={processes.blocked} // Pasa directamente, sin modificar
      showElapsedTime={true}
      showRemainingTime={true}
      showBlockedTime={true}
      showResult={false} 
      showServiceTime={true} 
    />
    <CollapsibleProcessList title="Terminados" 
      processes={processes.finished}
      showResult={true}
      showElapsedTime={true} 
      showRemainingTime={true}
      showServiceTime={true} 
    /> {/* Usar CollapsibleProcessList aquí */}
    <div>Reloj Global: {time} segundos</div>
    {showNoMoreProcessesMessage && <div>No hay más procesos activos.</div>}
    <Sidebar isOpen={isSidebarOpen} processes={processes.finished} toggleSidebar={toggleSidebar} />
  </div>
);
};

export default App;