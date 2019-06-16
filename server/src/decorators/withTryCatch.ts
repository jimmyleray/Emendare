export function withTryCatch(
  target: object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  // save a reference to the original method
  const originalMethod = descriptor.value

  // NOTE: Do not use arrow syntax here
  descriptor.value = function(...args: any[]) {
    try {
      // return the result of the original method
      return originalMethod.apply(this, args)
    } catch (message) {
      console.error(message)
      return {
        error: { code: 500, message }
      }
    }
  }

  return descriptor
}
