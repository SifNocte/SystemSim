import React from 'react';

const Sidebar = ({ isOpen, processes, toggleSidebar }) => {
  return (
    <div
      style={{
        position: 'fixed',
        right: isOpen ? '0' : '-800px',
        top: '0',
        width: '800px',
        height: '100%',
        background: 'white',
        boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.5)',
        transition: 'right 0.3s',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          left: '-40px',
          top: '20px',
          width: '40px',
          height: '40px',
          background: 'lightgray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
        }}
      >
        {isOpen ? '<' : '>'}
      </div>

      {/* Contenedor de desplazamiento para el contenido */}
      <div style={{ overflowY: 'auto', height: 'calc(100% - 40px)' }}>
        <h2>Procesos Terminados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiempo de Llegada</th>
              <th>Tiempo de Finalización</th>
              <th>Tiempo de Retorno</th>
              <th>Tiempo de Respuesta</th>
              <th>Tiempo de Espera</th>
              <th>Tiempo de Servicio</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(process => (
              <tr key={process.id}>
                <td>{process.id}</td>
                <td>{process.arrivalTime.toFixed(2)}</td>
                <td>{process.finishedTime.toFixed(2)}</td>
                <td>
                  {(process.finishedTime - process.arrivalTime).toFixed(2)}
                  {process.result === 'Error' && <div>(Terminó en error)</div>}
                </td>
                <td>{process.responseTime.toFixed(2)}</td>
                <td>{process.waitingTime.toFixed(2)}</td>
                <td>{process.serviceTime.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sidebar;
