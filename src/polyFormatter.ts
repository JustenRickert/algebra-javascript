import { orderBy } from "lodash";

import { operatorMap, isPoly, isOperation } from "./util";
import { Poly, Operation } from "./types";

const formatCoefficient = function(coeffiecient: number) {
  return coeffiecient === 1 ? "" : coeffiecient;
};

const formatDegree = function(degree: number) {
  return degree === 1 ? "" : `^${degree}`;
};

export const formatPolyAst = function(polyAst: Operation | Poly): string {
  if (isOperation(polyAst)) {
    const { op, lhs, rhs } = polyAst;
    return `(${formatPolyAst(lhs)} ${operatorMap[op]} ${formatPolyAst(rhs)})`;
  }
  if (isPoly(polyAst)) {
    const { coefficient, variables } = polyAst;
    return [
      formatCoefficient(coefficient),
      orderBy(variables, "variable").reduce(
        (acc, { variable, degree }) =>
          `${acc}${variable}${formatDegree(degree)}`,
        ""
      )
    ].join("");
  }
  throw new Error("formatPoly did not hit a valid condition");
};
