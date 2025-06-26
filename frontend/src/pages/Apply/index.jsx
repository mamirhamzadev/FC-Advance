import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingInput from "../../components/Input";
import Button from "../../components/Button";
import { CONTACT_US_ROUTE, HOME_ROUTE } from "../../constants/routes";
import {
  faFilePdf,
  faInfo,
  faRotateRight,
  faUpload,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fields, alphabetValidator } from "./helper";
import { UPLOADING_ANIMATION } from "../../constants/images";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function Apply() {
  const sigCanvas = useRef(null);
  const params = useParams();
  const [envelopeId, setEnvelopeId] = useState("");
  const [message, setMessage] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([
    false,
    false,
    false,
    false,
  ]);

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

  const fileChangeHandler = (e, index) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    if (ext !== "pdf") {
      toast.error("Only pdf files are allowed");
      return handleImageRemove(index);
    }
    const previews = [...imagePreviews];
    previews[index] = true;
    setImagePreviews(previews);
  };

  const handleImageRemove = (index) => {
    const previews = [...imagePreviews];
    previews[index] = false;
    setImagePreviews(previews);
    const input = document.querySelector(`input#attachment${index}`);
    if (input) input.value = "";
  };

  function trimCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let top = null;
    let left = null;
    let right = null;
    let bottom = null;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3]; // alpha channel

        if (alpha !== 0) {
          if (top === null) {
            top = y;
          }
          if (left === null || x < left) {
            left = x;
          }
          if (right === null || x > right) {
            right = x;
          }
          if (bottom === null || y > bottom) {
            bottom = y;
          }
        }
      }
    }

    if (top === null) {
      // Entire canvas is empty
      return null;
    }

    const trimmedWidth = right - left + 1;
    const trimmedHeight = bottom - top + 1;

    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight;
    const trimmedCtx = trimmedCanvas.getContext("2d");

    trimmedCtx.putImageData(
      ctx.getImageData(left, top, trimmedWidth, trimmedHeight),
      0,
      0
    );

    return trimmedCanvas;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (applicationData) setIsUploading(true);
    setIsLoading(true);
    const payload = new FormData(e.target);
    payload.set("envelope_id", envelopeId);
    if (applicationData) {
      const canvas = trimCanvas(sigCanvas.current?.getCanvas());
      if (!canvas) {
        toast.error("Signatures are required");
        setIsUploading(false);
        setIsLoading(false);
        return;
      }
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      payload.set("signature", blob, "signature.png");
    }

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
        if (msg && !_is_submitted) toast.success(msg);
      })
      .catch((err) => toast.error(err?.response?.data?.msg))
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
        <div className="w-full flex items-center justify-center">
          <div className="wrapper flex flex-col justify-self-center !w-[calc(100%-20px)] !mx-[10px] mt-[30px] mb-[30px] md:mb-[80px] shadow-[0_0_10px_#cccccc] py-[30px] md:!px-[50px] !px-[20px]">
            {isSubmitted ? (
              <div className="flex items-center justify-center flex-col gap-[30px] font-bold">
                <span className="rounded-full size-[70px] border flex items-center justify-center text-[30px]">
                  <FontAwesomeIcon icon={faInfo} />
                </span>
                <p className="text-[16px] text-center">
                  {message.split("<br/>").map((part, index) => (
                    <span key={index} className="block text-center">
                      {part}
                    </span>
                  ))}
                </p>
                <Button
                  className="!mt-[10px]"
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

                          {Fields.business.map((field, index) => (
                            <FloatingInput
                              key={index}
                              name={field.name}
                              placeholder={field.placeholder}
                              type={field.type}
                              max={field?.max || ""}
                              onChange={field.onChange}
                              required={field.required}
                              // value={field.value}
                            />
                          ))}
                        </div>
                        <div className="flex flex-col gap-[20px] w-full">
                          <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                            Owner Information
                          </h3>
                          {Fields.owner.map((field, index) => (
                            <FloatingInput
                              key={index}
                              name={field.name}
                              onChange={field.onChange}
                              placeholder={field.placeholder}
                              max={field?.max || ""}
                              type={field.type}
                              required={field.required}
                              // value={field.value}
                            />
                          ))}
                        </div>

                        <div className="flex flex-col gap-[20px] w-full">
                          <h3 className="w-fit uppercase mb-[10px] pb-[5px] font-bold relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                            Partner Information
                          </h3>

                          {Fields.partner.map((field, index) => (
                            <FloatingInput
                              key={index}
                              name={field.name}
                              onChange={field.onChange}
                              placeholder={field.placeholder}
                              max={field?.max || ""}
                              type={field.type}
                              required={field.required}
                              // value={field.value}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="my-[50px] md:text-left text-center">
                        <h3 className="uppercase text-[14px] font-bold mb-[20px]">
                          Terms of USe
                        </h3>
                        <div className="text-[12px]">
                          <p className="font-bold">1. Introduction</p>
                          <p>
                            Welcome to Business fcadvance.com. These Terms and
                            Conditions govern your use of our website and
                            services. By accessing and using our website, you
                            agree to be bound by these Terms and Conditions. If
                            you do not agree with any part of these terms, you
                            must not use our website.
                          </p>
                          <p className="font-bold">2. Use of Our Website</p>
                          <p>
                            (a) You must be at least 18 years old to use our
                            website and services. By using our website, you
                            confirm that you are at least 18 years old.
                          </p>
                          <p>
                            (b) You may not use our website for any illegal or
                            unauthorized purposes. You agree to comply with all
                            applicable laws and regulations.
                          </p>
                          <p>
                            (c) We reserve the right to modify, suspend, or
                            discontinue any part of our website, services, or
                            content without prior n
                          </p>
                          <p>
                            (d) Your use of any information or materials on this
                            website is entirely at your own risk, for which we
                            shall not be liable.
                          </p>
                          <p className="font-bold">
                            3. Intellectual Property Rights
                          </p>
                          <p>
                            (a) All content on this website, including but not
                            limited to text, graphics, logos, images, videos,
                            and software, is the property of Business (Your
                            Company Name) and is protected by copyright and
                            other intellectual property laws.
                          </p>
                          <p>
                            (b) You may not reproduce, distribute, modify,
                            transmit, or use any part of our website's content
                            without our prior written consent.
                          </p>
                          <p className="font-bold">4. Privacy Policy</p>
                          <p>
                            (a) Our Privacy Policy outlines how we collect, use,
                            and protect your personal information. By using our
                            website, you consent to our Privacy Policy.
                          </p>
                          <p>
                            (b) We do not share or sell your personal
                            information to third parties.
                          </p>
                          <p className="font-bold">5. Disclaimer</p>
                          <p>
                            (a) The information provided on our website is for
                            general informational purposes only. We make no
                            warranties or representations about the accuracy,
                            completeness, or reliability of the content.
                          </p>
                          <p>
                            (b) We are not responsible for any damages or losses
                            resulting from the use of our website or any
                            information provided therein.
                          </p>
                          <p className="font-bold">
                            6. Links to Third-Party Websites
                          </p>
                          <p>
                            Our website may contain links to third-party
                            websites. We do not endorse or have any control over
                            the content or practices of these websites. Your use
                            of third-party websites is at your own risk.
                          </p>
                          <p className="font-bold">
                            7. Limitation of Liability
                          </p>
                          <p>
                            To the extent permitted by law, Business (Your
                            Company Name) shall not be liable for any direct,
                            indirect, incidental, consequential, or special
                            damages arising from or in any way related to your
                            use of our website or services.
                          </p>
                          <p className="font-bold">8. Indemnification</p>
                          <p>
                            You agree to indemnify and hold harmless Business
                            (Your Company Name), its officers, directors,
                            employees, and affiliates, from any claims, losses,
                            damages, liabilities, costs, or expenses (including
                            legal fees) arising out of your use of our website
                            or violation of these Terms and Conditions.
                          </p>
                          <p className="font-bold">
                            9. Governing Law and Jurisdiction
                          </p>
                          <p>
                            These Terms and Conditions shall be governed by and
                            construed in accordance with the laws of [Your
                            Jurisdiction]. Any disputes arising from or related
                            to these terms shall be subject to the exclusive
                            jurisdiction of the courts.
                          </p>
                          <p className="font-bold">
                            10. Changes to Terms and Conditions
                          </p>
                          <p>
                            We reserve the right to update or modify these Terms
                            and Conditions at any time without prior notice.
                            Your continued use of our website following the
                            posting of any changes constitutes your acceptance
                            of such changes.
                          </p>
                          <p className="font-bold">11. Contact Us</p>
                          <p>
                            If you have any questions or concerns about these
                            Terms and Conditions, please contact us at
                            info@fcadvance.com.
                          </p>
                        </div>
                      </div>
                      <div className="relative flex flex-col gap-[5px] items-center justify-center border p-[15px] mb-[30px] w-fit self-center rounded-md">
                        <p className="font-bold text-[14px] bg-white absolute top-0 transform-[translateY(-50%)] px-[10px]">
                          Upload PDF files
                        </p>
                        <div className="grid grid-cols-2 sm:flex gap-[20px] flex-wrap items-center justify-center">
                          {imagePreviews.map((preview, index) => (
                            <div
                              key={index}
                              className="relative bg-gray-200 size-[100px] flex items-center justify-center text-[30px] rounded-[5px]"
                            >
                              {preview && (
                                <span
                                  onClick={() => handleImageRemove(index)}
                                  className="z-2 size-[25px] bg-red-500 flex items-center justify-center rounded-full absolute top-0 right-0 text-[15px] text-white transform-[translate(25%,-25%)] cursor-pointer"
                                >
                                  <FontAwesomeIcon icon={faXmark} />
                                </span>
                              )}
                              {preview ? (
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  className="text-gray-500 text-[70px]"
                                />
                              ) : (
                                <FontAwesomeIcon icon={faUpload} />
                              )}
                              <div className="size-full overflow-hidden absolute z-1">
                                <input
                                  type="file"
                                  id={`attachment${index}`}
                                  name="attachment"
                                  accept="application/pdf"
                                  className="scale-[10] cursor-pointer opacity-0"
                                  onChange={(e) => fileChangeHandler(e, index)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
                  <div className="flex md:items-end items-center justify-between w-full md:flex-row flex-col">
                    <div className="flex-1">
                      {applicationData ? (
                        <div className="max-w-[350px] w-full">
                          <div className="flex items-end justify-between gap-[10px]">
                            <p className="font-bold text-[14px] flex-1">
                              Signatures*:
                            </p>
                            <button
                              type="button"
                              className="p-[2px]"
                              onClick={() => sigCanvas.current?.clear()}
                            >
                              <FontAwesomeIcon icon={faRotateRight} />
                            </button>
                          </div>
                          <div className="border rounded-md">
                            <SignatureCanvas
                              ref={sigCanvas}
                              canvasProps={{ className: "w-full !h-auto" }}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className={`mt-[20px] text-white w-fit px-[20px] py-[10px] leading-[1.5] text-[14px] self-center md:self-end min-w-[150px] flex gap-[10px] items-center justify-center justify-self-end`}
                    >
                      {applicationData ? "Apply" : "Next"}
                      <span className="in-disabled:flex hidden animate-spin size-[20px] rounded-full border-[3px] border-white border-b-transparent"></span>
                    </Button>
                  </div>
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
                <p className="text-gray-700 text-[14px] ">Uploading Data...</p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Apply;
