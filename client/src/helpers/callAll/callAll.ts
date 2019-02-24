/**
 * Return a function that call all the functions
 * @param fcts all the function
 */
export const callAll = (...fcts: any) => async (...args: any) => {
  for (const fct of fcts) {
    await fct(...args)
  }
}
