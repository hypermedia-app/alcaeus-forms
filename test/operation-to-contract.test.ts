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
})
