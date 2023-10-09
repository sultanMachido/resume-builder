/* eslint-disable @typescript-eslint/no-explicit-any */
import TextEditor from "../text-editor";
import { ResumeSectionList } from ".";
import { useTemplateLogic } from "@/hooks/use-template-logic";
import TimeRange from "./time-range";
import SectionEditorHeader from "./section-editor-header";
import { useState } from "react";
import UserBio, { UserBioEditor } from "./user-bio";
import { jsPDF } from "jspdf";
import { Button } from "../ui/button";


type UserBioData = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  country?: string;
};

const userData:UserBioData = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  country: "",
};

type ResumePreviewProps = {
  children: React.ReactNode
}



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

const ResumePreview = ({ children }:ResumePreviewProps) => {
  return <>{children}</>;
};


const DefaultTemplate = () => {
  const [userBioData, setUserBioData] = useState(userData);

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

  const handleBioDataChange = (data:UserBioData) => {
    setUserBioData(data);
  };

  const generatePdf = () => {
    const pdf = new jsPDF("p", "pt", "letter");
    const data = document.querySelector("#resumePreview");
    pdf.addFont("roboto", "pdf", "normal", "bold");
    const formattedData = data as HTMLElement;
    pdf
      .html(formattedData, {
        margin: [10, 10, 10, 10],
        autoPaging: "text",
      })
      .then(() => {
        pdf.save("resume.pdf");
      });
  };

  return (
    <section className="flex w-full justify-around">
      <div className="w-[33%] h-[90vh] overflow-y-scroll">
        <UserBioEditor addUserBioData={handleBioDataChange} />
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
        <div id="resumePreview">
          <ResumePreview>
            <UserBio userBioData={userBioData} />
            <ResumeSectionList resumeSections={resumeSections} />
          </ResumePreview>
        </div>
        <div>
          <Button onClick={generatePdf}>Generate PDF</Button>
        </div>
      </div>
    </section>
  );
};

export default DefaultTemplate;
