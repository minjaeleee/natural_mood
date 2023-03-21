export interface IBeer {
  id: number,
  image: string,
  name: string,
  price: string,
  rating: {
    average:number,
    reviews:number
  }
}

export interface IWine {
  winery: string,
  wine: string,
  rating: {
    average: string,
    reviews: string
  },
  location: string,
  image:string,
  id:number
}

export interface IBeverageType {
  id: number,
  label: string,
  src: string,
  alt: string
}