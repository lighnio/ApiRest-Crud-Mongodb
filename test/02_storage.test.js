import supertest from "supertest";
import app from "../app.js";
import { tokenSign } from "../src/utils/handleJWT.js";
import { models } from "../src/models/index.js";
import { storageTestAuthRegister } from "./helpers/dataHelper.js";
let JWT_TOKEN = "";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { time } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/dump/image.jpg`;

/**
 * First, we need to get the JWT
 */
beforeAll(async () => {
  await models.usersModel.deleteMany({});
  await models.storageModel.deleteMany({});
  const user = models.usersModel.create(storageTestAuthRegister);
  JWT_TOKEN = await tokenSign(user);
});

/**
 * [POST STORAGE] Test for upload file
 */
describe("[STORAGE] Upload File", () => {
  test("Should Upload File", async () => {
    const res = await supertest(app)
      .post("/api/storage")
      .set("Authorization", `Bearer ${JWT_TOKEN}`)
      .attach("myfile", filePath);
    const { body } = res;
    expect(res.statusCode).toEqual(201);
    expect(body).toHaveProperty("data");
    expect(body).toHaveProperty("data.url");
  });
});

/**
 * [GET STORAGE LIST] Test get list items
 */
describe("[STORAGE] Return All Files", () => {
  test("Should create a return all", async () => {
    const res = await supertest(app)
      .get("/api/storage")
      .set("Authorization", `Bearer ${JWT_TOKEN}`);
    const { body } = res;
    expect(res.statusCode).toEqual(200);
    // const { data } = body;
    // idFile = data.docs[0]._id;
    expect(body).toHaveProperty("data");
  });
});

/**
 * [GET STORAGE ITEM] Test get detail item
 */
describe("[STORAGE] Return one item", () => {
  let id = "";
  test("Should return item id", async () => {
    const { _id } = await models.storageModel.findOne();
    id = _id.toString();
  });

  test("Should return all detail of one item", async () => {
    const res = await supertest(app)
      .get(`/api/storage/${id}`)
      .set("Authorization", `Bearer ${JWT_TOKEN}`);
    const { body } = res;
    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");
  });
});

describe("[STORAGE] Delete one item", () => {
  let id = "";

  test("Should delete the item", async () => {
    const { _id } = await models.storageModel.findOne({});
    id = _id.toString();

    const res = await supertest(app)
      .delete(`/api/storage/${id}`)
      .set("Authorization", `Bearer ${JWT_TOKEN}`);
    const { body } = res;
    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");
    expect(body).toHaveProperty("data.deleted", 1);
  });
});
