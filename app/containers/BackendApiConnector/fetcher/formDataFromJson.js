import jsonToFormData from '@ajoelp/json-to-formdata';

export default function formDataFromJson(json) {
  if (json === undefined) {
    return json;
  }

  return jsonToFormData(json, {
    excludeNull: false,
  });
}
