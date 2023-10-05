/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TextEditor from "../text-editor";
import { ResumeSectionList } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useTemplateLogic } from "@/hooks/use-template-logic";

type SectionEditorHeaderProps = {
  resumeSectionTitle: string;
  resumeSectionIndex: number;
  editSectionTitle: (event: any, resumeSectionIndex: number) => void;
};

type TimeRangeProps = {
  handleDateAddition: (currentSectionIndex:number, value:string, type:string) => void;
  currentSectionIndex: number;
  clear: boolean;
};

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

let debounceTimer: number;
const SectionEditorHeader = ({
  resumeSectionTitle,
  resumeSectionIndex,
  editSectionTitle,
}: SectionEditorHeaderProps) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex justify-center"
        onMouseEnter={() => {
          setShowEditIcon(true);
        }}
        onMouseLeave={() => {
          setShowEditIcon(false);
        }}
      >
        <h2
          className="text-center font-bold text-lg"
          contentEditable={true}
          onInput={(event) => {
            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(() => {
              editSectionTitle(event, resumeSectionIndex);
            }, 3000) as unknown as number;
          }}
        >
          {resumeSectionTitle}
        </h2>
        {showEditIcon && (
          <sup>
            <FontAwesomeIcon icon={faPencil} />
          </sup>
        )}
      </div>
    </div>
  );
};

const TimeRange = ({
  handleDateAddition,
  currentSectionIndex,
  clear,
}: TimeRangeProps) => {
  const [date, setDate] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    if (clear) {
      setDate({
        from: "",
        to: "",
      });
    }
  }, [clear]);

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
