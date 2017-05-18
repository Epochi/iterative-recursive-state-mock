import mockData from '../mockData/mock.json'
export const CATEGORIES_FETCH = 'CATEGORIES_FETCH'
export const CATEGORIES_FLAT_GET = 'CATEGORIES_FLAT_GET'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export const categoriesGet = () => ({
  type: CATEGORIES_FETCH,
  data: mockData
})

export const categoriesFlatGet = () => ({
  type: CATEGORIES_FLAT_GET
})

export const addCategory = (path,newCategory) => ({
  type: ADD_CATEGORY,
  data: {path,newCategory}
})

