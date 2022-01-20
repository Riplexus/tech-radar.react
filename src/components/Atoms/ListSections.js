import { useContext } from "react";
import { Context } from "@/store/data.context";

function ListSections() {
  const { data, setHighlightedSectionId } = useContext(Context);

  return (
    <ul onMouseLeave={() => setHighlightedSectionId(null)}>
      {data.sections.map((section) => (
        <li
          key={section.id}
          onMouseOver={() => setHighlightedSectionId(section.id)}
        >
          <p>{section.name}</p>
          <small>{section.description}</small>
        </li>
      ))}
    </ul>
  );
}

export default ListSections;
