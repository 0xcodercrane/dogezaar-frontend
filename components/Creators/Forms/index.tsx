import { useState, useRef } from "react";
import { FileUpload } from "@/components/Creators/FileUpload";
import * as v from "valibot";
import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import FieldInfo from "./FieldInfo";
import Image from "next/image";
import { HiOutlineDownload } from "react-icons/hi";

export const InscriptionSchema = v.array(
  v.object({
    id: v.pipe(v.string(), v.trim()),
    meta: v.optional(
      v.object({
        attributes: v.optional(
          v.array(
            v.object({
              value: v.pipe(v.string(), v.trim()),
              trait_type: v.pipe(v.string(), v.trim()),
            })
          )
        ),
        name: v.pipe(v.string(), v.trim()),
        high_res_img_url: v.optional(
          v.pipe(v.pipe(v.string(), v.trim()), v.url())
        ),
      })
    ),
  })
);

export const informationSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Collection name must be at least 3 characters.")
  ),
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(20, "Collection description must be at least 20 characters.")
  ),
  price: v.pipe(v.number(), v.minValue(0)),
  website: v.pipe(
    v.string(),
    v.trim(),
    v.url("Please enter a valid URL for the website.")
  ),
  xHandle: v.pipe(
    v.string(),
    v.trim(),
    v.startsWith(
      "https://x.com",
      "Please enter a valid X handle (e.g., https://x.com/username)."
    )
  ),
  discordHandle: v.optional(v.pipe(v.string(), v.trim()), ""),
  telegramHandle: v.optional(v.pipe(v.string(), v.trim()), ""),
  instagramHandle: v.optional(v.pipe(v.string(), v.trim()), ""),
  creatorName: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(
      3,
      "Creator name is required and must be at least 3 characters."
    )
  ),
  creatorEmail: v.pipe(
    v.string(),
    v.email("Please enter a valid email address.")
  ),
  creatorDOGEAddress: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Creator DOGE address can not be empty")
  ),
  thumbnail: v.pipe(
    v.file("A thumbnail image file is required."),
    v.mimeType(
      ["image/jpeg", "image/png"],
      "Thumbnail must be a JPEG or PNG file."
    ),
    v.maxSize(1024 * 1024, "Thumbnail must be smaller than 1 MB.")
  ),
  banner: v.pipe(
    v.file("A banner image file is required."),
    v.mimeType(
      ["image/jpeg", "image/png"],
      "Banner must be a JPEG or PNG file."
    ),
    v.maxSize(1024 * 1024, "Banner must be smaller than 1 MB.")
  ),
  inscriptionsData: v.array(
    v.object({
      id: v.pipe(v.string(), v.trim()),
      meta: v.optional(
        v.object({
          attributes: v.optional(
            v.array(
              v.object({
                value: v.pipe(v.string(), v.trim()),
                trait_type: v.pipe(v.string(), v.trim()),
              })
            )
          ),
          name: v.pipe(v.string(), v.trim()),
          high_res_img_url: v.optional(
            v.pipe(v.pipe(v.string(), v.trim()), v.url())
          ),
        })
      ),
    })
  ),
  inscriptionsString: v.pipe(
    v.string(),
    v.nonEmpty("Inscription Data can not be empty")
  ),
});

export type TInformationSchema = v.InferInput<typeof informationSchema>;
export type TinscriptionSchema = v.InferInput<typeof InscriptionSchema>;

export default function Forms() {
  const [imageHandler, setImageHandler] = useState<any>(null);
  const imgRef = useRef<any>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  function handleGetBase64(file: File) {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          console.log(reader.result);
        }
      };

      reader.onerror = () => {
        console.error("Failed to read file.");
      };

      reader.readAsDataURL(file);
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && imageHandler) {
      imageHandler.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageHandler.name === "thumbnail") {
          setThumbnailPreview(reader.result as string);
        } else {
          setBannerPreview(reader.result as string);
        }
        setImageHandler(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageValidator = async (
    width: number,
    height: number,
    value: File,
    title: string,
    size: number
  ) => {
    const maxFileSize = size * 1024 * 1024;

    if (!value.size) {
      return `${title} can not be empty.`;
    }

    if (value.size > maxFileSize) {
      return `${title} must be smaller than ${size} MB.`;
    }

    const isValidRatio = await new Promise<boolean>((resolve) => {
      const img = document.createElement("img");
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const isCloseEnough =
          Math.abs(imageWidth - width) <= 200 &&
          Math.abs(imageHeight - height) <= 200;
        resolve(isCloseEnough);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(value);
    });

    if (!isValidRatio) {
      return `Invalid image ratio. Please upload an image with a ${width}x${height} resolution or close to it.`;
    }

    return undefined;
  };

  const informationForm = useForm({
    onSubmit: async ({ value }: { value: TInformationSchema }) => {
      try {
        v.parse(informationSchema, value);
        handleGetBase64(value.banner);
      } catch (error) {
        console.log("Submission error:", error);
      }
    },
    validatorAdapter: valibotValidator(),
  });

  async function validateDOGEAddress(address: string) {
    const dogecoinAddressRegex = /^D[1-9A-HJ-NP-Za-km-z]{25,34}$/;
    const isValidFormat = dogecoinAddressRegex.test(address);
    console.log(address);
    if (!isValidFormat) {
      return "Invalid DOGE address";
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          informationForm.handleSubmit();
        }}
      >
        <div className="bg-primary-DEFUAULT p-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:gap-8">
          <div>
            <div className="flex flex-col gap-4 border-solid">
              <p className="text-[#999] font-bold text-2xl bg-primary-DEFUAULT">
                Collection Information
              </p>
              <informationForm.Field
                name="name"
                validators={{
                  onChange: informationSchema.entries.name,
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;
                  return (
                    <div className="flex flex-col gam-1">
                      <label
                        htmlFor={name}
                        className="text-[20px] text-[#999] font-bold"
                      >
                        Collection Name
                      </label>
                      <input
                        id={name}
                        value={state.value || ""}
                        placeholder="Collection Name"
                        type="text"
                        className="w-full border-none bg-black rounded-md p-3 outline-none"
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
              <informationForm.Field
                name="description"
                validators={{
                  onChange: informationSchema.entries.description,
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;
                  return (
                    <div className="flex flex-col gam-1">
                      <label
                        htmlFor={name}
                        className="text-[20px] text-[#999] font-bold"
                      >
                        Collection Description
                      </label>
                      <textarea
                        id={name}
                        value={state.value || ""}
                        placeholder="collection description..."
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        cols={30}
                        rows={2}
                        className="w-full border-none bg-black rounded-md p-3 outline-none"
                      ></textarea>
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
              <div className="flex gap-4">
                <informationForm.Field
                  name="price"
                  validators={{
                    onChange: informationSchema.entries.price,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;

                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Price
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id={name}
                            value={state.value || 0}
                            placeholder=""
                            className="w-full border-none bg-black rounded-md p-3 outline-none"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              handleChange(Number(e.target.value))
                            }
                          />
                          <span className="absolute right-2 translate-y-1/2">
                            USD($)
                          </span>
                        </div>
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <informationForm.Field
                  name="thumbnail"
                  validators={{
                    onChangeAsync: async ({ value }: { value: File }) => {
                      return await imageValidator(
                        1000,
                        1000,
                        value,
                        "Thumbnail",
                        1
                      );
                    },
                  }}
                  children={(field: any) => {
                    const { name, handleChange } = field;

                    return (
                      <div>
                        <div className="flex flex-col gap-3">
                          <label
                            htmlFor={name}
                            className="text-[20px] text-[#999] font-bold"
                          >
                            Collection Thumbnail Image
                          </label>
                          <p>
                            Add your thumbnail image below. This image will
                            represent your collection and appear in previews and
                            listings. Recommended size: 1000x1000px.
                          </p>
                          <div
                            className="p-3 rounded-md border-[1px] h-[300] flex justify-center items-center border-[#5d5959] cursor-pointer"
                            onClick={() => {
                              setImageHandler({
                                handleChange: handleChange,
                                name: name,
                              });
                              imgRef?.current?.click();
                            }}
                          >
                            {thumbnailPreview ? (
                              <Image
                                alt="upload"
                                src={thumbnailPreview}
                                width={300}
                                height={150}
                                className="rounded-m rounded-lg object-cover transition duration-200 hover:scale-105"
                              />
                            ) : (
                              <Image
                                alt="upload"
                                src="/img/creators/upload.png"
                                className="opacity-70 transition duration-100 hover:opacity-100"
                                width={150}
                                height={150}
                              />
                            )}
                          </div>
                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />
                <informationForm.Field
                  name="banner"
                  validators={{
                    onChangeAsync: async ({ value }: { value: File }) => {
                      return await imageValidator(
                        1920,
                        1200,
                        value,
                        "Banner",
                        5
                      );
                    },
                  }}
                  children={(field: any) => {
                    const { name, handleChange } = field;

                    return (
                      <div>
                        <div className="flex flex-col gap-3">
                          <label
                            htmlFor={name}
                            className="text-[20px] text-[#999] font-bold"
                          >
                            Collection Banner Image
                          </label>
                          <p>
                            Add your banner image below. This image will appear
                            at the top of your collection page. Recommended
                            size: 1920x1200px.
                          </p>
                          <div
                            className="p-3 rounded-md border-[1px] h-[300] flex justify-center items-center border-[#5d5959] cursor-pointer"
                            onClick={() => {
                              setImageHandler({
                                handleChange: handleChange,
                                name: name,
                              });
                              imgRef?.current?.click();
                            }}
                          >
                            {bannerPreview ? (
                              <Image
                                alt="upload"
                                src={bannerPreview}
                                width={300}
                                height={150}
                                className="rounded-m rounded-lg object-cover transition duration-200 hover:scale-105"
                              />
                            ) : (
                              <Image
                                alt="upload"
                                src="/img/creators/upload.png"
                                className="opacity-70 transition duration-100 hover:opacity-100"
                                width={150}
                                height={150}
                              />
                            )}
                          </div>
                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-[#999] font-bold text-2xl bg-primary-DEFUAULT">
                Creator Details
              </p>
              <div className="flex gap-4">
                <informationForm.Field
                  name="creatorName"
                  validators={{
                    onChange: informationSchema.entries.creatorName,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;
                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Creator Name
                        </label>
                        <input
                          id={name}
                          value={state.value || ""}
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                          type="text"
                          className="w-full border-none bg-black rounded-md p-3 outline-none"
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
                <informationForm.Field
                  name="creatorEmail"
                  validators={{
                    onChange: informationSchema.entries.creatorEmail,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;
                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Creator email
                        </label>
                        <input
                          id={name}
                          value={state.value || ""}
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                          type="text"
                          className="w-full border-none bg-black rounded-md p-3 outline-none"
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
              </div>
              <informationForm.Field
                name="creatorDOGEAddress"
                validators={{
                  onChangeAsync: async ({ value }: { value: string }) => {
                    return await validateDOGEAddress(value);
                  },
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;
                  return (
                    <div>
                      <label
                        htmlFor={name}
                        className="text-[20px] text-[#999] font-bold"
                      >
                        Creator BRC20 address
                      </label>
                      <input
                        id={name}
                        value={state.value || ""}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        type="text"
                        className="w-full border-none bg-black rounded-md p-3 outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#999] font-bold text-2xl bg-primary-DEFUAULT">
                Creator Social Handles
              </p>
              <informationForm.Field
                name="website"
                validators={{
                  onChange: informationSchema.entries.website,
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor={name}
                        className="text-[20px] text-[#999] font-bold"
                      >
                        Website
                      </label>
                      <input
                        value={state.value || ""}
                        type="text"
                        id={name}
                        placeholder="https://www.example.com"
                        className="w-full border-none bg-black rounded-md p-3 outline-none"
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
              <div className="flex gap-4">
                <informationForm.Field
                  name="discordHandle"
                  validators={{
                    onChange: informationSchema.entries.discordHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;

                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Discord Link
                        </label>
                        <input
                          type="text"
                          id={name}
                          value={state.value || ""}
                          placeholder=""
                          className="w-full border-none bg-black rounded-md p-3 outline-none"
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />

                <informationForm.Field
                  name="xHandle"
                  validators={{
                    onChange: informationSchema.entries.xHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;

                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Twitter
                        </label>
                        <input
                          type="text"
                          value={state.value || ""}
                          id={name}
                          className="w-full border-none bg-black rounded-md p-3 outline-none"
                          placeholder=""
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="flex gap-4">
                <informationForm.Field
                  name="telegramHandle"
                  validators={{
                    onChange: informationSchema.entries.telegramHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;

                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Telegram
                        </label>
                        <input
                          type="text"
                          id={name}
                          value={state.value || ""}
                          placeholder=""
                          className="w-full border-none bg-black rounded-md p-3 outline-none"
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
                <informationForm.Field
                  name="instagramHandle"
                  validators={{
                    onChange: informationSchema.entries.instagramHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field;

                    return (
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor={name}
                          className="text-[20px] text-[#999] font-bold"
                        >
                          Instagram
                        </label>
                        <input
                          type="text"
                          id={name}
                          value={state.value || ""}
                          placeholder=""
                          className="w-full border-none bg-black rounded-md p-3 outline-none"
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-[#999] font-bold text-2xl bg-primary-DEFUAULT">
                  Inscription JSON file
                </p>
                <div className="border-[#999] px-[10px]  rounded-full border-2 border-solid">
                  <a
                    href="/download/format.json"
                    className="flex items-center gap-2 leading-8"
                    download
                  >
                    Download Template .json
                    <HiOutlineDownload />
                  </a>
                </div>
              </div>
              <informationForm.Field
                name="inscriptionsString"
                validators={{
                  onChangeAsyncDebounceMs: 1000,
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return "Inscription data address cannot be empty";
                    }

                    const inscriptionIdPattern = /^[a-f0-9]{64}i\d+$/;
                    let inscriptionJsonData;

                    try {
                      const data: TInformationSchema["inscriptionsData"] =
                        JSON.parse(value);

                      data.map((i) => {
                        if (!inscriptionIdPattern.test(i.id)) {
                          throw new Error("Invalid inscription ID(s) found.");
                        }
                      });

                      inscriptionJsonData = v.parse(
                        informationSchema.entries.inscriptionsData,
                        data
                      );
                      // }

                      informationForm.setFieldValue(
                        "inscriptionsData",
                        inscriptionJsonData
                      );
                    } catch (error: any) {
                      if (error?.name === "SyntaxError") {
                        return "Invalid JSON format.";
                      } else if (error instanceof v.ValiError) {
                        return `${error.message}.`;
                      } else if (
                        error.message === "Invalid inscription ID(s) found."
                      ) {
                        return error.message;
                      } else {
                        return "Invalid JSON format.";
                      }
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => {
                  const { handleChange } = field;
                  return (
                    <div>
                      <div className="flex flex-col gap-3">
                        <p>
                          Please upload your inscriptions list for your Ordinals
                          collection. Please ensure that it&apo;s valid JSON
                          formatting,
                        </p>
                        <div className="p-3 rounded-md border-[1px] h-[300] flex justify-center items-center border-[#5d5959] cursor-pointer">
                          <FileUpload
                            schema={informationSchema.entries.inscriptionsData}
                            setData={handleChange}
                            acceptFileType={"application/json"}
                            accept={[".json"]}
                            size="lg"
                          />
                        </div>
                        <FieldInfo field={field} />
                      </div>
                    </div>
                  );
                }}
              ></informationForm.Field>
            </div>
            <informationForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="border-2 rounded-md border-primary px-3 py-2 w-32"
                  >
                    {isSubmitting ? "..." : "Submit"}
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </form>
      <input
        ref={imgRef}
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={(e) => handleImageChange(e)}
      />
    </div>
  );
}
