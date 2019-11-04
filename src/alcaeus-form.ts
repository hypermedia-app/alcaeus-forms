import { LitForm } from '@lit-any/forms'
import { IOperation } from 'alcaeus/types/Resources'
import convert from './lib/operation-to-contract'

export default class AlcaeusForm extends LitForm {
  private __operation: IOperation | null = null

  public static get properties() {
    return { operation: { type: Object } }
  }

  public get operation() {
    if (!this.__operation) {
      throw new Error('Operation not set')
    }

    return this.__operation
  }

  public set operation(operation: IOperation) {
    if (!operation) {
      throw new Error('Operation was undefined or null')
    }

    this.__operation = operation
    this.contract = convert(operation)

    const value: Record<string, unknown> = { ...this.value }
    if (
      operation.expects &&
      operation.expects.id &&
      operation.expects.id !== 'http://www.w3.org/2002/07/owl#Nothing'
    ) {
      value['@type'] = operation.expects.id
    }

    this.value = this.contract.fields.reduce((map, field) => {
      if (!operation.target) {
        return map
      }

      if (field.property in map) {
        return map
      }

      // @ts-ignore
      const sourceValue = operation.target[field.property]
      let formValue
      if (typeof sourceValue === 'object') {
        formValue = sourceValue
      } else {
        formValue = { '@value': sourceValue, '@type': field.type }
      }

      return {
        ...map,
        [field.property]: formValue,
      }
    }, value)
  }
}

customElements.define('alcaeus-form', AlcaeusForm)
