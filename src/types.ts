export interface Mono {
  coefficient: number;
  variables: {
    variable: string;
    degree: number;
  }[];
}

export type Poly = Mono[];
