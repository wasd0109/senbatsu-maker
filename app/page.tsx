'use client';

import MemberSidebar from '@/components/members/MemberSidebar';
import SenbatsuMain from '@/components/senbatsu/SenbatsuMain';
import sakuraLogo from "@/assets/groups/sakurazaka.png"
import nogiLogo from "@/assets/groups/nogizaka.png"
import hinataLogo from "@/assets/groups/hinatazaka.svg"
import { StaticImageData } from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { SenbatsuStyleProvider } from '@/contexts/SenbatsuStyleContext';

// API response types
interface ApiResponse {
  success: boolean;
  data: {
    groups: { [key: string]: { name: string; color: string } };
    members: { [key: string]: Member[] };
  };
  error?: string;
  message?: string;
}

const groupMetadata: { [key: string]: { logo: StaticImageData; color: string } } = {
  "櫻坂46": { logo: sakuraLogo, color: "#f19db5" },
  "乃木坂46": { logo: nogiLogo, color: "#812990" },
  "日向坂46": { logo: hinataLogo, color: "#7cc7e8" },
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


export default function Home() {
  const [numRows, setNumRows] = useState(3);
  const [columnsPerRow, setColumnsPerRow] = useState<{ [key: number]: number }>({ 0: 5, 1: 6, 2: 9 });
  const [memberData, setMemberData] = useState<{ [key: string]: Member[] }>({});
  const [senbatsuMembers, setSenbatsuMembers] = useState<SenbatsuGrid>(initializeSenbatsuGrid(numRows, columnsPerRow));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to add a member to the next available slot
  const addMemberToSenbatsu = useCallback((member: Member) => {
    // Find the first available slot
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const numColumns = columnsPerRow[rowIndex] || 0;
      for (let colIndex = 0; colIndex < numColumns; colIndex++) {
        if (!senbatsuMembers[rowIndex]?.[colIndex]) {
          // Found an empty slot
          setSenbatsuMembers(prev => ({
            ...prev,
            [rowIndex]: {
              ...prev[rowIndex],
              [colIndex]: member
            }
          }));
          return;
        }
      }
    }
  }, [numRows, columnsPerRow, senbatsuMembers]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch('/api/members');
        const data: ApiResponse = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch members');
        }

        setMemberData(data.data.members);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError(err instanceof Error ? err.message : 'Failed to load members');
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading members...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <div className="text-xl font-bold">Error</div>
          <div className="mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <SenbatsuStyleProvider>
      <div className="flex h-screen relative">
        <MemberSidebar
          memberData={memberData}
          groupMetadata={groupMetadata}
          numRows={numRows}
          setNumRows={setNumRows}
          columnsPerRow={columnsPerRow}
          setColumnsPerRow={setColumnsPerRow}
          onAddMember={addMemberToSenbatsu}
        />
        <SenbatsuMain
          numRows={numRows}
          columnsPerRow={columnsPerRow}
          senbatsuMembers={senbatsuMembers}
          setSenbatsuMembers={setSenbatsuMembers}
        />
      </div>
    </SenbatsuStyleProvider>
  );
}
