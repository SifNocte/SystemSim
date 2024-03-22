import React, { useState, useEffect } from 'react';

const Controls = ({ onControl }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleKeyPress = (e) => {
    const { key } = e;
    const validKeys = ['e', 'E', 'w', 'W', 'p', 'P', 'c', 'C'];
    if (validKeys.includes(key)) {
      onControl(key.toUpperCase());
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    // Función de limpieza para remover el event listener
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar y desmontar el componente

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      {isPopupVisible && (
        <div className="controls-popup">
          <p>Controles:</p>
          <ul>
            <li><strong>E</strong>: Interrupción por E/S (Estado Bloqueado)</li>
            <li><strong>W</strong>: Error (Terminar Proceso)</li>
            <li><strong>P</strong>: Pausa</li>
            <li><strong>C</strong>: Continuar</li>
          </ul>
          <button onClick={handleClosePopup}>Cerrar</button>
        </div>
      )}
    </>
  );
};

export default Controls;
