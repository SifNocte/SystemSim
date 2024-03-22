// CollapsibleProcessList.js
import React, { useState } from 'react';
import ProcessList from './ProcessList';

const CollapsibleProcessList = ({ title, processes, showResult, showElapsedTime, showRemainingTime  }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si la lista está abierta o cerrada

  const toggleOpen = () => {
    setIsOpen(!isOpen); // Cambia el estado de isOpen cada vez que se hace clic
  };

  return (
    <div>
      <h2 onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {title} ({processes.length}) {isOpen ? '▲' : '▼'} {/* Muestra el número de procesos y el indicador de desplegable */}
      </h2>
      {isOpen && <ProcessList title="" 
              processes={processes}
              showResult={showResult}
              showElapsedTime={showElapsedTime}
              showRemainingTime={showRemainingTime} 
              />}
    </div>
  );
};

export default CollapsibleProcessList;
