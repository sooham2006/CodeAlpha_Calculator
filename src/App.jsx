import React, { useState, useEffect, useCallback } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputNumber = useCallback((num) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = useCallback(() => {
    if (operation && previousValue !== null) {
      performOperation('=');
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  }, [operation, previousValue, performOperation]);

  const handleKeyPress = useCallback((event) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      inputNumber(key);
    } else if (key === '.') {
      inputDot();
    } else if (key === '+') {
      performOperation('+');
    } else if (key === '-') {
      performOperation('-');
    } else if (key === '*') {
      performOperation('×');
    } else if (key === '/') {
      event.preventDefault();
      performOperation('÷');
    } else if (key === 'Enter' || key === '=') {
      handleEquals();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
    }
  }, [display, inputNumber, inputDot, performOperation, handleEquals, clear]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const formatDisplay = (value) => {
    if (value.length > 10) {
      const num = parseFloat(value);
      if (num > 999999999 || num < -999999999) {
        return num.toExponential(3);
      }
      return num.toFixed(3);
    }
    return value;
  };

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'default' 
  }) => {
    const baseClasses = 'h-16 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg';
    const variants = {
      default: 'bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-gray-400/50',
      operation: 'bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/50',
      equals: 'bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/50',
      clear: 'bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/50'
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="text-white mr-3" size={32} />
            <h1 className="text-3xl font-bold text-white">Calculator</h1>
          </div>
          <p className="text-gray-300 text-sm">Use keyboard or click buttons</p>
        </div>

        {/* Calculator */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
          {/* Display */}
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-600">
            <div className="text-right">
              <div className="text-gray-400 text-sm mb-1">
                {operation && previousValue !== null 
                  ? `${previousValue} ${operation}`
                  : ''}
              </div>
              <div className="text-white text-4xl font-mono font-bold overflow-hidden">
                {formatDisplay(display)}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button onClick={clear} variant="clear" className="col-span-2">
              Clear
            </Button>
            <Button onClick={() => {
              if (display.length > 1) {
                setDisplay(display.slice(0, -1));
              } else {
                setDisplay('0');
              }
            }} variant="operation">
              ⌫
            </Button>
            <Button onClick={() => performOperation('÷')} variant="operation">
              ÷
            </Button>

            {/* Row 2 */}
            <Button onClick={() => inputNumber('7')}>7</Button>
            <Button onClick={() => inputNumber('8')}>8</Button>
            <Button onClick={() => inputNumber('9')}>9</Button>
            <Button onClick={() => performOperation('×')} variant="operation">
              ×
            </Button>

            {/* Row 3 */}
            <Button onClick={() => inputNumber('4')}>4</Button>
            <Button onClick={() => inputNumber('5')}>5</Button>
            <Button onClick={() => inputNumber('6')}>6</Button>
            <Button onClick={() => performOperation('-')} variant="operation">
              −
            </Button>

            {/* Row 4 */}
            <Button onClick={() => inputNumber('1')}>1</Button>
            <Button onClick={() => inputNumber('2')}>2</Button>
            <Button onClick={() => inputNumber('3')}>3</Button>
            <Button onClick={() => performOperation('+')} variant="operation">
              +
            </Button>

            {/* Row 5 */}
            <Button onClick={() => inputNumber('0')} className="col-span-2">
              0
            </Button>
            <Button onClick={inputDot}>.</Button>
            <Button onClick={handleEquals} variant="equals">
              =
            </Button>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <h3 className="text-white text-sm font-semibold mb-3">Recent Calculations</h3>
            <div className="space-y-1">
              {history.map((entry, index) => (
                <div key={index} className="text-gray-300 text-xs font-mono">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts */}
        <div className="mt-6 text-center">
          <div className="text-gray-400 text-xs">
            <p className="mb-1">Keyboard Shortcuts:</p>
            <p>Numbers: 0-9 | Operations: +, -, *, / | Enter: = | Esc: Clear</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;