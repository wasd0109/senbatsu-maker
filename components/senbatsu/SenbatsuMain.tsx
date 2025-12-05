import { useEffect, useState, useRef, useCallback } from 'react';
import SenbatsuField from './SenbatsuField';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { toJpeg } from 'html-to-image';
import Image from 'next/image';
import FieldAdjustmentConfig from './FieldAdjustmentConfig';
import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';


const isLocation = (obj: unknown): obj is { rowIndex: number; colIndex: number } => {
  return typeof obj === 'object' && obj !== null && 'rowIndex' in obj && 'colIndex' in obj && typeof obj.rowIndex === 'number' && typeof obj.colIndex === 'number';
}

const isMember = (obj: unknown): obj is Member => {
  return typeof obj === 'object' && obj !== null && 'name' in obj && typeof obj.name === 'string';
}
interface SenbatsuMainProps {
  numRows: number;
  setNumRows: (rows: number) => void;
  columnsPerRow: { [key: number]: number };
  setColumnsPerRow: (cols: { [key: number]: number }) => void;
  senbatsuMembers: SenbatsuGrid;
  setSenbatsuMembers: React.Dispatch<React.SetStateAction<SenbatsuGrid>>;
}

function SenbatsuMain({ numRows, setNumRows, columnsPerRow, setColumnsPerRow, senbatsuMembers, setSenbatsuMembers }: SenbatsuMainProps) {
  const { selectedStyle } = useSenbatsuStyle();
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  // Get background image properties from context
  const bgOffset = selectedStyle.backgroundImageOffset || { x: 0, y: 0 };
  const bgScale = selectedStyle.backgroundImageScale || 1;

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

  }, [senbatsuMembers, setSenbatsuMembers]);

  const onSaveClick = useCallback(async () => {
    if (fieldRef.current) {
      const dataUrl = await toJpeg(fieldRef.current, { quality: 1, backgroundColor: '#ffffff' })
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = "senbatsu.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [fieldRef]);

  return (
    <main ref={containerRef}
      className="flex-1 flex flex-col items-center justify-around overflow-scroll">
      <div
        ref={fieldRef}
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out',
          overflow: 'visible',
          marginTop: "20px"
        }}
      >
        {/* Background Image - now INSIDE the scaled container */}
        <div className="absolute inset-0 flex justify-center items-center -z-50 "
          style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px) scale(${bgScale})` }}
        >
          <Image
            fill
            src={"/images/backgrounds/nogizaka.png"}
            alt='background image'
            className='object-cover'
          />
        </div>

        {/* SenbatsuField */}
        <div className='h-full flex justify-center items-end'>
          <SenbatsuField senbatsuMembers={senbatsuMembers} numRows={numRows} columnsPerRow={columnsPerRow} />
        </div>
      </div>

      {/* Field Adjustment Configuration */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        <FieldAdjustmentConfig
          numRows={numRows}
          setNumRows={setNumRows}
          columnsPerRow={columnsPerRow}
          setColumnsPerRow={setColumnsPerRow}
        />
      </div>
    </main>
  );
}

export default SenbatsuMain;
