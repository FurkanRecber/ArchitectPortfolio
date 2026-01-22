import type { Project } from './types';

export const CATEGORIES = ['All', 'Residential', 'Commercial', 'Cultural', 'Landscape', 'Interior'];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vertex Tower',
    location: 'New York, NY',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    year: '2023',
    className: 'md:col-span-1 md:row-span-2',
    description: 'A study in transparency and light, the Vertex Headquarters aims to dissolve the barrier between the workspace and the surrounding boreal forest. The structure utilizes a minimal steel frame to support expansive glass curtains, allowing natural light to penetrate deep into the office floor plates while maintaining high thermal efficiency. The interior organization follows a gradient of privacy, from the bustling public atrium on the ground floor to the secluded focus zones on the upper levels. Natural materials—local granite, oak timber, and raw concrete—anchor the building to its site, creating a tactile contrast to the sleek exterior glazing.',
    client: 'Vertex Group',
    area: '2,500 sqm',
    status: 'Completed',
    team: 'Elena K., Mark T.',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop'
    ],
    plans: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=1974&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'The Glass House',
    location: 'Kyoto, Japan',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1974&auto=format&fit=crop',
    year: '2022',
    className: 'md:col-span-1 md:row-span-1',
    description: 'A minimalist retreat nestled in the hills of Kyoto, designed to frame the changing seasons. The Glass House blurs the lines between indoor and outdoor living, using traditional Japanese joinery techniques combined with modern glazing technology.',
    client: 'Private Client',
    area: '450 sqm',
    status: 'Completed',
    team: 'Sato H., Kenji M.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
    ],
    plans: [
      'https://images.unsplash.com/photo-1635326444826-0aa32e04eb32?q=80&w=1972&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'Nordic Museum',
    location: 'Oslo, Norway',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1516051662668-f3d91c53d5a4?q=80&w=1974&auto=format&fit=crop',
    year: '2024',
    className: 'md:col-span-1 md:row-span-1',
    description: 'Dedicated to preserving the maritime history of the region, the Nordic Maritime Museum is designed as a series of abstract interconnected volumes that evoke the form of glaciers and ships. The facade is clad in weathered zinc, which will patina over time to match the gray hues of the Oslo fjord.',
    client: 'Ministry of Culture',
    area: '12,000 sqm',
    status: 'Under Construction',
    team: 'Lars O., Ingrid B.',
    gallery: [
      'https://images.unsplash.com/photo-1507643179173-442f85429131?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555696958-c5049b866f6f?q=80&w=1974&auto=format&fit=crop'
    ],
    plans: []
  },
  {
    id: '4',
    title: 'Desert Oasis',
    location: 'Palm Springs, CA',
    category: 'Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=2088&auto=format&fit=crop',
    year: '2021',
    className: 'md:col-span-2 md:row-span-1',
    description: 'A landscape intervention that reintroduces native flora to a previously arid plot, creating a sustainable microclimate around a central water feature using recycled gray water.',
    client: 'City of Palm Springs',
    area: '5,000 sqm',
    status: 'Completed',
    team: 'Sarah J., Tom R.',
    gallery: ['https://images.unsplash.com/photo-1558450106-81216b25101a?q=80&w=2070&auto=format&fit=crop'],
    plans: []
  },
  {
    id: '5',
    title: 'Nexus Hub',
    location: 'Berlin, Germany',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    year: '2023',
    className: 'md:col-span-1 md:row-span-2',
    description: 'A co-working space designed for the post-pandemic era, prioritizing flexibility, air quality, and social interaction zones while maintaining acoustic privacy.',
    client: 'Nexus Global',
    area: '1,800 sqm',
    status: 'Completed',
    team: 'Hans G.',
    gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop'],
    plans: []
  },
  {
    id: '6',
    title: 'Villa Blanc',
    location: 'Santorini, Greece',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    year: '2022',
    className: 'md:col-span-1 md:row-span-1',
    description: 'A modern interpretation of Cycladic architecture, Villa Blanc features whitewashed geometric volumes that cascade down the cliffside, maximizing views of the Aegean Sea.',
    client: 'Private Client',
    area: '300 sqm',
    status: 'Completed',
    team: 'Maria P.',
    gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'],
    plans: []
  },
  {
    id: '7',
    title: 'The Void',
    location: 'Copenhagen, Denmark',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    className: 'md:col-span-1 md:row-span-1',
    description: 'An experimental installation exploring the concept of negative space in urban density.',
    client: 'Arts Council',
    area: 'N/A',
    status: 'Temporary Installation',
    team: 'Group X',
    gallery: [],
    plans: []
  },
  {
    id: '8',
    title: 'Urban Forest',
    location: 'Milan, Italy',
    category: 'Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1596236561196-821731633513?q=80&w=1000&auto=format&fit=crop',
    year: '2022',
    className: 'md:col-span-1 md:row-span-1',
    description: 'Vertical forestation project integrating vegetation into the facade of a residential high-rise.',
    client: 'Milano Developers',
    area: '15,000 sqm',
    status: 'Completed',
    team: 'Marco R.',
    gallery: [],
    plans: []
  },
  {
    id: '9',
    title: 'Azure Loft',
    location: 'Dubai, UAE',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2074&auto=format&fit=crop',
    year: '2023',
    className: 'md:col-span-2 md:row-span-1',
    description: 'Luxury penthouse interior design focused on panoramic views and bespoke furniture.',
    client: 'Private Client',
    area: '600 sqm',
    status: 'Completed',
    team: 'Ahmed S.',
    gallery: [],
    plans: []
  },
];