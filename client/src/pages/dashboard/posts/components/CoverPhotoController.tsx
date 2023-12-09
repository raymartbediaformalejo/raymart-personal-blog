import { Controller, Control } from "react-hook-form";

import { TPost } from "../../../../redux/posts/posts.type";

type CoverPhotoControllerProps = {
  formData: FormData;
  control: Control<TPost>;
  errorMessage?: string;
};

const CoverPhotoController = ({
  formData,
  control,
  errorMessage,
}: CoverPhotoControllerProps) => {
  return (
    <>
      <Controller
        control={control}
        name="image"
        render={({ field }) => {
          return (
            <div>
              <p>Cover photo:</p>
              <div>
                <label htmlFor="cover-photo">
                  <p>Choose file</p>
                </label>
                <input
                  onChange={async (image) => {
                    const fileInput = image.target as HTMLInputElement;
                    let imageURL: string = "";

                    if (fileInput.files && fileInput.files.length > 0) {
                      const reader = new FileReader();
                      reader.readAsDataURL(fileInput.files[0]);

                      for (const file of fileInput.files) {
                        console.log("file: ", URL.createObjectURL(file));
                        imageURL = URL.createObjectURL(file);
                        formData.append("file", file);
                      }

                      formData.append(
                        "upload_preset",
                        import.meta.env.VITE_CLOUDINARY_PRESET_NAME
                      );

                      // try {
                      //   const response = await axios.post(
                      //     import.meta.env.VITE_CLOUDINARY_URL,
                      //     formData
                      //   );
                      //   const imageData = response.data;

                      //   console.log("Image data:", imageData.secure_url);
                      //   // if (imageData.secure_url) {
                      //   //   imageSrc = imageData.secure_url;
                      //   // }
                      // } catch (error) {
                      //   console.error("Error uploading image:", error);
                      // }
                    }

                    field.onChange(imageURL);
                  }}
                  id="cover-photo"
                  name="cover-photo"
                  type="file"
                />
                {/* <span>{field.value ? field.value : "No file chosen"}</span> */}
              </div>

              {field.value && typeof field.value === "string" ? (
                <div>
                  <img src={field.value} alt="Cover photo" />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        }}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default CoverPhotoController;
