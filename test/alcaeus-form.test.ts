// @ts-ignore
import { html, fixture, expect } from '@open-wc/testing'
import '../src/alcaeus-form'

describe('<alcaeus-form>', () => {
  describe('operation', () => {
    it('is converted operation to contract', async () => {
      // given
      const operation = {}

      // then
      const el = await fixture(
        html`
          <alcaeus-form .operation="${operation}"></alcaeus-form>
        `,
      )
      await el.updateComplete

      // then
      expect(el.contract).to.be.ok
    })

    it('throws when is falsy', async () => {
      // then
      const el = await fixture(
        html`
          <alcaeus-form></alcaeus-form>
        `,
      )
      await el.updateComplete

      // then
      expect(() => el.operation).to.throw
    })

    it('returns the original value', async () => {
      // given
      const operation = {}

      // then
      const el = await fixture(
        html`
          <alcaeus-form .operation="${operation}"></alcaeus-form>
        `,
      )
      await el.updateComplete

      // then
      expect(el.operation).to.equal(operation)
    })
  })

  it("initializes the value with operation's expected type", async () => {
    // given
    const operation = {
      expects: {
        id: 'urn:example:type',
        supportedProperties: [],
      },
    }

    // then
    const el = await fixture(
      html`
        <alcaeus-form .operation="${operation}"></alcaeus-form>
      `,
    )
    await el.updateComplete

    // then
    expect(el.value['@type']).to.equal('urn:example:type')
  })

  it('copies relevant literal properties from operation.target to value', async () => {
    // given
    const operation = {
      expects: {
        id: 'urn:example:type',
        supportedProperties: [
          {
            property: {
              id: 'foo',
            },
          },
        ],
      },
      target: {
        foo: 'bar',
        unsupported: 'ignore',
      },
    }

    // then
    const el = await fixture(
      html`
        <alcaeus-form .operation="${operation}"></alcaeus-form>
      `,
    )
    await el.updateComplete

    // then
    expect(el.value['@type']).to.equal('urn:example:type')
    expect(el.value.foo['@value']).to.equal('bar')
    expect(el.value.unsupported).to.be.undefined
  })

  it('copies relevant object properties from operation.target to value', async () => {
    // given
    const bar = { id: 'BAR' }
    const operation = {
      expects: {
        id: 'urn:example:type',
        supportedProperties: [
          {
            property: {
              id: 'foo',
            },
          },
        ],
      },
      target: {
        foo: bar,
        unsupported: 'ignore',
      },
    }

    // then
    const el = await fixture(
      html`
        <alcaeus-form .operation="${operation}"></alcaeus-form>
      `,
    )
    await el.updateComplete

    // then
    expect(el.value['@type']).to.equal('urn:example:type')
    expect(el.value.foo.id).to.equal('BAR')
    expect(el.value.unsupported).to.be.undefined
  })
})
