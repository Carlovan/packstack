import * as React from "react";
import Caret from "../Caret";
import { SectionHeader } from "styles/common";
import { DragIcon } from "../Icons";
import { Draggable } from "react-beautiful-dnd";

interface ExpandablePanelProps {
  Header: JSX.Element;
  children: JSX.Element[] | JSX.Element;
  categoryId?: number;
  categoryIndex?: number;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
  Header,
  children,
  categoryId,
  categoryIndex,
}) => {
  const [visible, setVisible] = React.useState<boolean>(true);
  if (categoryId != null && categoryIndex != null) {
    return (
      <>
        <Draggable
          draggableId={categoryId.toString()}
          index={categoryIndex}
          key={categoryId.toString()}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <SectionHeader
                style={{
                  gridTemplateColumns: "30px minmax(auto, auto) 80px 10px",
                }}
              >
                <DragIcon {...provided.dragHandleProps} />
                {Header}
                <Caret visible={visible} onClick={() => setVisible(!visible)} />
              </SectionHeader>
              <div
                style={{
                  display: visible ? "block" : "none",
                  padding: "0 8px",
                }}
              >
                {children}
              </div>
            </div>
          )}
        </Draggable>
      </>
    );
  } else {
    return (
      <>
        <SectionHeader>
          {Header}
          <Caret visible={visible} onClick={() => setVisible(!visible)} />
        </SectionHeader>
        <div style={{ display: visible ? "block" : "none", padding: "0 8px" }}>
          {children}
        </div>
      </>
    );
  }
};

export default ExpandablePanel;
