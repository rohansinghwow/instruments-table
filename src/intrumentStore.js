import create from "zustand";

const useInstrumentStore = create((set) => (
    {
        CSV_DATA: [],
        query: '',



        setQuery: (str) => {
            set((state) => ({ query: str }))
        },
        clearQuery: () => {
            set(() => {
                query: ''
            })
        }

    }
))

export default useInstrumentStore;