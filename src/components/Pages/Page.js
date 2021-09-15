import TechRadar from '@Organisms/TechRadar';
import './Page.css';

const COLORS = [
  ['#282C34', '#2D313A', '#2B2F37', '#2A2E36'],
  ['#353A44', '#323741', '#373C47', '#363B46'],
  ['#3C414D', '#3F4451', '#414754', '#3F4451'],
  ['#4A5261', '#454C5A', '#484F5E', '#495160'],
  ['#525A6A', '#4F5767', '#545C6D', '#535B6C'],
  ['#596274', '#5C6577', '#5E677A', '#5C6577'],
];

const SECTIONS = [
  {
    id: 1,
    name: 'Section A',
    description: 'This is a Section',
  },
  {
    id: 2,
    name: 'Section B',
    description: 'This is a Section',
  },
  {
    id: 3,
    name: 'Section C',
    description: 'This is a Section',
  },
  {
    id: 4,
    name: 'Section D',
    description: 'This is a Section',
  },
  {
    id: 5,
    name: 'Section E',
    description: 'This is a Section',
  },
  {
    id: 6,
    name: 'Section E',
    description: 'This is a Section',
  }
];

const RINGS = [
  {
    id: 1,
    name: 'Adopt',
    description: 'High confidence, low risk, multiple projects',
  },
  {
    id: 2,
    name: 'Trial',
    description: 'Medium risk, some projects',
  },
  {
    id: 3,
    name: 'Assess',
    description: 'Promising, high risk, unproven, prototype'
  },
  {
    id: 4,
    name: 'Hold',
    description: 'Not recommended, not for new projects, can still be continued'
  },
  {
    id: 5,
    name: 'Lose',
    description: 'Not recommended, not for new projects, have to be replaced soon'
  },
];

const ITEMS = [
  { id: 1, name: 'Item 1', description: 'Nice', sectionId: 1, ringId: 1, prevRingId: 2 },
  { id: 2, name: 'Item 2', description: 'Nice', sectionId: 1, ringId: 2, prevRingId: 3 },
  { id: 3, name: 'Item 3', description: 'Nice', sectionId: 1, ringId: 3, prevRingId: null },
  { id: 4, name: 'Item 4', description: 'Nice', sectionId: 1, ringId: 4, prevRingId: 3 },
  { id: 5, name: 'Item 5', description: 'Nice', sectionId: 1, ringId: 5, prevRingId: 2 },
  { id: 100, name: 'Item 1b', description: 'Nice', sectionId: 1, ringId: 5, prevRingId: 2 },
  { id: 6, name: 'Item 1', description: 'Nice', sectionId: 2, ringId: 1, prevRingId: 2 },
  { id: 7, name: 'Item 2', description: 'Nice', sectionId: 2, ringId: 2, prevRingId: 3 },
  { id: 8, name: 'Item 3', description: 'Nice', sectionId: 2, ringId: 3, prevRingId: null },
  { id: 9, name: 'Item 4', description: 'Nice', sectionId: 2, ringId: 4, prevRingId: 3 },
  { id: 10, name: 'Item 5', description: 'Nice', sectionId: 2, ringId: 5, prevRingId: 2 },
  { id: 11, name: 'Item 1', description: 'Nice', sectionId: 3, ringId: 1, prevRingId: 2 },
  { id: 12, name: 'Item 2', description: 'Nice', sectionId: 3, ringId: 2, prevRingId: 3 },
  { id: 13, name: 'Item 3', description: 'Nice', sectionId: 3, ringId: 3, prevRingId: null },
  { id: 14, name: 'Item 4', description: 'Nice', sectionId: 3, ringId: 4, prevRingId: 3 },
  { id: 15, name: 'Item 5', description: 'Nice', sectionId: 3, ringId: 5, prevRingId: 2 },
  { id: 16, name: 'Item 1', description: 'Nice', sectionId: 4, ringId: 1, prevRingId: 2 },
  { id: 17, name: 'Item 2', description: 'Nice', sectionId: 4, ringId: 2, prevRingId: 3 },
  { id: 18, name: 'Item 3', description: 'Nice', sectionId: 4, ringId: 3, prevRingId: null },
  { id: 19, name: 'Item 4', description: 'Nice', sectionId: 4, ringId: 4, prevRingId: 3 },
  { id: 20, name: 'Item 5', description: 'Nice', sectionId: 4, ringId: 5, prevRingId: 2 },
  { id: 21, name: 'Item 1', description: 'Nice', sectionId: 5, ringId: 1, prevRingId: 2 },
  { id: 22, name: 'Item 2', description: 'Nice', sectionId: 5, ringId: 2, prevRingId: 3 },
  { id: 23, name: 'Item 3', description: 'Nice', sectionId: 5, ringId: 3, prevRingId: null },
  { id: 24, name: 'Item 4', description: 'Nice', sectionId: 5, ringId: 4, prevRingId: 3 },
  { id: 25, name: 'Item 5', description: 'Nice', sectionId: 5, ringId: 5, prevRingId: 2 },
];

function Page() {
  return (
    <div className="Page">
      <TechRadar 
        sections={SECTIONS} 
        rings={RINGS} 
        items={ITEMS} 
        colors={COLORS} />
    </div>
  );
}

export default Page;
