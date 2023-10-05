/* eslint-disable @typescript-eslint/no-explicit-any */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type SectionEditorHeaderProps = {
    resumeSectionTitle: string;
    resumeSectionIndex: number;
    editSectionTitle: (event: any, resumeSectionIndex: number) => void;
  };

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


  export default SectionEditorHeader