'use client';

import MemberSidebar from '@/components/members/MemberSidebar';
import SenbatsuMain from '@/components/senbatsu/SenbatsuMain';
import sakuraLogo from "@/assets/groups/sakurazaka.png"
import nogiLogo from "@/assets/groups/nogizaka.png"
import hinataLogo from "@/assets/groups/hinatazaka.svg"
import { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
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


export default function Home() {
  const [numRows, setNumRows] = useState(3);
  const [columnsPerRow, setColumnsPerRow] = useState<{ [key: number]: number }>({ 1: 5, 2: 6, 3: 9 });
  const [memberData, setMemberData] = useState<{ [key: string]: Member[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        />
        <SenbatsuMain numRows={numRows} columnsPerRow={columnsPerRow} />
      </div>
    </SenbatsuStyleProvider>
  );
}
