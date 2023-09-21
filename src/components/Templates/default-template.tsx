import { useState } from "react";
import TextEditor from "../text-editor";

const DefaultTemplate = () => {
  // use context API
  const [resumeSections, setResumeSections] = useState([
    "Profile",
    "Skills",
    "Education",
    "Work Experience",
    "Portfolio",
  ]);

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
  return (
    <>
      {resumeSections.length
        ? resumeSections.map((section: string, currentSectionIndex: number) => (
            <div className="rounded-md p-5 bg-red w-8/12 shadow-lg mx-auto mt-2">
              <div>
                <h2 className="text-center font-bold text-lg">{section}</h2>
              </div>
              <div className="mt-2">
                <TextEditor
                  addNewSection={() => addNewSection(currentSectionIndex)}
                />
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default DefaultTemplate;
