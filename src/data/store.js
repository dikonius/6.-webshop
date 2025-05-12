import { create } from 'zustand'

const useProductStore = create((set) => ({
	products: [],

	setProducts: (pr) =>
		set((state) => ({
			products: Array.isArray(pr) ? pr : [], // Ensure pr is an array
		}))
}))

export { useProductStore }