import { http } from "./http";

export async function uploadSingleFile(file) {
  const formData = new FormData();
  formData.append("fileData", file);

  const res = await http.post("/file-storage/upload/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function uploadMultipleFile(files) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await http.post("/file-storage/upload/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
