export type ProductItemType = {
  id: string
  name: string
  variants?: ProductVariantItem[]
  image?: string
  price: number
}
export type ProductVariantItem = {
  price: number
  id: string
}