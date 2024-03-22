import { evaluateOperation } from './utils';

export const addNewProcess = (processId, setProcessId, setProcesses, currentTime) => {
    const operations = ['+', '-', '*', '/', '%'];
    const operationIndex = Math.floor(Math.random() * operations.length);
    const operand1 = Math.floor(Math.random() * 100) + 1;
    const operand2 = Math.floor(Math.random() * 100) + 1;
    const adjustedOperand2 = operations[operationIndex] === '/' || operations[operationIndex] === '%' ? Math.max(operand2, 1) : operand2;
    const tme = parseFloat((Math.random() * (18 - 5 + 1) + 5).toFixed(0));

    const newProcess = {
        id: processId + 1,
        tme,
        estimatedTime: tme,
        operation: `${operand1} ${operations[operationIndex]} ${adjustedOperand2}`,
        state: 'New',
        result: undefined,
        arrivalTime: currentTime,
        serviceTime: 0,
        waitingTime: 0,
        finishedTime: 0,
        responseTime: 0,
        elapsedTime: 0,
        remainingTime: tme,
        blockedTime: undefined
    };

    console.log("Proceso añadido, arrivalTime:", newProcess.arrivalTime);

    // Actualiza processId y el estado de processes en un solo paso
    setProcessId(processId + 1);
    setProcesses(prevProcesses => ({
        ...prevProcesses,
        new: [...prevProcesses.new, newProcess]
    }));
};


export const updateProcessStates = (processes, time, setProcesses) => {
    const updatedProcesses = { ...processes };


    updatedProcesses.new.forEach(process => {
        process.arrivalTime = time; // Actualiza el tiempo de llegada mientras el proceso está en "nuevo"
    });


    ['new' ,'ready'].forEach(state => {
        updatedProcesses[state].forEach(process => {
            process.responseTime += 1;
            

        });
    });

    ['ready', 'blocked', 'running'].forEach(state => {
        updatedProcesses[state].forEach(process => {
            process.elapsedTime += 1;  // Incrementa el tiempo transcurrido para todos los procesos activos
            process.finishedTime += 1;
        });
    });

    // Actualizar tiempo de bloqueo
    updatedProcesses.blocked.forEach(process => {
        if (process.blockedTime > 0) {
            process.blockedTime -= 1;
        }
    });

    // Mover procesos de bloqueados a listos si su tiempo de bloqueo ha terminado
    updatedProcesses.blocked = updatedProcesses.blocked.filter(process => {
        if (process.blockedTime <= 0) {
            process.state = 'Ready';
            process.blockedTime = undefined; // Limpia el tiempo de bloqueo
            updatedProcesses.ready.push(process); // Añade el proceso a la cola de listos
            return false; // Elimina el proceso de la cola de bloqueados
        }
        return true; // Mantén el proceso en la cola de bloqueados si aún está bloqueado
    });

    // Mover procesos de nuevo a listo si es necesario
    while (updatedProcesses.new.length > 0 && updatedProcesses.ready.length + updatedProcesses.blocked.length + updatedProcesses.running.length < 4) {
        const processToMove = updatedProcesses.new.shift();
        processToMove.state = 'Ready';
        updatedProcesses.ready.push({
            ...processToMove,
            readyTime: time,
        });
    }

    // Mover proceso de listo a ejecución si es necesario
    if (updatedProcesses.running.length === 0 && updatedProcesses.ready.length > 0) {
        const nextProcess = updatedProcesses.ready.shift();
        nextProcess.state = 'Running';
        updatedProcesses.running.push(nextProcess);
    }

    // Actualizar el proceso en ejecución
    if (updatedProcesses.running.length > 0) {
        const runningProcess = updatedProcesses.running[0];
        runningProcess.serviceTime += 1;
        runningProcess.remainingTime = Math.max(0, runningProcess.tme - runningProcess.serviceTime); // Asegura que remainingTime no sea negativo


        if (runningProcess.remainingTime <= 0) {
            runningProcess.state = 'Finished';
            const operationResult = evaluateOperation(runningProcess.operation);
            runningProcess.result = parseFloat(operationResult.toFixed(2));
            updatedProcesses.finished.push(runningProcess);
            updatedProcesses.running.shift();
        }
    }

    // Actualizar tiempos de espera para procesos en listo
    updatedProcesses.ready.forEach(process => process.waitingTime += 1);

    setProcesses(updatedProcesses);
};