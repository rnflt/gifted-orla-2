import { storage } from "./firebase";
import {ref, getDownloadURL} from "firebase/storage";

// accepts file path in the format `folder/filename.ext`
const getImageURL = async (folder, file) => {
  const fileRef = ref(storage, folder, file)
  const url = getDownloadURL(fileRef);
  return url;
};

const StorageService = {
  getImageURL,
};

export default StorageService;