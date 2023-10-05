export type DefaultSectionObject = {
  resumeSectionTitle: string;
  resumeSectionNewContent: string;
  resumeSectionSavedContent: {
    textContent: string;
    timeRange?: {
      from?: string;
      to?: string;
    };
  }[];
  timeRange?: {
    from?: string;
    to?: string;
  };
};

export type ContentToSave = {
    textContent: string;
    timeRange?: {
      from?: string;
      to?: string;
    };
}

export type ResumeSectionObject = DefaultSectionObject[];
