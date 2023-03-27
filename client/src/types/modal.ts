export interface IModal {
  children: React.ReactNode,
  isOpen?: boolean,
  width?: string,
  height?: string,
  xAxis?: "left" | "center" | "right",
  yAxis?: "bottom" | "center" | "top",
}

export interface IPosition {
  width: string,
  height: string,
  marginLeft: string | number,
  marginRight: string | number,
  marginTop: string | number,
  marginBottom: string | number,
}