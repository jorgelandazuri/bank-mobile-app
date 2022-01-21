import {IMock, Mock, Times} from "typemoq";
import {AsyncStorage} from "react-native";
import {AsyncStorageUserAccountCache} from "../../src/model/AsyncStorageUserAccountCache";
import {TestUtil} from "../util/TestUtil";

describe("AsyncStorageUserAccountCache", () => {

  const ACCOUNT_ID_CACHE_KEY = "@account:1";

  let underTest: AsyncStorageUserAccountCache;
  let storage: IMock<AsyncStorage>;

  beforeEach(() => {
    storage = Mock.ofType<AsyncStorage>();
    underTest = new AsyncStorageUserAccountCache(storage.object);
  });

  describe("when successfully saving an account", () => {

    it("should set the new item value", async () => {
      storage
        .setup(it => it.setItem(ACCOUNT_ID_CACHE_KEY, JSON.stringify(TestUtil.accountWithId1())))
        .returns(() => Promise.resolve());

      await underTest.save(ACCOUNT_ID_CACHE_KEY, TestUtil.accountWithId1());

      storage.verify(it => it.setItem(ACCOUNT_ID_CACHE_KEY, JSON.stringify(TestUtil.accountWithId1())), Times.once());
    });
  });

  describe("when unsuccessfully saving an account", () => {

    it("should not set the new item value", (done) => {
      storage
        .setup(it => it.setItem(ACCOUNT_ID_CACHE_KEY, JSON.stringify(TestUtil.accountWithId1())))
        .throws(new Error());

      underTest
        .save(ACCOUNT_ID_CACHE_KEY, TestUtil.accountWithId1())
        .then(() => done.fail())
        .catch(done())
    });
  });

  describe("when successfully getting an account", () => {

    it("should return the account", async () => {
      storage
        .setup(it => it.getItem(ACCOUNT_ID_CACHE_KEY))
        .returns(() => Promise.resolve(JSON.stringify(TestUtil.accountWithId1())));

      const actualDeals = await underTest.get(ACCOUNT_ID_CACHE_KEY);

      expect(actualDeals).toEqual(TestUtil.accountWithId1());
    });
  });

  describe("when asked for a not existing value for key", () => {

    it("should reject promise", (done) => {
      storage
        .setup(it => it.getItem(ACCOUNT_ID_CACHE_KEY))
        .returns(() => Promise.resolve("no account here"));

      underTest
        .get(ACCOUNT_ID_CACHE_KEY)
        .then(() => done.fail())
        .catch(done());
    });
  });

  describe("when unsuccessfully getting an account from cache storage", () => {

    it("should reject promise", (done) => {
      storage
        .setup(it => it.getItem(ACCOUNT_ID_CACHE_KEY))
        .throws(new Error());

      underTest
        .get(ACCOUNT_ID_CACHE_KEY)
        .then(() => done.fail())
        .catch(done());
    });
  });
});
