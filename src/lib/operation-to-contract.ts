import {
  HydraResource,
  IDocumentedResource,
  ISupportedOperation,
  SupportedProperty,
} from 'alcaeus/types/Resources'
import { FieldContract, FormContract } from '@lit-any/forms/lib/formContract'

interface FieldContractExtension {
  collection: HydraResource
}

function propertyToField(sp: SupportedProperty & any): FieldContract & FieldContractExtension {
  return {
    type: sp.property && sp.property.range && sp.property.range.id,
    property: sp.property && sp.property.id,
    title: sp.title,
    description: sp.description,
    required: sp.required === true,
    collection: sp['http://www.w3.org/ns/hydra/core#collection'],
  }
}

export default (operation: ISupportedOperation & IDocumentedResource): FormContract => ({
  title: operation.title,
  description: operation.description,
  fields: operation.expects ? operation.expects.supportedProperties.map(propertyToField) : [],
  method: operation.method,
  target: '',
})
