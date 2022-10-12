import create from "zustand";

const useInstrumentStore = create((set) => (
    {
        CSV_DATA: [],
        query: '',
        symbol: 'SBIN',


        setQuery: (str) => {
            set((state) => ({ query: str }))
        },
        setSymbol: (str) => {
            set((state) => ({ symbol: str }))
        },

    }
))

export default useInstrumentStore;