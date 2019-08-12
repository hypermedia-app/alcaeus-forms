type Literal = {
  '@value': string
  '@type'?: string
}

export function create(type?: string) {
  return {
    wrap(value: unknown) {
      const valueIsNotLiteral = typeof value === 'object'
      const typeIsXsdString = type === 'http://www.w3.org/2001/XMLSchema#string'
      const valueIsEmpty = value === null || value === ''

      const valueIsExplicitString = typeIsXsdString && typeof value === 'string'
      const valueIsImplicitString = typeof value === 'string' && !type

      if (valueIsNotLiteral || valueIsExplicitString || valueIsImplicitString) {
        return value
      }

      if (valueIsEmpty && !typeIsXsdString) {
        return null
      }

      const literal: Literal = {
        '@value': value + '',
      }

      if (type) {
        literal['@type'] = type
      }

      return literal
    },
    unwrap(value: { '@value': unknown } | string) {
      if (typeof value === 'object') {
        if ('@value' in value) {
          return value['@value']
        }
      }

      return value
    },
  }
}
