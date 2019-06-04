// @ts-ignore
import { html, fixture, expect } from '@open-wc/testing'
import '../src/alcaeus-form'

describe('<alcaeus-form>', () => {
    it('converts operation to contract', async () => {
        // given
        const operation = {}

        // then
        const el = await fixture(html`<alcaeus-form .operation="${operation}"></alcaeus-form>`)
        await el.updateComplete

        // then
        expect(el.contract).to.be.ok
    })
})
