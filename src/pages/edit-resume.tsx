import Templates from "@/components/Templates";
import TextEditor from "@/components/text-editor";

type SectionListProps = {
  sections: string[];
  addNewSection: (currentSectionIndex: number) => void;
};

export const SectionList = ({ sections, addNewSection }: SectionListProps) => {
  console.log(sections, "sections");
  if (!sections.length) {
    return <></>;
  }
  return (
    <>
      {sections.length
        ? sections.map((section: string, currentSectionIndex: number) => (
            <div
              className="rounded-md p-5 bg-red w-8/12 shadow-lg mx-auto mt-2"
            >
              <div>
                <p className="text-center font-bold">{section}</p>
              </div>
              <div className="">
                <TextEditor addNewSection={() => addNewSection(currentSectionIndex)}/>
              </div>
            </div>
          ))
        : null}
    </>
  );
};
const EditResume = () => {
  const Template = Templates["DefaultTemplate"];
  return (
    <section className="w-6/12">
      <Template />
    </section>
  );
};

export default EditResume;
