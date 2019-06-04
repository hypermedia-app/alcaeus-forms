import { LitForm } from '@lit-any/forms'
import { SupportedOperation } from 'alcaeus/types/Resources'
import convert from './lib/operation-to-contract'

export default class AlcaeusForm extends LitForm {
    private __operation: SupportedOperation | null = null

    public static get properties() {
        return { operation: { type: Object } }
    }

    public get operation() {
        if (!this.__operation) {
            throw new Error('Operation not set')
        }

        return this.__operation
    }

    public set operation(operation: SupportedOperation) {
        this.__operation = operation
        this.contract = convert(operation)
    }
}

customElements.define('alcaeus-form', AlcaeusForm)
