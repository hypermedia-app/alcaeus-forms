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
})
