import createStore from 'zustand'


import { configurePersist } from 'zustand-persist'
const { persist, purge } = configurePersist({
    storage: localStorage
})


const useInstrumentStore = createStore(
    persist(
        {
            key: 'root',

        },

        (set, get) => (
            {
                CSV_DATA: [],
                query: '',
                symbol: 'SBIN', //default
                symbolData: [],
                leastValidTime: 10000000000, //default

                setQuery: (str) => {
                    set((state) => ({ query: str }))
                },

                getSymbol: async (url) => {
                    const response = await fetch(url + get().symbol)
                    const data = await response.json()

                    set({ symbolData: data.payload[get().symbol] })
                    const validArr = []
                    await get().symbolData.map(item => validArr.push((Date.now() - new Date(item.valid_till)) / 1000))
                    console.log(validArr[0])

                    set({ leastValidTime: validArr[0] })

                },
                setSymbol: (str) => {
                    set((state) => ({ symbol: str }))
                },

                getTimeLeft: () => {
                    const response = get().symbolData




                },


            }
        )))

export default useInstrumentStore;