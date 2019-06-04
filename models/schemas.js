const Joi = require("@hapi/joi");

// first_name, last_name, email, roles, stripe, approved, donator

const userSchema = {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  stripe: Joi.string(),
  roles: Joi.string().required(),
  approved: Joi.boolean(),
  donator: Joi.boolean()
};

// class_name, grade_level, subject, number_of_students, volunteer_id

const classesSchema = {
  class_name: Joi.string().required(),
  grade_level: Joi.number()
    .integer()
    .required(),
  subject: Joi.string().required(),
  number_of_students: Joi.number()
    .integer(),
  volunteer_id: Joi.number()
    .integer()
    .required()
}

const trainingSeriesSchema = {
  title: Joi.string().required(),
  user_id: Joi.number()
    .integer()
    .min(1)
    .required()
};

// id, subject, body, link, training_series_id, for_volunteer, days_from_start

const messageSchema = {
  subject: Joi.string().required(),
  body: Joi.string().required(),
  link: Joi.string()
    .uri({})
    .allow(""),
  training_series_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  for_volunteer: Joi.boolean(),
  days_from_start: Joi.number()
    .integer()
    .min(1)
    .required()
    .allow(null) //come back to this
};

const tokenSchema = {
  expiration: Joi.date().iso(),
  auth_token: Joi.string()
    .token()
    .required(),
  refresh_token: Joi.string().token(),
  service_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  user_id: Joi.number()
    .integer()
    .min(1)
    .required()
};

// send_date, is_sent, num_attempts, thread, message_id, recipient_id, service_id

const notificationSchema = {
  message_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  service_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  recipient_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  send_date: Joi.date()
    .iso()
    .required(),
  is_sent: Joi.boolean(),
  num_attempts: Joi.number()
    .integer()
    .min(0),
  thread: Joi.string(),
};

const responseSchema = {
  body: Joi.string(),
  notification_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  created_at: Joi.date().timestamp() //defaults to "javascript", might need to pass in "unix" option
};

module.exports = {
  userSchema,
  classesSchema,
  trainingSeriesSchema,
  messageSchema,
  tokenSchema,
  notificationSchema,
  responseSchema
};
