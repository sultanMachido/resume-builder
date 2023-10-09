import { formatDate } from "@/lib/utils";
import DefaultTemplate from "./default-template";
import { DefaultSectionObject, ResumeSectionObject } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type ResumeSectionListProps = {
  resumeSections: ResumeSectionObject;
};

type ResumeSectionProps = {
  resume: DefaultSectionObject;
};

export const ResumeSection = ({ resume }: ResumeSectionProps) => {
  const { resumeSectionSavedContent, resumeSectionNewContent, timeRange } =
    resume;
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showFromDateEditIcon, setShowFromDateEditIcon] = useState(false);
  const [showToDateEditIcon, setShowToDateEditIcon] = useState(false);

  return (
    <section className="w-full">
      <h3 className="font-bold text-lg">{resume?.resumeSectionTitle}</h3>
      <div className="w-full">
        {resumeSectionSavedContent?.length
          ? resumeSectionSavedContent.map((content) => (
              <div className="flex justify-between">
                <div className="flex">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.textContent,
                    }}
                    onMouseEnter={() => {
                      setShowEditIcon(true);
                    }}
                    onMouseLeave={() => {
                      setShowEditIcon(false);
                    }}
                    contentEditable={true}
                  ></div>
                  {showEditIcon && (
                    <sup>
                      <FontAwesomeIcon icon={faPencil} />
                    </sup>
                  )}
                </div>
                {(content?.timeRange?.from || content?.timeRange?.to) && (
                  <div className="flex">
                    <p
                      className="font-bold"
                      onMouseEnter={() => {
                        setShowFromDateEditIcon(true);
                      }}
                      onMouseLeave={() => {
                        setShowFromDateEditIcon(false);
                      }}
                      contentEditable={true}
                    >
                      {formatDate(content?.timeRange?.from || "")} -{" "}
                      {showFromDateEditIcon && (
                        <sup>
                          <FontAwesomeIcon icon={faPencil} />
                        </sup>
                      )}
                    </p>{" "}
                    <p
                      className="font-bold"
                      onMouseEnter={() => {
                        setShowToDateEditIcon(true);
                      }}
                      onMouseLeave={() => {
                        setShowToDateEditIcon(false);
                      }}
                      contentEditable={true}
                    >
                      {" " + formatDate(content?.timeRange?.to || "")}
                      {showToDateEditIcon && (
                        <sup>
                          <FontAwesomeIcon icon={faPencil} />
                        </sup>
                      )}
                    </p>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
      {resumeSectionNewContent ? (
        <div className="w-full flex justify-between">
          <div
            dangerouslySetInnerHTML={{
              __html: resumeSectionNewContent,
            }}
            className="w-9/12"
          ></div>
          {(timeRange?.from || timeRange?.to) && (
            <div className="flex">
              <p className="font-bold">{timeRange?.from} - </p>
              <p className="font-bold">{timeRange?.to}</p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
};

export const ResumeSectionList = ({
  resumeSections,
}: ResumeSectionListProps) => {
  return (
    <>
      {resumeSections.map((resume) => (
        <ResumeSection resume={resume} />
      ))}
    </>
  );
};

const Templates = {
  DefaultTemplate,
};

export default Templates;
