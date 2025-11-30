import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    // Await the params object (Next.js 15+ requires this)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Slug parameter is required and must be a valid string' 
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens, no special characters)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean().exec();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          success: false,
          message: `Event with slug '${slug}' not found` 
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        success: true,
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (use proper logging service in production)
    console.error('Error fetching event by slug:', error);

    // Handle database connection errors
    if (error instanceof Error && error.message.includes('MONGODB_URI')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database configuration error',
        },
        { status: 500 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while fetching the event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
