import { html, fixture, expect } from '@open-wc/testing'

// import '../src/alcaeus-form.js'

describe('<alcaeus-form>', () => {
  it('has a default property heading', async () => {
    const el = await fixture('<alcaeus-form></alcaeus-form>')

    expect(el.heading).to.equal('Hello world!')
  })

  it('allows property heading to be overwritten', async () => {
    const el = await fixture(html`
      <alcaeus-form heading="different heading"></alcaeus-form>
    `)

    expect(el.heading).to.equal('different heading')
  })
})
