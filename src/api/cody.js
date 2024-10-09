const GET_CODY_URLS = (id = "1", dir = "123651") => {
  return {
    LIST_FOLDERS: "https://getcody.ai/api/v1/folders",
    CREATE_FOLDER: "https://getcody.ai/api/v1/folders",
    UPDATE_FOLDER: `https://getcody.ai/api/v1/folders/${id}`,
    LIST_DOCUMENTS: `https://getcody.ai/api/v1/documents?folder_id=${id}`,
    DIR_LIST_DOCUMENTS: `https://getcody.ai/web/documents?page=${id}&per_page=15&directory_id=${dir}&order_by=title&order_direction=asc`,
    CREATE_DOCUMENT: "https://getcody.ai/api/v1/documents",
    UPLOAD_DOCUMENT: "https://getcody.ai/api/v1/uploads/signed-url",
    CREATE_DOCUMENT_FROM_FILE: "https://getcody.ai/api/v1/documents/file",
  };
};
const HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_CODY_KEY}`,
};

export const listFolders = async () => {
  const response = await fetch(GET_CODY_URLS().LIST_FOLDERS, {
    method: "GET",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await response.json();
  return data;
};

export const createFolder = async (name) => {
  const response = await fetch(GET_CODY_URLS().CREATE_FOLDER, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create folder");
  }
};

export const updateFolder = async (folder_id, name) => {
  const response = await fetch(GET_CODY_URLS(folder_id).UPDATE_FOLDER, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to update folder");
  }

  const { data } = await response.json();
  return data;
};

export const listDocuments = async (folder_id) => {
  const response = await fetch(GET_CODY_URLS(folder_id).LIST_DOCUMENTS, {
    method: "GET",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await response.json();
  return data;
};

export const listDocumentsByDirectory = async (
  page_id = "1",
  directory_id = "123651"
) => {
  const response = await fetch("https://admin-side-tfwc.onrender.com/api/list-documents");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await response.json();
  return data;
};

export const createDocument = async (name, id, content) => {
  const response = await fetch(GET_CODY_URLS().CREATE_DOCUMENT, {
    method: "POST",
    headers: {
      ...HEADERS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, folder_id: id, content }),
  });

  if (!response.ok) {
    throw new Error("Failed to create document");
  }

  const { data } = await response.json();
  return data;
};

export const createDocumentFromFile = async (
  id,
  file_name,
  content_type,
  file
) => {
  const response = await fetch(GET_CODY_URLS().UPLOAD_DOCUMENT, {
    method: "POST",
    headers: {
      ...HEADERS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file_name: file_name,
      content_type: content_type,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload document");
  }

  const {
    data: { key, url },
  } = await response.json();

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": content_type,
    },
    body: file,
  });

  const response2 = await fetch(GET_CODY_URLS().CREATE_DOCUMENT_FROM_FILE, {
    method: "POST",
    headers: {
      ...HEADERS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, folder_id: id }),
  });

  if (!response2.ok) {
    throw new Error("Failed to create document");
  }

  const { data } = await response2.json();
  return data;
};

export const getUploadURL = async (file_name, content_type) => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  //});
  console.log("getUploadURL", file_name, content_type);

  const response = await fetch(GET_CODY_URLS().UPLOAD_DOCUMENT, {
    method: "POST",
    headers: {
      ...HEADERS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file_name, content_type }),
  });

  if (!response.ok) {
    throw new Error("Failed to get upload URL");
  }

  const {
    data: { key, url },
  } = await response.json();
  return { key, url };
};

export const uploadFileToURL = async (url, key, content_type, file) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": content_type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file to URL");
  }

  return { key };
};

export const createDocumentRecord = async (id, key) => {
  const response = await fetch(GET_CODY_URLS().CREATE_DOCUMENT_FROM_FILE, {
    method: "POST",
    headers: {
      ...HEADERS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, folder_id: id }),
  });

  if (!response.ok) {
    throw new Error("Failed to create document record");
  }

  const { data } = await response.json();
  return data;
};
