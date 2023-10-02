import DefaultTemplate from "./default-template";

export const ResumeSection = ({ resume }) => {
  const { resumeSectionSavedContent, resumeSectionNewContent, timeRange } =
    resume;
  console.log(resumeSectionSavedContent, "saved");
  return (
    <section className="w-full">
      <h3 className="font-bold text-lg">{resume?.resumeSectionTitle}</h3>
      <div className="w-full">
        {resumeSectionSavedContent.length
          ? resumeSectionSavedContent.map((content) => (
              <div className="flex justify-between">
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.textContent,
                  }}
                ></div>
                {(content?.timeRange?.from || content?.timeRange?.to) && (
                  <div>
                    <p>
                      {content?.timeRange?.from}-{content?.timeRange?.to}
                    </p>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
      <div className="w-full flex justify-between">
        <div
          dangerouslySetInnerHTML={{
            __html: resumeSectionNewContent,
          }}
          className="w-9/12"
        ></div>
        {(timeRange?.from || timeRange?.to) && (
          <div>
            <p>
              {timeRange?.from}-{timeRange?.to}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export const ResumeSectionList = ({ resumeSections }) => {
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
