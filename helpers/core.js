// check item is a plain js object
const isObject = (item) => !!item && item.constructor === Object;

// check item is an array
const isArray = (item) => !!item && item.constructor === Array;

// forces a promise to resolve
const reflect = (promise) => {
  return promise
    .then(data => Promise.resolve({result: 'resolved', err: null, data}))
    .catch(err => Promise.resolve({result: 'rejected', err, data: null}))
};

// reduce an object into only its required/optional fields, discarding anything else (does not mutate originals)
// takes in model = { required : {}, optional: {} }, data = {}
// returns output = {}
const fitDataToModel = (model, data) => {

  if (!model || !isObject(model) || !data || !isObject(model)) return Promise.reject('malformed or missing data');

  if (!model.required || !isObject(model.required) || !model.optional || !isObject(model.optional)) {
    return Promise.reject('model must conform to { required: {}, optional: {} }');
  }

  // to be populated from data
  let output = {};

  // get all required/optional field names from model
  const requiredFields = Object.keys(model.required),
        optionalFields = Object.keys(model.optional);

  // assign model's required fields from data to model 
  for (let field in data) {
    if (!requiredFields.includes(field) && !optionalFields.includes(field)) continue;
    output = { ...output, [field]: data[field] };
  }

  // check all required fields in model have be assigned
  const missingFields = requiredFields.filter(field => !output[field]);

  return missingFields.length ? Promise.reject(`missing required field(s):\n${missingFields.join(', ')}`) : Promise.resolve(output);
};


module.exports = {
  isObject,
  isArray,
  reflect,
  fitDataToModel
};