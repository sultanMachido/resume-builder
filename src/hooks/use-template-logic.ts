import { resumeObject } from "@/lib/utils";
import { ResumeSectionObject } from "@/types";
import { useState } from "react";

export const useTemplateLogic = (defaultResumeSections:ResumeSectionObject) => {
  const [resumeSections, setResumeSections] = useState([
    ...defaultResumeSections,
  ]);
  const [clearDate, setClearDate] = useState(false);

  const addContentToSection = (content: string, resumeSectionIndex: number) => {
    setClearDate(false);

    const newContent = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .addNewContentToResumeSection(content, resumeSectionIndex);

    setResumeSections(newContent);
  };

  const saveContent = (resumeSectionIndex: number) => {
    setClearDate(false);

    const savedContent = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .saveContentToResumeSection(resumeSectionIndex);

    setResumeSections(savedContent);
  };

  const addNewSection = (currentSectionIndex: number) => {
    const mergedSections = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .addNewSection(currentSectionIndex, "defaultSection");

    setResumeSections([...mergedSections]);
  };

  const handleDateAddition = (
    resumeSectionIndex: number,
    date: string,
    type: string,
  ) => {
    const copyOfResumeSection = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .addTimeRange(resumeSectionIndex, date, type);

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

  const handleSectionTitleEdit = (
    e: { target: { innerText: string } },
    resumeSectionIndex: number,
  ) => {
    const copyOfResumeSection = resumeObject
      .getCopyOfResumeObject(resumeSections)
      .editSectionTitle(resumeSectionIndex, e.target.innerText);

    setResumeSections(copyOfResumeSection);
  };

  return {
    addContentToSection,
    saveContent,
    addNewSection,
    handleDateAddition,
    clearResumeSectionNewContent,
    handleSectionTitleEdit,
    clearDate,
    resumeSections
  }
};
