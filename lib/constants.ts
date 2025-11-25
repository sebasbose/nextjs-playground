export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string; // e.g., '2025-11-07'
    time: string; // e.g., '9:00 AM'
}

export const events: EventItem[] = [
    {
        image: '/images/event1.png',
        title: 'React Summit 2024',
        slug: 'react-summit-2024',
        location: 'Amsterdam, Netherlands',
        date: 'June 14-18, 2024',
        time: '9:00 AM - 6:00 PM'
    },
    {
        image: '/images/event2.png',
        title: 'Ethereum DevCon',
        slug: 'ethereum-devcon-2024',
        location: 'Bangkok, Thailand',
        date: 'November 12-15, 2024',
        time: '10:00 AM - 7:00 PM'
    },
    {
        image: '/images/event3.png',
        title: 'JSConf US',
        slug: 'jsconf-us-2024',
        location: 'San Francisco, CA',
        date: 'August 22-24, 2024',
        time: '9:30 AM - 5:30 PM'
    },
    {
        image: '/images/event4.png',
        title: 'Next.js Conf',
        slug: 'nextjs-conf-2024',
        location: 'Virtual & SF',
        date: 'October 24, 2024',
        time: '9:00 AM PST'
    },
    {
        image: '/images/event5.png',
        title: 'TechCrunch Disrupt Hackathon',
        slug: 'techcrunch-hackathon-2024',
        location: 'San Francisco, CA',
        date: 'September 30 - October 2, 2024',
        time: '24 Hours'
    },
    {
        image: '/images/event6.png',
        title: 'Web Summit',
        slug: 'web-summit-2024',
        location: 'Lisbon, Portugal',
        date: 'November 11-14, 2024',
        time: '10:00 AM - 8:00 PM'
    },
    {
        image: '/images/event-full.png',
        title: 'AI Dev Summit',
        slug: 'ai-dev-summit-2024',
        location: 'New York, NY',
        date: 'December 5-7, 2024',
        time: '9:00 AM - 6:00 PM'
    },
];