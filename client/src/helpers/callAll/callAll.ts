/**
 * Return a function that call all the functions
 * @param fcts all the function
 */
export const callAll = (...fcts: any) => (...args: any) =>
  fcts.forEach((fct: any) => fct && fct(...args))
