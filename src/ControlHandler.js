
const ControlHandler = ({ setProcesses, setPaused, processes, time }) => {
    const handleControl = command => {
        switch (command) {
          case 'E':
            setProcesses(prevState => {
              // Verificar si hay procesos en ejecución
              if (prevState.running.length > 0) {
                const runningProcess = prevState.running[0]; // Obtener el proceso en ejecución
          
                // Cambiar el estado a 'Blocked' y establecer el tiempo de bloqueo
                const blockedProcess = { ...runningProcess, state: 'Blocked', blockedTime: 8 };
          
                // Actualizar listas: eliminar de 'running' y añadir a 'blocked'
                const updatedRunning = prevState.running.slice(1); // Elimina el primer elemento
                const updatedBlocked = [...prevState.blocked, blockedProcess];
          
                return { ...prevState, running: updatedRunning, blocked: updatedBlocked };
              }
              return prevState; // Retornar estado actual si no hay procesos en ejecución
            });
            break;
          
            case 'W':
              setProcesses(prevState => {
                if (prevState.running.length > 0) {
                  const erroredProcess = {
                    ...prevState.running[0],
                    state: 'Finished',
                    result: 'Error',
                    
                  };
        
                  return {
                    ...prevState,
                    running: [],
                    finished: [...prevState.finished, erroredProcess]
                  };
                }
                return prevState;
              });
              break;
            
            
            
          case 'P':
            setPaused(true);
            break;
          case 'C':
            setPaused(false);
            break;
          default:
            console.log('Comando no reconocido');
        }
      };

  return { handleControl }; // Retorna el manejador para ser usado en el componente padre
};

export default ControlHandler;