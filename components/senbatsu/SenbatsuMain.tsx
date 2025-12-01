import { useEffect, useState, useRef } from 'react';
import SenbatsuField from './SenbatsuField';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { toJpeg } from 'html-to-image';
import Image from 'next/image';


const isLocation = (obj: unknown): obj is { rowIndex: number; colIndex: number } => {
  return typeof obj === 'object' && obj !== null && 'rowIndex' in obj && 'colIndex' in obj && typeof obj.rowIndex === 'number' && typeof obj.colIndex === 'number';
}

const isMember = (obj: unknown): obj is Member => {
  return typeof obj === 'object' && obj !== null && 'name' in obj && typeof obj.name === 'string';
}

// Initialize senbatsu grid with empty slots
const initializeSenbatsuGrid = (rows: number, columnsPerRow: { [key: number]: number }): SenbatsuGrid => {
  const grid: SenbatsuGrid = {};
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    grid[rowIndex] = {};
    const numColumns = columnsPerRow[rows - rowIndex] || 0;
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      // Initialize with empty object - will be undefined until a member is placed
      // We don't set anything here, just ensure the row exists
    }
  }
  return grid;
}

interface SenbatsuMainProps {
  numRows: number;
  columnsPerRow: { [key: number]: number };
}

function SenbatsuMain({ numRows, columnsPerRow }: SenbatsuMainProps) {
  const [senbatsuMembers, setSenbatsuMembers] = useState<SenbatsuGrid>(() =>
    initializeSenbatsuGrid(3, { 1: 3, 2: 7, 3: 7 })
  );
  const [prevConfig, setPrevConfig] = useState<{ numRows: number; columnsPerRow: { [key: number]: number } }>({
    numRows: 3,
    columnsPerRow: { 1: 3, 2: 7, 3: 7 }
  });
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  // Adjust grid when configuration changes, preserving existing members
  if (prevConfig.numRows !== numRows || JSON.stringify(prevConfig.columnsPerRow) !== JSON.stringify(columnsPerRow)) {
    setSenbatsuMembers(prevState => {
      const newState: SenbatsuGrid = {};

      // Initialize all rows based on new configuration
      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        newState[rowIndex] = {};
        const numColumns = columnsPerRow[numRows - rowIndex] || 0;

        for (let colIndex = 0; colIndex < numColumns; colIndex++) {
          // Preserve existing member if it exists at this position
          if (prevState[rowIndex]?.[colIndex]) {
            newState[rowIndex][colIndex] = prevState[rowIndex][colIndex];
          }
        }
      }

      return newState;
    });

    setPrevConfig({ numRows, columnsPerRow });
  }

  // Calculate scale based on viewport and field dimensions
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !fieldRef.current) return;

      const container = containerRef.current;
      const field = fieldRef.current;

      // Get container dimensions (available space)
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Get field natural dimensions
      const fieldWidth = field.scrollWidth;
      const fieldHeight = field.scrollHeight;

      // Calculate scale to fit both width and height with some padding
      const scaleX = (containerWidth * 0.95) / fieldWidth;
      const scaleY = (containerHeight * 0.95) / fieldHeight;

      // Use the smaller scale to ensure it fits in both dimensions
      const newScale = Math.min(scaleX, scaleY, 1); // Cap at 1 to avoid scaling up

      setScale(newScale);
    };

    // Calculate on mount and when dependencies change
    calculateScale();

    // Recalculate on window resize
    window.addEventListener('resize', calculateScale);

    // Use setTimeout to recalculate after render completes
    const timeoutId = setTimeout(calculateScale, 100);

    return () => {
      window.removeEventListener('resize', calculateScale);
      clearTimeout(timeoutId);
    };
  }, [numRows, columnsPerRow, senbatsuMembers]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destinationTarget = location.current.dropTargets[0];
        const sourceTarget = location.initial.dropTargets[0];
        if (!destinationTarget) {
          // if dropped outside of any drop targets
          return;
        }
        const destinationLocation = destinationTarget.data.location;
        const destinationMember = destinationTarget.data.member;
        const sourceMember = source.data.member;

        if (!isLocation(destinationLocation) || !isMember(sourceMember)) {
          return;
        }

        setSenbatsuMembers(prevState => {
          const newState = { ...prevState };
          newState[destinationLocation.rowIndex][destinationLocation.colIndex] = sourceMember;

          const sourceLocation = sourceTarget?.data.location;

          if (isLocation(sourceLocation)) {
            if (destinationMember && isMember(destinationMember)) {
              newState[sourceLocation.rowIndex][sourceLocation.colIndex] = destinationMember;
            } else {
              newState[sourceLocation.rowIndex][sourceLocation.colIndex] = undefined;
            }
          }
          return newState;
        })
      },
    });

  }, [senbatsuMembers]);

  const onSaveClick = async () => {
    if (fieldRef.current) {
      const dataUrl = await toJpeg(fieldRef.current, { quality: 1, backgroundColor: '#ffffff' })
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = "senbatsu.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <main ref={containerRef}
      className="flex-1 flex flex-col items-center justify-center overflow-hidden">
      <div
        ref={fieldRef}
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out',
          overflow: 'visible',
        }}
      >
        <Image
          fill
          src={"/images/backgrounds/nogizaka.webp"}
          alt='background image'
          className='-z-50 object-cover'
        />
        <div className='p-4'>
          <SenbatsuField senbatsuMembers={senbatsuMembers} numRows={numRows} columnsPerRow={columnsPerRow} />
        </div>
      </div>
      <button onClick={onSaveClick} className='mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200'>
        Save as image
      </button>
    </main>
  );
}

export default SenbatsuMain;
