import { create } from 'zustand'

const useProductStore = create((set) => ({
	products: [],

	setProducts: pr => set(state => ({
		products: pr
	}))
}))

export { useProductStore }
