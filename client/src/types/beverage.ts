export interface IWine {
  id: number,
  winery: string,
  wine: string,
  image:string,
  price: number
}

export interface IBeverageType {
  id: number,
  label: string,
  type: string,
  src: string,
  alt: string
}