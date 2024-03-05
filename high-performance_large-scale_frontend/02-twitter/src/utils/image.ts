export const imageUpload = async (
  files: FileList | null
): Promise<string | null> => {
  if (files && files.length > 0) {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise((resolve) => {
      fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        const { result } = e.target as FileReader;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          resolve(null);
        }
      };
    });
  } else {
    return null;
  }
};
