export const evaluateOperation = (operation) => {
    const [operand1, operator, operand2] = operation.split(' ');
    switch (operator) {
      case '+': return parseFloat(operand1) + parseFloat(operand2);
      case '-': return parseFloat(operand1) - parseFloat(operand2);
      case '*': return parseFloat(operand1) * parseFloat(operand2);
      case '/': return parseFloat(operand1) / parseFloat(operand2);
      case '%': return parseFloat(operand1) % parseFloat(operand2);
      default: return 'Invalid Operation';
    }
  };