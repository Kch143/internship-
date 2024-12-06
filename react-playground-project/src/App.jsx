import React, { useState } from 'react';
import './App.css';

function App() {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill(false)));
  const [clickedOrder, setClickedOrder] = useState([]);

  const handleClick = (row, col) => {
    if (clickedOrder.length === 9) return;

    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? true : cell
      )
    );
    setMatrix(newMatrix);
    setClickedOrder([...clickedOrder, { row, col }]);

    if (clickedOrder.length === 8) {
      setTimeout(() => {
        const finalMatrix = matrix.map((r) =>
          r.map(() => false)
        );
        clickedOrder.forEach(({ row, col }, index) => {
          setTimeout(() => {
            finalMatrix[row][col] = 'orange';
            setMatrix([...finalMatrix]);
          }, index * 100);
        });
        setTimeout(() => {
          setMatrix(finalMatrix.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
              rowIndex === row && colIndex === col ? 'orange' : cell
            )
          ));
        }, clickedOrder.length * 100);
      }, 300);
    }
  };

  return (
    <div className="App">
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                style={{ backgroundColor: cell === true ? 'green' : cell === 'orange' ? 'orange' : 'white' }}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
