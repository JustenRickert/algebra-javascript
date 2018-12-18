import { uniq } from "lodash";
import { Mono, Poly } from "./types";

// prettier-ignore
export const operatorMap = {
  Divide:   "/" as "/",
  Multiply: "*" as "*",
  Add:      "+" as "+",
  Subtract: "-" as "-"
};

export const isPoly = function(o: any): o is Poly {
  return "coefficient" in o && "variables" in o;
};

const isSameTypeMonomial = (m1: Mono, m2: Mono) =>
  m1.variables.every(({ variable: v1, degree: d1 }) =>
    m2.variables.some(({ variable: v2, degree: d2 }) => v1 === v2 && d1 === d2)
  );

const addSameTypeMonomial = (m1: Mono, m2: Mono): Mono => ({
  coefficient: m1.coefficient + m2.coefficient,
  variables: m1.variables
});

const sumOfDegreeComparator = (m1: Mono, m2: Mono) =>
  m1.variables.reduce((sum, v) => sum + v.degree, 0) >=
  m2.variables.reduce((sum, v) => sum + v.degree, 0)
    ? -1
    : 1;

const maxDegreeComparator = (m1: Mono, m2: Mono) =>
  Math.max(...m1.variables.map(v => v.degree)) >=
  Math.max(...m2.variables.map(v => v.degree))
    ? -1
    : 1;

const alphabeticalComparator = <V extends { degree: number; variable: string }>(
  v1: V,
  v2: V
) => (v1.variable > v2.variable ? 1 : -1);

const timesMonomials = (m1: Mono, m2: Mono): Mono => ({
  coefficient: m1.coefficient * m2.coefficient,
  variables: uniq([
    ...m1.variables.map(v => v.variable),
    ...m2.variables.map(v => v.variable)
  ])
    .reduce<Mono["variables"]>((mono, variable) => {
      const v1 = m1.variables.find(v => v.variable === variable);
      const v2 = m2.variables.find(v => v.variable === variable);
      if (!v1 && !v2) throw new Error(`Impossible monomial ${m1} ${m2}`);
      return [
        ...mono,
        {
          variable,
          degree:
            v1 && v2
              ? v1.degree + v2.degree
              : v1 && !v2
                ? v1.degree
                : !v1 && v2 ? v2.degree : (undefined as never)
        }
      ];
    }, [])
    .sort(alphabeticalComparator)
});

export const simplifyPolynomial = (poly: Poly) =>
  poly
    .reduce<Poly>((poly, mono) => {
      const index = poly.findIndex(m => isSameTypeMonomial(m, mono));
      return index === -1
        ? [...poly, mono]
        : poly.map((m, i) => (index === i ? addSameTypeMonomial(mono, m) : m));
    }, [])
    .sort(sumOfDegreeComparator);

export const timesPolynomials = (p1: Poly, p2: Poly) =>
  p1.reduce<Poly>(
    (polynomial, m1) => [
      ...polynomial,
      ...p2.map(m2 => timesMonomials(m1, m2))
    ],
    []
  );

export const productOfPolynomials = (...polys: Poly[]) =>
  polys
    .slice(1)
    .reduce<Poly>(
      (productPoly, poly) => timesPolynomials(productPoly, poly),
      polys[0]
    );
