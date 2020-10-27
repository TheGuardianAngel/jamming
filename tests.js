let tracks = [
  { id: 4, name: 'KYS', artist: 'SAME', album: 'SD' },
  { id: 5, name: 'Asd', artist: 'SAME', album: 'FASF' },
  { id: 6, name: 'Fgh', artist: 'SAME', album: 'NASFA' },
];

let searchRes = [];
searchRes.push(...tracks);
console.log(searchRes);
console.log(process.memoryUsage().heapUsed);
