const faker = require("faker");
const uuidv4 = require("uuid/v4");

//alter these values to generate different amounts of faked, seeded data
const userSeeds = 700;
const seriesSeeds = 20;
const memberSeeds = 700; // 500 fake users will be generated by Faker.js
const messageSeeds = 20;
const relationSeeds = 500;

module.exports = {
  createFakeUsers,
  createFakeTrainingSeries,
  createFakeMessages,
  createFakeClasses,
  addVolunteersToSeries
};

function addVolunteersToSeries() {
  const newRelation = [];
  const fakeRelation = () => ({
    finished: faker.random.boolean(),
    volunteer_id: faker.random.number({ min: 1, max: relationSeeds }),
    training_series_id: faker.random.number({ min: 1, max: userSeeds })
  });
  for (let i = 0; i < relationSeeds; i++) {
    newRelation.push(fakeRelation());
  }
  return newRelation;
}

function createFakeUsers() {
  const newUsers = [];
  const fakeUser = () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    approved: faker.random.boolean(),
    donator: faker.random.boolean()
  });
  for (let i = 0; i < userSeeds; i++) {
    newUsers.push(fakeUser());
  }
  return newUsers;
}

function createFakeTrainingSeries() {
  const newSeries = [];
  const fakeSeries = () => ({
    title: faker.company.catchPhrase(),
    subject: faker.commerce.department(),
    user_id: faker.random.number({
      min: 1,
      max: userSeeds
    })
  });

  for (let i = 0; i < userSeeds; i++) {
    newSeries.push(fakeSeries());
  }

  return newSeries;
}

function createFakeMessages() {
  const newMessages = [];
  const fakeMessage = () => ({
    subject: faker.company.catchPhrase(),
    body: faker.company.bs(),
    link: faker.internet.url(),
    training_series_id: faker.random.number({
      min: 1,
      max: userSeeds
    })
  });
  for (let i = 0; i < userSeeds; i++) {
    newMessages.push(fakeMessage());
  }
  return newMessages;
}

function createFakeClasses() {
  const newClasses = [];
  const fakeClasses = () => ({
    class_name: faker.name.firstName(),
    grade_level: faker.random.number({ min: 1, max: 11 }),
    subject: faker.commerce.department(),
    teacher_name: faker.name.firstName(),
    number_of_students: faker.random.number({ min: 30, max: 60 })
  });
  for (let i = 0; i < userSeeds; i++) {
    newClasses.push(fakeClasses());
  }

  return newClasses;
}
