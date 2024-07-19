import mongoose from "mongoose";

// create schema using mongoose
const crudSchema = mongoose.Schema({
  name: {
    type: String, // make sure the type of the name is string datatype
    required: true, // this ensures the this field is required
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// export this schema as model using mongoose.model 
// this has two parameter first tablename and next is the schema
export const CRUD = mongoose.model('crud', crudSchema);
