import { useState } from "react";
import { ContentState, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faListOl,
  faListUl,
  faPlus,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { stateToHTML } from "draft-js-export-html";

type TextEditorProps = {
  addNewSection: () => void;
  addToDocument: (content: string, resumeSectionIndex: number) => void;
  documentSectionId: number;
  saveContent: (resumeSectionIndex: number) => void;
  clearInput: (resumeSectionIndex: number) => void;
};
const TextEditor = ({
  addNewSection,
  addToDocument,
  documentSectionId,
  saveContent,
  clearInput
}: TextEditorProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const handleChange = (editorState) => {
    const contentState = editorState.getCurrentContent();

    const html = stateToHTML(contentState);
    addToDocument(html, documentSectionId);
    setEditorState(editorState);
  };

  const clearTextEditorContent = () => {
    const emptyContentState = ContentState.createFromText("");
    const editorState = EditorState.createWithContent(emptyContentState);
    setEditorState(editorState);
  };

  const _onBoldClick = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onUnOrderedListClick = () => {
    handleChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };

  const _onOrderedListClick = () => {
    handleChange(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  return (
    <div className="border-1">
      <div className="flex ">
        <Button
          onClick={_onBoldClick}
          className="bg-white-500 shadow-md border border-black rounded-sm text-black mr-2"
        >
          <FontAwesomeIcon icon={faBold} />
        </Button>
        <Button
          onClick={_onUnOrderedListClick}
          className="bg-white-500 shadow-md border border-black rounded-sm text-black mr-2"
        >
          <FontAwesomeIcon icon={faListUl} />
        </Button>
        <Button
          onClick={_onOrderedListClick}
          className="bg-white-500 shadow-md border border-black rounded-sm text-black mr-2"
        >
          <FontAwesomeIcon icon={faListOl} />
        </Button>
        <Button
          onClick={_onOrderedListClick}
          className="bg-white-500 shadow-md border border-black rounded-sm text-black mr-2"
        >
          <FontAwesomeIcon icon={faUnderline} />
        </Button>
      </div>
      <div className="border mt-5 p-2 border-black rounded-sm">
        <Editor editorState={editorState} onChange={handleChange} />
      </div>
      <div className="flex mt-5 w-8/12">
        <Button className="bg-blue-500 mr-2" onClick={addNewSection}>
          <FontAwesomeIcon icon={faPlus} />
          <p className="pl-2">Add New Section</p>
        </Button>
        <Button
          onClick={() => {
            saveContent(documentSectionId);
            clearTextEditorContent();
            clearInput(documentSectionId)
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
