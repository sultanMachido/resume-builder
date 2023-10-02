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

export const resumeObjectBuilder = () => {
  return {
    copyOfResume: [],
    getCopyOfResumeObject: function (resume) {
      const copyOfResume = [...resume];
      this.copyOfResume = copyOfResume;
      return this;
    },
    addNewContentToResumeSection: function (
      content: string,
      resumeSectionIndex: number,
    ) {
      this.copyOfResume[resumeSectionIndex] = {
        ...this.copyOfResume[resumeSectionIndex],
        resumeSectionNewContent: content,
      };
      return this.copyOfResume;
    },
    saveContentToResumeSection: function (resumeSectionIndex: number) {
      const textContent =
        this.copyOfResume[resumeSectionIndex]?.resumeSectionNewContent;
        console.log(this.copyOfResume[resumeSectionIndex]?.timeRange)
      const time = this.copyOfResume[resumeSectionIndex]?.timeRange;
      let contentToSave = {
        textContent: textContent,
      }
      if (time) {
        contentToSave = {
          ...contentToSave,
          timeRange: time,
        }; 
      }

      console.log(contentToSave,"here")
      this.copyOfResume[resumeSectionIndex]?.resumeSectionSavedContent.push(
        contentToSave
      );
      return this.copyOfResume;
    },
  };
};

export const resumeObject = resumeObjectBuilder();
