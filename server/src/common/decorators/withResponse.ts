export function withResponse(channel: string) {
  return (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    // save a reference to the original method
    const originalMethod = descriptor.value

    // NOTE: Do not use arrow syntax here
    descriptor.value = async function(...args: any[]) {
      const client = args[0]

      // return the result of the original method
      const response = await originalMethod.apply(this, args)
      client.emit(channel, response)
    }

    return descriptor
  }
}
