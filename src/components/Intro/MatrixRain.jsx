import { useMemo } from "react";
import "./MatrixRain.css";

const COLUMN_COUNT = 70;
const ROW_COUNT = 50;

export default function MatrixRain() {
  const columns = useMemo(
    () =>
      Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => ({
        id: columnIndex,
        delay: ((columnIndex * 37) % 50) / 10,
        duration: 4 + ((columnIndex * 17) % 50) / 10,
        bits: Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
          (columnIndex * 13 + rowIndex * 7 + columnIndex * rowIndex) % 2 === 0 ? "1" : "0",
        ),
      })),
    [],
  );

  return (
    <div className="matrix">
      {columns.map((column) => (
        <div
          key={column.id}
          className="column"
          style={{
            left: `${column.id * 1.5}%`,
            animationDelay: `${column.delay}s`,
            animationDuration: `${column.duration}s`,
          }}
        >
          {column.bits.map((bit, index) => (
            <span key={index}>{bit}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
