export const buses = Array.from({ length: 101 }, (_, i) => ({
    id: i + 1,
    number: `Bus #${i + 1}`,
    seats: Math.floor(Math.random() * 45),
    fuel: Math.floor(Math.random() * 100),
    speed: Math.floor(Math.random() * 60),
    location: ['Admin Block', 'Main Campus', 'South Campus'][i % 3],
    status: i % 4 === 0 ? 'Stopped' : 'Running',
  }));
  