// @ts-ignore
import { expect } from '@open-wc/testing'
import { IDocumentedResource, ISupportedOperation } from 'alcaeus/types/Resources'
import convert from '../src/lib/operation-to-contract'

describe('operation-to-contract', () => {
  const nullOperation: ISupportedOperation & IDocumentedResource = {
    requiresInput: false,
    method: '',
    returns: null,
    expects: null,
    title: null,
    description: null,
  } as any

  it('returns empty fields array when operation does not expect anything', () => {
    // when
    const contract = convert(nullOperation)

    // then
    expect(contract.fields.length).to.equal(0)
  })

  it('uses range.id for field.type', () => {
    // given
    const operation = {
      ...nullOperation,
      expects: {
        supportedProperties: [
          {
            property: {
              range: {
                id: 'foo:bar',
              },
            },
          },
        ],
      },
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.fields[0].type).to.equal('foo:bar')
  })

  it('uses property id for field.property', () => {
    // given
    const operation = {
      ...nullOperation,
      expects: {
        supportedProperties: [
          {
            property: {
              id: 'foo:bar',
            },
          },
        ],
      },
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.fields[0].property).to.equal('foo:bar')
  })

  it('uses property title for field.title', () => {
    // given
    const operation = {
      ...nullOperation,
      expects: {
        supportedProperties: [
          {
            title: 'hello world',
          },
        ],
      },
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.fields[0].title).to.equal('hello world')
  })

  it('uses operation title for contract.title', () => {
    // given
    const operation = {
      ...nullOperation,
      title: 'hello world',
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.title).to.equal('hello world')
  })

  it('uses operation description for contract.description', () => {
    // given
    const operation = {
      ...nullOperation,
      description: 'hello world',
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.description).to.equal('hello world')
  })

  it('field.required should be false if unspecified', () => {
    // given
    const operation = {
      ...nullOperation,
      expects: {
        supportedProperties: [{}],
      },
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.fields[0].required).to.be.false
  })

  it('decorates fields to set @value for literals', () => {
    // given
    const operation = {
      ...nullOperation,
      expects: {
        supportedProperties: [
          {
            title: 'hello world',
          },
        ],
      },
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.fields[0].valueDecorator).to.be.ok
  })

  it('skips properties which are not writable', () => {
    // given
    const operation = {
      ...nullOperation,
      expects: {
        supportedProperties: [
          {
            title: 'hello world',
            writable: false,
          },
        ],
      },
    }

    // when
    const contract = convert(operation as any)

    // then
    expect(contract.fields).to.have.length(0)
  })
})
