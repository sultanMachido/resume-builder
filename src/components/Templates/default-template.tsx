/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TextEditor from "../text-editor";
import { ResumeSectionList } from ".";
import { resumeObject, resumeObjectBuilder } from "@/lib/utils";

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

const TimeRange = ({ handleDateAddition, currentSectionIndex, clear }) => {
  const [date, setDate] = useState({
    from: "",
    to: "",
  });

  useEffect(()=>{
     if (clear) {
      setDate({
        from: "",
        to: "",
      })
     }
  },[clear])

  const addDate = (
    event: { target: { value: any } },
    currentSectionIndex: number,
    type: string,
  ) => {
    const { value } = event.target;
    if (type === "from") {
      setDate({
        ...date,
        from: value,
      });
      handleDateAddition(currentSectionIndex, value, type);
    }

    if (type === "to") {
      setDate({
        ...date,
        to: value,
      });
      handleDateAddition(currentSectionIndex, value, type);
    }
  };
  return (
    <div className="flex my-5 w-9/12 justify-between">
      <div>
        <p className="font-bold">From</p>
        <input
          type="date"
          onChange={(event) => addDate(event, currentSectionIndex, "from")}
          value={date?.from}
        />
      </div>
      <div>
        <p className="font-bold">To</p>
        <input
          type="date"
          onChange={(event) => addDate(event, currentSectionIndex, "to")}
          value={date?.to}
        />
      </div>
    </div>
  );
};

const DefaultTemplate = () => {
  const [resumeSections, setResumeSections] = useState([
    ...defaultResumeSections,
  ]);
  const [clearDate, setClearDate] = useState(false);

  const addContentToSection = (content: string, resumeSectionIndex: number) => {
    setClearDate(false)
    const newContent = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .addNewContentToResumeSection(content, resumeSectionIndex);

    setResumeSections(newContent);
  };

  const saveContent = (resumeSectionIndex: number) => {
    setClearDate(false)
    const savedContent = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .saveContentToResumeSection(resumeSectionIndex);

    setResumeSections(savedContent);
  };

  const addNewSection = (currentSectionIndex: number) => {
    const copyOfResumeSections = [...resumeSections];
    const topHalfSection = copyOfResumeSections.splice(
      0,
      currentSectionIndex + 1,
    );
    const bottomHalfSection = [...copyOfResumeSections];

    if (!bottomHalfSection.length) {
      bottomHalfSection.push("New Section");
    } else {
      topHalfSection.push("New Section");
    }

    const mergedSections = [...topHalfSection, ...bottomHalfSection];

    setResumeSections([...mergedSections]);
  };
  const handleDateAddition = (
    resumeSectionIndex: number,
    date: string,
    type: string,
  ) => {
    const copyOfResumeSection = [...resumeSections];
    copyOfResumeSection[resumeSectionIndex] = {
      ...copyOfResumeSection[resumeSectionIndex],
      timeRange: {
        ...copyOfResumeSection[resumeSectionIndex]?.timeRange,
        [type]: date,
      },
    };
    setResumeSections(copyOfResumeSection);
  };

  const clearResumeSectionNewContent = (resumeSectionIndex: number) => {
    const copyOfResumeSection = [...resumeSections];
    copyOfResumeSection[resumeSectionIndex] = {
      ...copyOfResumeSection[resumeSectionIndex],
      resumeSectionNewContent: "",
    };
    setClearDate(true);
    setResumeSections(copyOfResumeSection);
  };
  return (
    <section className="flex w-full justify-around">
      <div className="w-[33%]">
        {resumeSections.length
          ? resumeSections.map(
              (
                section: { [key: string]: any },
                currentSectionIndex: number,
              ) => (
                <div className="rounded-md p-5 bg-red w-full shadow-lg mx-auto mt-2">
                  <div>
                    <h2 className="text-center font-bold text-lg">
                      {section?.resumeSectionTitle}
                    </h2>
                  </div>
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
