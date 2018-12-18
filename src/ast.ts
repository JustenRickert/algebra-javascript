import { uniq } from "lodash";

import { Poly, Operation } from "./types";
import { isPoly, isOperation } from "./util";

// const astMultiplyPolyPoly = function(p1: Poly, p2: Poly) {
//   return {
//     coefficient: p1.coefficient * p2.coefficient,
//     variables: uniq([
//       ...p1.variables.map(v => v.variable),
//       ...p2.variables.map(v => v.variable)
//     ]).reduce<Poly["variables"]>((acc, v) => {
//       const p1Degree = p1.variables.find(variable => variable.variable === v);
//       const p2Degree = p2.variables.find(variable => variable.variable === v);
//       return [
//         ...acc,
//         {
//           variable: v,
//           degree:
//             (p1Degree ? p1Degree.degree : 0) + (p2Degree ? p2Degree.degree : 0)
//         }
//       ];
//     }, [])
//   };
// };

// const astMultiplyOperationPoly = function(p1: Operation, p2: Poly) {
//   const { lhs: lhs1, rhs: rhs1, op: op1 } = p1;
//   const polyLhs1P2 = isPoly(lhs1) ? astMultiplyPolyPoly(lhs1, p2) : undefined;
//   const polyRhs1P2 = isPoly(rhs1) ? astMultiplyPolyPoly(rhs1, p2) : undefined;
//   return {
//     op: op1,
//     lhs: polyLhs1P2!,
//     rhs: polyRhs1P2!
//   };
// };

// const astMultiplyOperationOperation = function(p1: Operation, p2: Operation) {
//   const { lhs: lhsP1, rhs: rhsP1, op: op1 } = p1;
//   const { lhs: lhsP2, rhs: rhsP2, op: op2 } = p2;
//   if (isPoly(lhsP1) && isPoly(lhsP2)) {
//   }
// };

// const astMultiply = function(op: Operation) {
//   const { lhs, rhs } = op;
//   if (isPoly(lhs) && isPoly(rhs)) {
//     return astMultiplyPolyPoly(lhs, rhs);
//   }
//   if (isOperation(lhs) && isPoly(rhs)) {
//     return astMultiplyOperationPoly(lhs, rhs);
//   }
//   if (isPoly(lhs) && isOperation(rhs)) {
//     return astMultiplyOperationPoly(rhs, lhs);
//   }
//   if (isOperation(lhs) && isOperation(rhs)) {
//     return astMultiplyOperationOperation(lhs, rhs);
//   }
//   throw new Error("Condition not hit for astMultiply");
// };

// export const astSimplify = function(op: Operation) {
//   if (op.op === "Multiply") {
//     return astMultiply(op);
//   }
// };
