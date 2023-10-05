import { ContentToSave, DefaultSectionObject, ResumeSectionObject } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v1 as uuidv1 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getContentUniqueId = (documentSectionId: string) => {
  const uniqueId = uuidv1();
  return `${documentSectionId}_${uniqueId}`;
};

export const formatDate = (date: string) => {
  return date.replace(/-/g, "/");
};

export const resumeObjectBuilder = () => {
  return {
    copyOfResume: [] as ResumeSectionObject,
    getCopyOfResumeObject: function (resume: ResumeSectionObject) {
      const copyOfResume = [...resume];
      this.copyOfResume = copyOfResume;
      return this;
    },
    addNewContentToResumeSection: function (
      content: string,
      resumeSectionIndex: number,
    ) {
      const { copyOfResume } = this;
      copyOfResume[resumeSectionIndex] = {
        ...copyOfResume[resumeSectionIndex],
        resumeSectionNewContent: content,
      };
      return this.copyOfResume;
    },
    saveContentToResumeSection: function (resumeSectionIndex: number) {
      const { copyOfResume } = this;

      const textContent =
        copyOfResume[resumeSectionIndex]?.resumeSectionNewContent;

      const time = copyOfResume[resumeSectionIndex]?.timeRange;

      let contentToSave:ContentToSave = {
        textContent: textContent,
      };

      if (time) {
        contentToSave = {
          ...contentToSave,
          timeRange: time,
        };
      }

      copyOfResume[resumeSectionIndex]?.resumeSectionSavedContent.push(
        contentToSave,
      );

      return this.copyOfResume;
    },
    addTimeRange: function (
      resumeSectionIndex: number,
      date: string,
      type: string,
    ) {
      const { copyOfResume } = this;

      copyOfResume[resumeSectionIndex] = {
        ...copyOfResume[resumeSectionIndex],
        timeRange: {
          ...copyOfResume[resumeSectionIndex]?.timeRange,
          [type]: date,
        },
      };

      return this.copyOfResume;
    },
    addNewSection: function (
      resumeSectionIndex: number,
      resumeSectionType: string,
    ) {
      const { copyOfResume: copyOfResumeSections } = this;
      const topHalfSection = copyOfResumeSections.splice(
        0,
        resumeSectionIndex + 1,
      );
      const bottomHalfSection: ResumeSectionObject = [...copyOfResumeSections];

      const newResumeSectionObject =
        createResumeSectionObject(resumeSectionType);

      if (!bottomHalfSection.length) {
        bottomHalfSection.push(newResumeSectionObject as DefaultSectionObject);
      } else {
        topHalfSection.push(newResumeSectionObject as DefaultSectionObject);
      }

      const mergedSections = [...topHalfSection, ...bottomHalfSection];
      return mergedSections;
    },
    editSectionTitle: function (resumeSectionIndex: number, newTitle: string) {
      const { copyOfResume } = this;

      copyOfResume[resumeSectionIndex] = {
        ...copyOfResume[resumeSectionIndex],
        resumeSectionTitle: newTitle,
      };

      return this.copyOfResume;
    },
  };
};

export const resumeObject = resumeObjectBuilder();

export const createResumeSectionObject = (type: string) => {
  switch (type) {
    case "defaultSection":
      return {
        resumeSectionTitle: "New Section",
        resumeSectionNewContent: "",
        resumeSectionSavedContent: [],
      };
    case "timeRangeSection":
      return {
        resumeSectionTitle: "New Section",
        resumeSectionNewContent: "",
        resumeSectionSavedContent: [],
        timeRange: {
          from: "",
          to: "",
        },
      };
    default:
      return {};
  }
};
