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
  id:number,
  winery: string,
  wine: string,
  rating: {
    average: string,
    reviews: string
  },
  location: string,
  image:string,
}

export interface ICoffee {
  id:number,
  title: string,
  description: string,
  image: string,
  ingredients: [string]
}

export interface IBeverageType {
  id: number,
  label: string,
  type: string,
  src: string,
  alt: string
}