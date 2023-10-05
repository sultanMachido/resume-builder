import { formatDate } from "@/lib/utils";
import DefaultTemplate from "./default-template";
import { DefaultSectionObject, ResumeSectionObject } from "@/types";

type ResumeSectionListProps = {
  resumeSections: ResumeSectionObject;
};

type ResumeSectionProps = {
  resume: DefaultSectionObject;
};

export const ResumeSection = ({ resume }: ResumeSectionProps) => {
  const { resumeSectionSavedContent, resumeSectionNewContent, timeRange } =
    resume;

  return (
    <section className="w-full">
      <h3 className="font-bold text-lg">{resume?.resumeSectionTitle}</h3>
      <div className="w-full">
        {resumeSectionSavedContent?.length
          ? resumeSectionSavedContent.map((content) => (
              <div className="flex justify-between">
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.textContent,
                  }}
                ></div>
                {(content?.timeRange?.from || content?.timeRange?.to) && (
                  <div className="flex">
                    <p className="font-bold">
                      {formatDate(content?.timeRange?.from || "")} -{" "}
                    </p>{" "}
                    <p className="font-bold">
                      {" " + formatDate(content?.timeRange?.to || "")}
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

export const ResumeSectionList = ({ resumeSections }: ResumeSectionListProps) => {
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
