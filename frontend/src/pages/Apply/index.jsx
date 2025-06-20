import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingInput from "../../components/Input";
import Button from "../../components/Button";
import { CONTACT_US_ROUTE, HOME_ROUTE } from "../../constants/routes";
import {
  faFile,
  faFileCsv,
  faFileExcel,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileZipper,
  faInfo,
  faUpload,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fields, alphabetValidator } from "./helper";
import { UPLOADING_ANIMATION } from "../../constants/images";

const IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "tiff", "bmp", "webp", "svg"];
const VIDEO_EXTS = [
  ".mp4",
  ".mkv",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".3gp",
  ".m4v",
  ".ts",
  ".vob",
  ".m2ts",
  ".ogv",
  ".f4v",
  ".rm",
];
const FILE_NAMES = {
  any: faFile,
  xls: faFileExcel,
  xlsx: faFileExcel,
  doc: faFileWord,
  docx: faFileWord,
  pdf: faFilePdf,
  zip: faFileZipper,
  tar: faFileZipper,
  rar: faFileZipper,
  ppt: faFilePowerpoint,
  pptx: faFilePowerpoint,
  txt: faFileLines,
  csv: faFileCsv,
  video: faFileVideo,
};

function Apply() {
  const params = useParams();
  const [envelopeId, setEnvelopeId] = useState("");
  const [message, setMessage] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    setIsFetching(true);
    if (!params?.id) {
      setEnvelopeId("");
      setIsFetching(false);
      return;
    }
    axios
      .get("/api/reps/check/" + params?.id)
      .then((res) => setEnvelopeId(res?.data?.data?.envelopeId))
      .catch(() => setEnvelopeId(""))
      .finally(() => setIsFetching(false));
  }, [params]);

  useEffect(() => {
    if (!Object.keys(applicationData || {}).length) return;

    const previewsObj = {};
    (applicationData?.media || []).forEach((url, index) => {
      if (!url) return;
      let preview = {};
      const ext = (url.split(".").pop() || "").toLowerCase();
      if (IMAGE_EXTS.includes(ext))
        preview = { url: axios.defaults.baseURL + url };
      else if (VIDEO_EXTS.includes(ext)) preview = { icon: FILE_NAMES.video };
      else if (Object.keys(FILE_NAMES).includes(ext))
        preview = { icon: FILE_NAMES[ext] };
      else preview = { icon: FILE_NAMES.any };

      previewsObj[`attachment${index + 1}`] = preview;
    });
    setImagePreviews(previewsObj);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [applicationData]);

  const fileChangeHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    let preview = {};
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    if (IMAGE_EXTS.includes(ext)) preview = { url: URL.createObjectURL(file) };
    else if (VIDEO_EXTS.includes(ext)) preview = { icon: FILE_NAMES.video };
    else if (Object.keys(FILE_NAMES).includes(ext))
      preview = { icon: FILE_NAMES[ext] };
    else preview = { icon: FILE_NAMES.any };

    setImagePreviews((prev) => ({
      ...prev,
      [e.target?.name]: preview,
    }));
  };

  const handleImageRemove = (name) => {
    const previews = { ...imagePreviews };
    delete previews?.[name];
    setImagePreviews(previews);
    const input = document.querySelector(`input[type='file'][name='${name}']`);
    if (!input) return;
    input.value = "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (applicationData) setIsUploading(true);
    setIsLoading(true);
    const payload = new FormData(e.target);
    payload.set("envelope_id", envelopeId);

    const axios_promise = applicationData
      ? axios.post("/api/applications/create", payload, {
          onUploadProgress: (event) =>
            setUploadingProgress(Math.round(event.progress * 100)),
        })
      : axios.post("/api/applications/check", payload, {
          headers: { "Content-Type": "application/json" },
        });

    axios_promise
      .then((res) => {
        const _is_submitted = !!res.data?.data?.is_submitted;
        const msg = res?.data?.msg;
        setApplicationData(res.data?.data?.application);
        setIsSubmitted(_is_submitted);
        setMessage(msg);
        if (msg && !_is_submitted) toast(msg);
      })
      .catch((err) => {
        const msg = err?.repsonse?.data?.msg;
        setMessage(msg);
        if (msg) toast.error(msg);
      })
      .finally(() => {
        setUploadingProgress(0);
        setIsUploading(false);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isFetching ? (
        <div className="flex items-center justify-center py-[100px]">
          <span className="flex size-[30px] rounded-full border-[3px] border-b-transparent animate-spin"></span>
        </div>
      ) : (
        <>
          <div className="wrapper flex flex-col justify-self-center !w-[calc(100%-20px)] !mx-[10px] mt-[30px] mb-[30px] md:mb-[80px] shadow-[0_0_10px_#cccccc] py-[30px] md:!px-[50px] !px-[20px]">
            {isSubmitted ? (
              <div className="flex items-center justify-center flex-col gap-[15px] py-[50px] font-bold">
                <span className="rounded-full size-[70px] border flex items-center justify-center text-[30px]">
                  <FontAwesomeIcon icon={faInfo} />
                </span>
                <p className="text-[16px]">{message}!</p>
                <Button
                  text={
                    message === "Application submitted successfully"
                      ? "Back to Home"
                      : "Contact Us"
                  }
                  href={
                    message === "Application submitted successfully"
                      ? HOME_ROUTE
                      : CONTACT_US_ROUTE
                  }
                />
              </div>
            ) : (
              <>
                <h2 className="text-[26px] md:text-[30px] font-bold text-center">
                  Funding Application
                </h2>
                {envelopeId ? (
                  <p className="text-[14px] mt-[10px] text-center">
                    Envelope ID: {envelopeId}
                  </p>
                ) : null}
                <span className="pb-[10px] border-b-[2px] block"></span>
                <p className="mt-[10px] text-[12px] text-gray-400 md:text-left text-center">
                  Thank you for placing your trust in FC Advance. Please review
                  attached information for submission
                </p>
                <form
                  method="post"
                  onSubmit={handleFormSubmit}
                  className="flex flex-col"
                >
                  <div className="flex gap-[50px] md:flex-row flex-col mt-[50px]">
                    <FloatingInput
                      name="submitted_by[full_name]"
                      onChange={alphabetValidator}
                      placeholder="Your Full Name"
                      value={applicationData?.submitted_by?.full_name}
                      required
                      readOnly={!!applicationData}
                    />
                    <FloatingInput
                      type="email"
                      name="submitted_by[email]"
                      placeholder="Your Email"
                      value={applicationData?.submitted_by?.email}
                      required
                      readOnly={!!applicationData}
                    />
                  </div>
                  {applicationData ? (
                    <>
                      <div className="mt-[50px] flex gap-[50px] md:flex-row flex-col">
                        <div className="flex flex-col gap-[20px] w-full">
                          <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                            Business Information
                          </h3>

                          {Fields.business.map((field) => (
                            <FloatingInput
                              name={field.name}
                              placeholder={field.placeholder}
                              type={field.type}
                              onChange={field.onChange}
                              required={field.required}
                            />
                          ))}
                        </div>
                        <div className="flex flex-col gap-[20px] w-full">
                          <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                            Owner Information
                          </h3>
                          {Fields.owner.map((field) => (
                            <FloatingInput
                              name={field.name}
                              onChange={field.onChange}
                              placeholder={field.placeholder}
                              type={field.type}
                              required={field.required}
                            />
                          ))}
                        </div>

                        <div className="flex flex-col gap-[20px] w-full">
                          <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                            Partner Information
                          </h3>

                          {Fields.partner.map((field) => (
                            <FloatingInput
                              name={field.name}
                              onChange={field.onChange}
                              placeholder={field.placeholder}
                              type={field.type}
                              required={field.required}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="my-[50px] md:text-left text-center">
                        <h3 className="uppercase text-[14px] font-bold mb-[20px]">
                          Terms of USe
                        </h3>
                        <p className="text-[12px]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquam eveniet sed nulla ipsa alias tenetur
                          dolor. Dolorum adipisci ab doloribus rem, dolores
                          nobis praesentium autem facilis ipsum quibusdam
                          doloremque fuga, vitae nisi, laborum laudantium.
                          Nostrum magnam quam, perspiciatis a possimus cum eius
                          id pariatur sapiente porro at ad corporis repudiandae
                          provident laboriosam perferendis consequuntur fugiat?
                          Quisquam assumenda tempora nemo alias odio quo, nam
                          esse veniam sint iure recusandae repudiandae, dolor
                          numquam aliquam. Ratione nemo nam repudiandae
                          necessitatibus consequatur eius corporis sit quo,
                          laboriosam architecto dolor veniam voluptas, placeat
                          possimus expedita quia maxime perspiciatis similique
                          distinctio iusto minima. Aliquid, debitis voluptate
                          eius iusto dolore dolorum nulla repellat alias totam
                          rem sed mollitia quaerat blanditiis natus inventore
                          autem ex laudantium distinctio molestias ratione
                          reprehenderit deleniti. Quia, est? Itaque vero odit
                          nam tempore consequuntur temporibus repellat ratione
                          veritatis quia esse architecto, impedit corrupti
                          sapiente expedita amet culpa totam ullam incidunt
                          commodi saepe dolore! Temporibus beatae aliquid labore
                          itaque soluta, adipisci nihil praesentium, doloremque
                          voluptatum culpa aperiam distinctio dolorum. Corporis,
                          quod facere. Ut incidunt reprehenderit, recusandae in
                          rem sapiente cum assumenda quo nihil beatae ab nisi
                          ducimus eveniet ipsum quaerat deleniti aspernatur
                          neque veniam corrupti nemo aperiam quae quod eligendi
                          totam! Repellat, quasi recusandae!
                        </p>
                      </div>
                      <div className="flex gap-[20px] items-center justify-center">
                        {(applicationData?.media || []).map((media, index) => (
                          <input
                            key={index}
                            type="hidden"
                            name={`attachment${index + 1}`}
                            value={media}
                          />
                        ))}
                        <div className="relative bg-gray-200 size-[100px] flex items-center justify-center text-[30px] rounded-[5px]">
                          {imagePreviews?.attachment1 ? (
                            <span
                              onClick={() => handleImageRemove("attachment1")}
                              className="z-2 size-[25px] bg-red-500 flex items-center justify-center rounded-full absolute top-0 right-0 text-[15px] text-white transform-[translate(25%,-25%)] cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </span>
                          ) : null}
                          {imagePreviews?.attachment1?.url ? (
                            <img
                              src={imagePreviews?.attachment1?.url}
                              className="size-[80px] rounded-[5px] object-cover"
                            />
                          ) : imagePreviews?.attachment1?.icon ? (
                            <FontAwesomeIcon
                              icon={imagePreviews?.attachment1?.icon}
                              className="text-gray-500 text-[70px]"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUpload} />
                          )}
                          <div className="size-full overflow-hidden absolute z-1">
                            <input
                              type="file"
                              name="attachment1"
                              className="scale-[10] cursor-pointer opacity-0"
                              onChange={fileChangeHandler}
                            />
                          </div>
                        </div>
                        <div className="relative bg-gray-200 size-[100px] flex items-center justify-center text-[30px] rounded-[5px]">
                          {imagePreviews?.attachment2 ? (
                            <span
                              onClick={() => handleImageRemove("attachment2")}
                              className="z-2 size-[25px] bg-red-500 flex items-center justify-center rounded-full absolute top-0 right-0 text-[15px] text-white transform-[translate(25%,-25%)] cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </span>
                          ) : null}
                          {imagePreviews?.attachment2?.url ? (
                            <img
                              src={imagePreviews?.attachment2?.url}
                              className="size-[80px] rounded-[5px] object-cover"
                            />
                          ) : imagePreviews?.attachment2?.icon ? (
                            <FontAwesomeIcon
                              icon={imagePreviews?.attachment2?.icon}
                              className="text-gray-500 text-[70px]"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUpload} />
                          )}
                          <div className="size-full overflow-hidden absolute z-1">
                            <input
                              type="file"
                              name="attachment2"
                              className="scale-[10] cursor-pointer opacity-0"
                              onChange={fileChangeHandler}
                            />
                          </div>
                        </div>
                        <div className="relative bg-gray-200 size-[100px] flex items-center justify-center text-[30px] rounded-[5px]">
                          {imagePreviews?.attachment3 ? (
                            <span
                              onClick={() => handleImageRemove("attachment3")}
                              className="z-2 size-[25px] bg-red-500 flex items-center justify-center rounded-full absolute top-0 right-0 text-[15px] text-white transform-[translate(25%,-25%)] cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </span>
                          ) : null}
                          {imagePreviews?.attachment3?.url ? (
                            <img
                              src={imagePreviews?.attachment3?.url}
                              className="size-[80px] rounded-[5px] object-cover"
                            />
                          ) : imagePreviews?.attachment3?.icon ? (
                            <FontAwesomeIcon
                              icon={imagePreviews?.attachment3?.icon}
                              className="text-gray-500 text-[70px]"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUpload} />
                          )}
                          <div className="size-full overflow-hidden absolute z-1">
                            <input
                              type="file"
                              name="attachment3"
                              className="scale-[10] cursor-pointer opacity-0"
                              onChange={fileChangeHandler}
                            />
                          </div>
                        </div>
                        <div className="relative bg-gray-200 size-[100px] flex items-center justify-center text-[30px] rounded-[5px]">
                          {imagePreviews?.attachment4 ? (
                            <span
                              onClick={() => handleImageRemove("attachment4")}
                              className="z-2 size-[25px] bg-red-500 flex items-center justify-center rounded-full absolute top-0 right-0 text-[15px] text-white transform-[translate(25%,-25%)] cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </span>
                          ) : null}
                          {imagePreviews?.attachment4?.url ? (
                            <img
                              src={imagePreviews?.attachment4?.url}
                              className="size-[80px] rounded-[5px] object-cover"
                            />
                          ) : imagePreviews?.attachment4?.icon ? (
                            <FontAwesomeIcon
                              icon={imagePreviews?.attachment4?.icon}
                              className="text-gray-500 text-[70px]"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUpload} />
                          )}
                          <div className="size-full overflow-hidden absolute z-1">
                            <input
                              type="file"
                              name="attachment4"
                              className="scale-[10] cursor-pointer opacity-0"
                              onChange={fileChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className={`mt-[20px] text-white w-fit px-[20px] py-[10px] leading-[1.5] text-[14px] self-center md:self-end min-w-[150px] flex gap-[10px] items-center justify-center`}
                  >
                    {applicationData ? "Apply" : "Next"}
                    <span className="in-disabled:flex hidden animate-spin size-[20px] rounded-full border-[3px] border-white border-b-transparent"></span>
                  </Button>
                </form>
              </>
            )}
          </div>

          {isUploading ? (
            <div className="fixed top-0 left-0 size-full bg-black/50 z-10 flex items-center justify-center">
              <div className="bg-white max-w-[250px] w-full p-[30px] rounded-[0.5rem] shadow flex items-center justify-center flex-col gap-[20px]">
                <div className="relative flex items-center justify-center overflow-hidden rounded-full size-[200px] bg-gray-300 text-[20px] font-bold inset-shadow-2xs p-[10px]">
                  <span
                    style={{ height: `${uploadingProgress}%` }}
                    className="absolute bottom-0 w-full bg-gray-800 duration-500 transition-[height]"
                  ></span>
                  <img
                    src={UPLOADING_ANIMATION}
                    className="relative z-1 size-[150px] rounded-full"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Apply;
