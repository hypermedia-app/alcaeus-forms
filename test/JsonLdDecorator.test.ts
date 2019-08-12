// @ts-ignore
import { expect } from '@open-wc/testing'
import { create } from '../src/lib/JsonLdDecorator'

describe('JsonLdDecorator', () => {
  describe('wrap', () => {
    it('does not touch resource objects', () => {
      // given
      const resource = {
        '@id': 'whatever',
      }
      const decorator = create('http://example.com')

      // when
      const wrapped = decorator.wrap(resource)

      // then
      expect(wrapped).to.be.equal(resource)
    })

    it('does not touch JSON-LD literal objects', () => {
      // given
      const resource = {
        '@value': 'foo',
      }
      const decorator = create('http://example.com')

      // when
      const wrapped: any = decorator.wrap(resource)

      // then
      expect(wrapped['@value']).to.be.equal('foo')
    })

    it('encapsulates primitive value as JSON-LD literal object', () => {
      // given
      const decorator = create('http://example.com')

      // when
      const wrapped: any = decorator.wrap('foo')

      // then
      expect(wrapped['@value']).to.be.equal('foo')
    })

    it('ignores empty value other than string', () => {
      // given
      const decorator = create('http://www.w3.org/2001/XMLSchema#int')

      // when
      const wrapped = decorator.wrap('')

      // then
      expect(wrapped).to.be.null
    })

    it('does not wrap explicit empty string value', () => {
      // given
      const decorator = create('http://www.w3.org/2001/XMLSchema#string')

      // when
      const wrapped: any = decorator.wrap('')

      // then
      expect(wrapped).to.be.equal('')
    })

    it('returns untyped string as-is', () => {
      // given
      const decorator = create()

      // when
      const wrapped: any = decorator.wrap('hello')

      // then
      expect(wrapped).to.be.equal('hello')
    })

    it('returns untyped empty string as-is', () => {
      // given
      const decorator = create()

      // when
      const wrapped: any = decorator.wrap('')

      // then
      expect(wrapped).to.be.equal('')
    })
  })

  describe('unwrap', () => {
    it('does not touch resource objects', () => {
      // given
      const resource = {
        '@id': 'whatever',
      } as any
      const decorator = create('http://example.com')

      // when
      const unwrapped = decorator.unwrap(resource)

      // then
      expect(unwrapped).to.be.equal(resource)
    })

    it('returns @value of JSON-LD literal object', () => {
      // given
      const resource = {
        '@value': '156',
      } as any
      const decorator = create('http://example.com')

      // when
      const unwrapped = decorator.unwrap(resource)

      // then
      expect(unwrapped).to.be.equal('156')
    })

    it('converts @value with alcaeus', () => {
      // given
      const resource = {
        '@value': 'foo',
        '@type': 'http://example.app/datatype',
      } as any
      const decorator = create('http://example.com')

      // when
      const unwrapped = decorator.unwrap(resource)

      // then
      expect(unwrapped).to.be.equal('FOO')
    })
  })
})
