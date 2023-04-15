export interface IWine {
  id: number,
  type: string,
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

export interface IWineSingleApiOpt {
  value: string, 
  start?: number,
  sort?: string, 
  order?: string,
}

export interface IWineMultiApiOpt {
  values: string[] | [],
}