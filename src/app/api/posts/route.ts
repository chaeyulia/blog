import { NextRequest, NextResponse } from 'next/server';
import { getPostsList } from '@/utils/post';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get('prefix') || undefined;
  
  try {
    const posts = await getPostsList(prefix);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API: Posts 조회 실패:', error);
    return NextResponse.json([], { status: 500 });
  }
}