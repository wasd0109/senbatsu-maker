import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Member {
  name: string;
  hiragana?: string;
  group: string;
  generation?: string;
  graduated?: boolean;
  imageSrc?: string;
}

export async function GET() {
  try {
    // Read the JSON file from the data directory
    const filePath = path.join(process.cwd(), 'data', 'members.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Sort members by hiragana within each group
    Object.keys(data.members).forEach((groupName) => {
      data.members[groupName].sort((a: Member, b: Member) => {
        const aSort = a.hiragana || a.name;
        const bSort = b.hiragana || b.name;
        return aSort.localeCompare(bSort, 'ja');
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        groups: data.groups,
        members: data.members,
      },
    });
  } catch (error) {
    console.error('Error reading member data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load member data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
