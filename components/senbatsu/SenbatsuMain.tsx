import { useEffect, useState } from 'react';
import SenbatsuField from './SenbatsuField';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';


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

function SenbatsuMain() {
  const [senbatsuMembers, setSenbatsuMembers] = useState<SenbatsuGrid>(() =>
    initializeSenbatsuGrid(3, { 1: 3, 2: 7, 3: 7 })
  );

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

  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-4xl">
        <SenbatsuField senbatsuMembers={senbatsuMembers} />
      </div>
    </main>
  );
}

export default SenbatsuMain;
