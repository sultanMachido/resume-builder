/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

type TimeRangeProps = {
    handleDateAddition: (currentSectionIndex:number, value:string, type:string) => void;
    currentSectionIndex: number;
    clear: boolean;
  };

const TimeRange = ({
    handleDateAddition,
    currentSectionIndex,
    clear,
  }: TimeRangeProps) => {
    const [date, setDate] = useState({
      from: "",
      to: "",
    });
  
    useEffect(() => {
      if (clear) {
        setDate({
          from: "",
          to: "",
        });
      }
    }, [clear]);
  
    const addDate = (
      event: { target: { value: any } },
      currentSectionIndex: number,
      type: string,
    ) => {
      const { value } = event.target;
      if (type === "from") {
        setDate({
          ...date,
          from: value,
        });
        handleDateAddition(currentSectionIndex, value, type);
      }
  
      if (type === "to") {
        setDate({
          ...date,
          to: value,
        });
        handleDateAddition(currentSectionIndex, value, type);
      }
    };
    return (
      <div className="flex my-5 w-9/12 justify-between">
        <div>
          <p className="font-bold">From</p>
          <input
            type="date"
            onChange={(event) => addDate(event, currentSectionIndex, "from")}
            value={date?.from}
          />
        </div>
        <div>
          <p className="font-bold">To</p>
          <input
            type="date"
            onChange={(event) => addDate(event, currentSectionIndex, "to")}
            value={date?.to}
          />
        </div>
      </div>
    );
  };

  export default TimeRange