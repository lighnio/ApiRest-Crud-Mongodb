import supertest from 'supertest';
import app from '../app.js';
import { tokenSign } from '../src/utils/handleJWT';
import { models } from '../src/models';
import { testAuthRegisterAdmin, testDataTrack, testStorageRegister } from './helpers/dataHelper';
let STORAGE_ID = "";
let JWT_TOKEN = "";

beforeAll(async () => {
  await models.usersModel.deleteMany({});
  await models.storageModel.deleteMany({});
  const user = await models.usersModel.create(testAuthRegisterAdmin);
  const storage = await models.storageModel.create(testStorageRegister);
  STORAGE_ID = storage._id.toString();
  JWT_TOKEN = await tokenSign(user);
});

test("Should add an item", async () => {
  const dataTracksNew = { 
    ...testDataTrack, 
    mediaId: STORAGE_ID };

  const res = await supertest(app)
    .post("/api/tracks")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .send(dataTracksNew);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.name");
  expect(body).toHaveProperty("data.cover");
  expect(body).toHaveProperty("data.artist");
  
});

test("Should return all tracks", async () => {
  const res = await supertest(app)
    .get("/api/tracks")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  //   idFile = data.docs[0]._id;
  expect(body).toHaveProperty("data");
});

test("Should return track detail", async () => {
  const { _id } = await models.tracksModel.findOne({});
  let id = _id.toString();
  const res = await supertest(app)
    .get(`/api/tracks/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});

test("Should delete item by id", async () => {
  const { _id } = await models.tracksModel.findOne({});
  let id = _id.toString();
  const res = await supertest(app)
    .delete(`/api/tracks/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.deleted", 1);
});