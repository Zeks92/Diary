import news from '~/assets/json/news.json'

export const state = () => ({
  places: [
    {
      id: 0,
      address: 'Dobre Vode',
    },
    {
      id: 1,
      address: 'Sabor trubaca u Guci',
    },
    {
      id: 2,
      address: 'Zlatibor',
    },
    {
      id: 3,
      address: 'Sutomore'
    },
    {
      id: 4,
      address: 'Etno selo Stanisici'
    },
    {
      id: 5,
      address: 'Drinska regata'
    },
    {
      id: 6,
      address: 'Budapest'
    },
    {
      id: 7,
      address: 'Vienna'
    }
  ],
  news,
})
