// ProcessList.js
import React from 'react';
import Process from './Process';

const ProcessList = ({ title, processes, showBlockedTime, showResult, showElapsedTime, showRemainingTime, showServiceTime}) => {
    return (
      <div>
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Operación</th>

              {showResult && <th>Resultado</th>}

              <th>Estado</th>

              {showElapsedTime && <th>Tiempo Transcurrido</th>}

              {showServiceTime && <th>Tiempo de Ejecución</th>}
              


              {showRemainingTime && <th>Tiempo Restante</th>}
              {showBlockedTime && <th>Tiempo de Bloqueo</th>}
              <th>Tiempo Máximo Estimado</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <Process key={process.id} {...process} 
              showBlockedTime={showBlockedTime} 
              showResult={showResult} 
              showElapsedTime={showElapsedTime} 
              showRemainingTime={showRemainingTime} 
              showServiceTime={showServiceTime} 
              />
            ))} 
          </tbody>
        </table>
      </div>
    );
};
  

export default ProcessList;