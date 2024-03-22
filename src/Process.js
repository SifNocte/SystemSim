import './styles.css';

import React from 'react';
import PropTypes from 'prop-types'; // Asegúrate de haber instalado el paquete 'prop-types'

const Process = ({ 
    id, 
    operation, 
    state, 
    result, 
    elapsedTime, 
    remainingTime, 
    tme, 
    blockedTime, 
    showBlockedTime, 
    showResult, 
    showElapsedTime, 
    showRemainingTime, 
    showServiceTime,
    serviceTime  
}) => {
    return (
      <tr>
        <td>{id}</td>
        <td>{operation}</td>
        {showResult && (
  <td>
    {state === 'Finished' ? (
      <strong className={result !== 'Error' && result !== 'N/A' ? 'text-transition-animation' : ''}>
        {result}
      </strong>
    ) : (
      'N/A'
    )}
  </td>
)}

        <td className={`${state.toLowerCase()}-animation`}>
  {state !== 'Running' ? (
    state
  ) : (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      Running <span className="turning-animation"></span>
    </div>
  )}
</td>




        {showElapsedTime && <td>{elapsedTime}</td>}

        {showServiceTime && <td>{serviceTime}</td>}

        {showRemainingTime && <td>{remainingTime}</td>}
        {showBlockedTime && <td>{blockedTime || 'N/A'}</td>}
        <td>{tme}</td>
      </tr>
    );
};
  

// PropTypes para validar las props y establecer valores predeterminados
Process.propTypes = {
  id: PropTypes.number.isRequired,
  operation: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  result: PropTypes.string,
  elapsedTime: PropTypes.number,
  remainingTime: PropTypes.number,
  tme: PropTypes.number.isRequired,
  showBlockedTime: PropTypes.bool, // Indica si se debe mostrar el tiempo bloqueado
  blockedTime: PropTypes.number // Tiempo bloqueado, relevante solo si showBlockedTime es true
};

// Valores predeterminados para props que pueden no ser proporcionadas
Process.defaultProps = {
  result: 'N/A',
  elapsedTime: 0,
  remainingTime: 0,
  showBlockedTime: false,
  blockedTime: 0
};

export default Process;
