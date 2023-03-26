export interface IWine {
  id: number,
  winery: string,
  wine: string,
  image:string,
  price: number
}

export interface IWineType {
  id: number,
  label: string,
  type: string,
  src: string,
  alt: string
}

export interface IWineApiOpt {
  value: string, 
  start?: number,
  limit?: number, 
  sort?: string, 
  order?: string,
}