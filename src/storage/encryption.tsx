import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

const SECURE_STORE_KEY = "mmkv.encryption.key.v1";

const generateEncryptionKey = () => {
  const partA = Crypto.randomUUID().replaceAll("-", "");
  const partB = Crypto.randomUUID().replaceAll("-", "");
  return `${partA}${partB}`;
};

export const getOrCreateEncryptionKey = async () => {
  const encryptionKey = await SecureStore.getItemAsync(SECURE_STORE_KEY);

  if (encryptionKey) {
    return encryptionKey;
  }

  const newEncryptionKey = generateEncryptionKey();
  await SecureStore.setItemAsync(SECURE_STORE_KEY, newEncryptionKey);
  return newEncryptionKey;
};

export const deleteEncryptionKey = () => {
  return SecureStore.deleteItemAsync(SECURE_STORE_KEY);
};
