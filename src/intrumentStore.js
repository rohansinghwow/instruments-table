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
                dates: [],
                setQuery: (str) => {
                    set((state) => ({ query: str }))
                },

                getSymbol: async (url) => {
                    const response = await fetch(url + get().symbol)
                    const data = await response.json()

                    set({ symbolData: data.payload[get().symbol] })
                    const validArr = get().symbolData.map(obj => new Date(obj.valid_till + '+00:00').toLocaleTimeString())


                    set({ leastValidTime: validArr[0], dates: validArr })

                },
                setSymbol: (str) => {
                    set((state) => ({ symbol: str }))
                },
                doSorting: (order) => {
                    if (order === "ASC") {
                        const res = get().symbolData.sort(function (a, b) { return new Date(a.time) - new Date(b.time) })
                        set({ symbolData: res })


                    }

                    if (order === "DSC") {
                        const res = get().symbolData.sort(function (a, b) { return new Date(b.time) - new Date(a.time) })
                        set({ symbolData: res })


                    }
                }


            }
        )))

export default useInstrumentStore;