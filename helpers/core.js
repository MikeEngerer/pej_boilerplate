// takes in { model }, { data }
// returns { model } after required fields have been assigned from { data } 
const fitDataToModel = (model, data) => {

  if (!model || !data) return Promise.reject('missing data')

  // get all required fields from model
  const fields = Object.keys(model);

  // assign model's required fields from data to model 
  for (let field in data) {
    if (!fields.includes(field)) continue;
    model[field] = data[field];
  }

  let missingFields = [];
  // check all required fields in model have be assigned
  for (let field in model) {
    if (!model[field]) missingFields = [...missingFields, field]
  }

  return missingFields.length ? Promise.reject(`missing required fields:\n${missingFields.join(', ')}`) : Promise.resolve(model);
}

module.exports = {
  fitDataToModel
};