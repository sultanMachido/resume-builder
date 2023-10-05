/* eslint-disable @typescript-eslint/no-explicit-any */
import TextEditor from "../text-editor";
import { ResumeSectionList } from ".";
import { useTemplateLogic } from "@/hooks/use-template-logic";
import TimeRange from "./time-range";
import SectionEditorHeader from "./section-editor-header";

const defaultResumeSections = [
  {
    resumeSectionTitle: "Profile",
    resumeSectionNewContent: "",
    resumeSectionSavedContent: [],
  },
  {
    resumeSectionTitle: "Skills",
    resumeSectionNewContent: "",
    resumeSectionSavedContent: [],
  },
  {
    resumeSectionTitle: "Education",
    resumeSectionNewContent: "",
    resumeSectionSavedContent: [],
    timeRange: {
      from: "",
      to: "",
    },
  },
  {
    resumeSectionTitle: "Work Experience",
    resumeSectionNewContent: "",
    resumeSectionSavedContent: [],
    timeRange: {
      from: "",
      to: "",
    },
  },
  {
    resumeSectionTitle: "Portfolio",
    resumeSectionNewContent: "",
    resumeSectionSavedContent: [],
  },
];

const DefaultTemplate = () => {
  const {
    addContentToSection,
    addNewSection,
    handleDateAddition,
    handleSectionTitleEdit,
    clearResumeSectionNewContent,
    saveContent,
    clearDate,
    resumeSections,
  } = useTemplateLogic(defaultResumeSections);

  return (
    <section className="flex w-full justify-around">
      <div className="w-[33%]">
        {resumeSections?.length
          ? resumeSections.map(
              (
                section: { [key: string]: any },
                currentSectionIndex: number,
              ) => (
                <div className="rounded-md p-5 bg-red w-full shadow-lg mx-auto mt-2">
                  <SectionEditorHeader
                    resumeSectionTitle={section?.resumeSectionTitle}
                    editSectionTitle={handleSectionTitleEdit}
                    resumeSectionIndex={currentSectionIndex}
                  />
                  {section?.timeRange ? (
                    <TimeRange
                      handleDateAddition={handleDateAddition}
                      currentSectionIndex={currentSectionIndex}
                      clear={clearDate}
                    />
                  ) : null}
                  <div className="mt-2">
                    <TextEditor
                      addNewSection={() => addNewSection(currentSectionIndex)}
                      addToDocument={addContentToSection}
                      documentSectionId={currentSectionIndex}
                      saveContent={saveContent}
                      clearInput={clearResumeSectionNewContent}
                    />
                  </div>
                </div>
              ),
            )
          : null}
      </div>
      <div className="w-[60%]">
        <ResumeSectionList resumeSections={resumeSections} />
      </div>
    </section>
  );
};

export default DefaultTemplate;
