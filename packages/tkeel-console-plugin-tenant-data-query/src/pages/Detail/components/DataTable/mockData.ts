type MockData = {
  time: string;
  value: Record<string, unknown>;
}[];

const mockData: MockData = [
  {
    time: '1646142590000',
    value: {
      abcd: 5.9,
      avg: 8.1,
      max: 8.7,
      ttt: 4.7,
    },
  },
  {
    time: '1646142592000',
    value: {
      abcd: 4,
      avg: 8.1,
      max: 1.8,
      ttt: 2.5,
    },
  },
  {
    time: '1646142594000',
    value: {
      abcd: 1.1,
      avg: 5.6,
      max: 0,
      ttt: 9.4,
    },
  },
  {
    time: '1646142596000',
    value: {
      abcd: 7.4,
      avg: 6.2,
      max: 8.9,
      ttt: 2.8,
    },
  },
  {
    time: '1646142598000',
    value: {
      abcd: 0.6,
      avg: 1.1,
      max: 4.5,
      ttt: 3.7,
    },
  },
  {
    time: '1646142600000',
    value: {
      abcd: 5.8,
      avg: 9.5,
      max: 6.6,
      ttt: 2.8,
    },
  },
  {
    time: '1646142602000',
    value: {
      abcd: 8.8,
      avg: 4.7,
      max: 4.7,
      ttt: 8.7,
    },
  },
  {
    time: '1646142604000',
    value: {
      abcd: 0.8,
      avg: 9,
      max: 1.5,
      ttt: 4.1,
    },
  },
  {
    time: '1646142606000',
    value: {
      abcd: 5.6,
      avg: 8.7,
      max: 3.1,
      ttt: 2.9,
    },
  },
  {
    time: '1646142608000',
    value: {
      abcd: 2.6,
      avg: 3.7,
      max: 3.1,
      ttt: 8.5,
    },
  },
];

export default mockData;
