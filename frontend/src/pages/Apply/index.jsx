import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingInput from "../../components/Input";
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
  faUpload,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
  const [envelopeId, setEnvelopeId] = useState("");
  const [companyData, setCompanyData] = useState({});
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    if (!Object.keys(companyData || {}).length) return;

    const previewsObj = {};
    (companyData?.media || []).forEach((url, index) => {
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
  }, [companyData]);

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
    if (envelopeId) setIsUploading(true);
    setIsFetching(true);
    const payload = new FormData(e.target);

    const axios_promise = envelopeId
      ? axios.post("/api/companies/create", payload, {
          onUploadProgress: (event) =>
            setUploadingProgress(Math.round(event.progress * 100)),
        })
      : axios.post("/api/companies/get-envelope-id", payload, {
          headers: { "Content-Type": "application/json" },
        });

    axios_promise
      .then((res) => {
        const company = res.data?.data?.company;
        setEnvelopeId(company?.envelope_id);
        setCompanyData(company);
        if (res.data?.msg) toast(res.data?.msg);
      })
      .catch((err) => {
        if (err.msg) toast.error(err.msg);
        setEnvelopeId(envelopeId ? envelopeId : "");
      })
      .finally(() => {
        setUploadingProgress(0);
        setIsUploading(false);
        setIsFetching(false);
      });
  };

  return (
    <>
      <div className="wrapper flex flex-col justify-self-center !w-[calc(100%-20px)] !mx-[10px] mt-[30px] mb-[30px] md:mb-[80px] border rounded-[10px] py-[30px] md:!px-[50px] !px-[20px]">
        {companyData?.is_applied ? (
          <div className="flex items-center justify-center py-[50px] text-[14px] text-green-600 font-bold">
            <p>Your application submitted successfully</p>
          </div>
        ) : (
          <>
            <h2 className="text-[26px] md:text-[30px] font-bold text-[#6fbf30] text-center">
              Funding Application
            </h2>
            {envelopeId ? (
              <p className="text-[14px] mt-[10px] text-center">
                Envelope ID: {envelopeId}
              </p>
            ) : null}
            <span className="pb-[10px] border-b-[2px] border-b-[#6fbf30] block"></span>
            <p className="mt-[10px] text-[12px] text-gray-400 md:text-left text-center">
              Thank you for placing your trust in FC Advance. Please review
              attached information for submission
            </p>
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              <div className="flex gap-[50px] md:flex-row flex-col mt-[50px]">
                <FloatingInput
                  name="submitted_by[full_name]"
                  placeholder="Your Full Name"
                  value={companyData?.submitted_by?.full_name}
                  required
                  readOnly={!!envelopeId}
                />
                <FloatingInput
                  type="email"
                  name="submitted_by[email]"
                  placeholder="Your Email"
                  value={companyData?.submitted_by?.email}
                  required
                  readOnly={!!envelopeId}
                />
              </div>
              {envelopeId ? (
                <>
                  <input type="hidden" name="envelope_id" value={envelopeId} />
                  <div className="mt-[50px] flex gap-[50px] md:flex-row flex-col">
                    <div className="flex flex-col gap-[20px] w-full">
                      <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-[#6fbf30]">
                        Business Information
                      </h3>

                      <FloatingInput
                        name="business[name]"
                        placeholder="Legal Company Name"
                        value={companyData?.business?.name}
                        required
                      />
                      <FloatingInput
                        name="business[type]"
                        placeholder="Doing Business As"
                        value={companyData?.business?.type}
                        required
                      />
                      <FloatingInput
                        name="business[website]"
                        placeholder="Company Website"
                        value={companyData?.business?.website}
                      />
                      <FloatingInput
                        name="business[tax_id]"
                        placeholder="Tax ID/EIN"
                        value={companyData?.business?.tax_id}
                        required
                      />
                      <FloatingInput
                        type="date"
                        name="business[start_date]"
                        placeholder="Business Start Date"
                        value={
                          companyData?.business?.start_date
                            ? new Date(companyData?.business?.start_date)
                                ?.toISOString()
                                ?.split("T")?.[0]
                            : ""
                        }
                        required
                      />
                      <FloatingInput
                        name="business[state_of_incorporation]"
                        placeholder="State of Incorporation"
                        value={companyData?.business?.state_of_incorporation}
                        required
                      />
                      <FloatingInput
                        name="business[industry]"
                        placeholder="Industry"
                        value={companyData?.business?.industry}
                        required
                      />
                      <FloatingInput
                        name="business[phone]"
                        placeholder="Phone"
                        value={companyData?.business?.phone}
                        required
                      />
                      <FloatingInput
                        name="business[address]"
                        placeholder="Address"
                        value={companyData?.business?.address}
                        required
                      />
                      <FloatingInput
                        name="business[city]"
                        placeholder="City"
                        value={companyData?.business?.city}
                        required
                      />
                      <FloatingInput
                        name="business[state]"
                        placeholder="State"
                        value={companyData?.business?.state}
                        required
                      />
                      <FloatingInput
                        name="business[zip]"
                        placeholder="Zip"
                        value={companyData?.business?.zip}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-[20px] w-full">
                      <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-[#6fbf30]">
                        Owner Information
                      </h3>

                      <FloatingInput
                        name="owner[full_name]"
                        placeholder="Full Name"
                        value={companyData?.owner?.full_name}
                        required
                      />
                      <FloatingInput
                        name="owner[ownership_percent]"
                        placeholder="Ownership %"
                        value={companyData?.owner?.ownership_percent}
                        required
                      />
                      <FloatingInput
                        type="email"
                        name="owner[email]"
                        placeholder="Business Email"
                        value={companyData?.owner?.email}
                      />
                      <FloatingInput
                        name="owner[ssn]"
                        placeholder="Social Security Number"
                        value={companyData?.owner?.ssn}
                        required
                      />
                      <FloatingInput
                        name="owner[phone]"
                        placeholder="Mobile Phone"
                        value={companyData?.owner?.phone}
                        required
                      />
                      <FloatingInput
                        name="owner[fico_score]"
                        placeholder="FICO Score"
                        value={companyData?.owner?.fico_score}
                        required
                      />
                      <FloatingInput
                        name="owner[address][line1]"
                        placeholder="Address Line 1"
                        value={companyData?.owner?.address?.line1}
                        required
                      />
                      <FloatingInput
                        name="owner[address][line2]"
                        placeholder="Address Line 2"
                        value={companyData?.owner?.address?.line2}
                      />
                      <FloatingInput
                        name="owner[city]"
                        value={companyData?.owner?.city}
                        placeholder="City"
                        required
                      />
                      <FloatingInput
                        name="owner[state]"
                        placeholder="State"
                        value={companyData?.owner?.state}
                        required
                      />
                      <FloatingInput
                        name="owner[zip]"
                        value={companyData?.owner?.zip}
                        placeholder="Zip"
                        required
                      />
                      <FloatingInput
                        type="date"
                        name="owner[dob]"
                        placeholder="Date of Birth"
                        value={
                          companyData?.owner?.dob
                            ? new Date(companyData?.owner?.dob)
                                ?.toISOString()
                                ?.split("T")?.[0]
                            : ""
                        }
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-[20px] w-full">
                      <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-[#6fbf30]">
                        Partner Information
                      </h3>

                      <FloatingInput
                        name="partner[full_name]"
                        placeholder="Full Name"
                        value={companyData?.partner?.full_name}
                      />
                      <FloatingInput
                        name="partner[ownership_percent]"
                        placeholder="Ownership %"
                        value={companyData?.partner?.ownership_percent}
                      />
                      <FloatingInput
                        type="email"
                        name="partner[email]"
                        placeholder="Business Email"
                        value={companyData?.partner?.email}
                      />
                      <FloatingInput
                        name="partner[ssn]"
                        placeholder="Social Security Number"
                        value={companyData?.partner?.ssn}
                      />
                      <FloatingInput
                        name="partner[phone]"
                        placeholder="Mobile Phone"
                        value={companyData?.partner?.phone}
                      />
                      <FloatingInput
                        name="partner[fico_score]"
                        placeholder="FICO Score"
                        value={companyData?.partner?.fico_score}
                      />
                      <FloatingInput
                        name="partner[address][line1]"
                        placeholder="Address Line 1"
                        value={companyData?.partner?.address?.line1}
                      />
                      <FloatingInput
                        name="partner[address][line2]"
                        placeholder="Address Line 2"
                        value={companyData?.partner?.address?.line2}
                      />
                      <FloatingInput
                        name="partner[city]"
                        value={companyData?.partner?.city}
                        placeholder="City"
                      />
                      <FloatingInput
                        name="partner[state]"
                        value={companyData?.partner?.state}
                        placeholder="State"
                      />
                      <FloatingInput
                        name="partner[zip]"
                        value={companyData?.partner?.zip}
                        placeholder="Zip"
                      />
                      <FloatingInput
                        type="date"
                        name="partner[dob]"
                        placeholder="Date of Birth"
                        value={
                          companyData?.partner?.dob
                            ? new Date(companyData?.partner?.dob)
                                ?.toISOString()
                                ?.split("T")?.[0]
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="my-[50px] md:text-left text-center">
                    <h3 className="uppercase text-[14px] font-bold mb-[20px]">
                      Terms of USe
                    </h3>
                    <p className="text-[12px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquam eveniet sed nulla ipsa alias tenetur dolor.
                      Dolorum adipisci ab doloribus rem, dolores nobis
                      praesentium autem facilis ipsum quibusdam doloremque fuga,
                      vitae nisi, laborum laudantium. Nostrum magnam quam,
                      perspiciatis a possimus cum eius id pariatur sapiente
                      porro at ad corporis repudiandae provident laboriosam
                      perferendis consequuntur fugiat? Quisquam assumenda
                      tempora nemo alias odio quo, nam esse veniam sint iure
                      recusandae repudiandae, dolor numquam aliquam. Ratione
                      nemo nam repudiandae necessitatibus consequatur eius
                      corporis sit quo, laboriosam architecto dolor veniam
                      voluptas, placeat possimus expedita quia maxime
                      perspiciatis similique distinctio iusto minima. Aliquid,
                      debitis voluptate eius iusto dolore dolorum nulla repellat
                      alias totam rem sed mollitia quaerat blanditiis natus
                      inventore autem ex laudantium distinctio molestias ratione
                      reprehenderit deleniti. Quia, est? Itaque vero odit nam
                      tempore consequuntur temporibus repellat ratione veritatis
                      quia esse architecto, impedit corrupti sapiente expedita
                      amet culpa totam ullam incidunt commodi saepe dolore!
                      Temporibus beatae aliquid labore itaque soluta, adipisci
                      nihil praesentium, doloremque voluptatum culpa aperiam
                      distinctio dolorum. Corporis, quod facere. Ut incidunt
                      reprehenderit, recusandae in rem sapiente cum assumenda
                      quo nihil beatae ab nisi ducimus eveniet ipsum quaerat
                      deleniti aspernatur neque veniam corrupti nemo aperiam
                      quae quod eligendi totam! Repellat, quasi recusandae!
                    </p>
                  </div>
                  <div className="flex gap-[20px] items-center justify-center">
                    {(companyData?.media || []).map((media, index) => (
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
              <button
                disabled={isFetching}
                className="mt-[20px] text-white w-fit px-[20px] py-[10px] leading-[1.5] text-[14px] self-center md:self-end min-w-[150px] flex gap-[10px] items-center justify-center disabled:bg-blue-300 disabled:!cursor-not-allowed bg-blue-600"
              >
                {envelopeId ? "Apply" : "Next"}
                <span className="in-disabled:flex hidden animate-spin size-[20px] rounded-full border-[3px] border-white border-b-transparent"></span>
              </button>
            </form>
          </>
        )}
      </div>

      {isUploading ? (
        <div className="fixed top-0 left-0 size-full bg-black/50 z-10 flex items-center justify-center">
          <div className="bg-white max-w-[250px] w-full p-[30px] rounded-[0.5rem] shadow flex items-center justify-center flex-col gap-[20px]">
            <div className="relative flex items-center justify-center overflow-hidden rounded-full size-[100px] bg-green-100 text-[20px] font-bold inset-shadow-2xs">
              <span
                style={{ height: `${uploadingProgress}%` }}
                className="absolute bottom-0 w-full bg-green-400"
              ></span>
              <span className="relative">{uploadingProgress}%</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Apply;
