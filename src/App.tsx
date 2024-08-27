import { Race, races } from "./assets/f1";
import { useEffect } from "react";

function toggleStickyRow(rowId: string) {
  const element = document.getElementById(rowId);

  element?.classList.toggle("sticky");
  updateStickyRowsPositions();
}

function updateStickyRowsPositions() {
  const stickyTrElements = document.querySelectorAll(
    "tr.sticky",
  ) as NodeListOf<HTMLElement>;

  let cumulativeTrHeight = 0;
  stickyTrElements.forEach((el) => {
    el.style.top = `${cumulativeTrHeight}px`;
    cumulativeTrHeight += el.offsetHeight;
  });

  const stickyTdElements = document.querySelectorAll(
    `tr.sticky > td.sticky`,
  ) as NodeListOf<HTMLElement>;

  let cumulativeTdHeight = 0;
  stickyTdElements.forEach((el) => {
    el.style.top = `${cumulativeTdHeight}px`;
    cumulativeTdHeight += el.offsetHeight;
  });
}

function toggleStickyColumn(header: string) {
  const th = document.getElementById(`th-${header}`);
  th?.classList.toggle("sticky");

  const tds = document.querySelectorAll(`[data-id=td-${header}]`);
  tds?.forEach((td) => {
    td.classList.toggle("sticky");
    td.classList.toggle("bg-blue-100");
  });

  updateStickyColumnsPositions();
}

function updateStickyColumnsPositions() {
  const stickyThElements = document.querySelectorAll(
    "th.sticky",
  ) as NodeListOf<HTMLElement>;

  let cumulativeThWidth = 0;
  stickyThElements.forEach((el) => {
    el.style.left = `${cumulativeThWidth}px`;
    cumulativeThWidth += el.offsetWidth;
  });

  const stickyTdElements = document.querySelectorAll(
    `td.sticky`,
  ) as NodeListOf<HTMLElement>;

  const amountOfColumns = stickyThElements.length;
  console.log("amountOfColumns", amountOfColumns);

  let cumulativeTdWidth = 0;
  stickyTdElements.forEach((el, index) => {
    el.style.left = `${cumulativeTdWidth}px`;

    const remainder = (index + 1) % amountOfColumns;
    console.log("remainder", remainder);

    if (remainder === 0) {
      cumulativeTdWidth = 0;
      return;
    }

    cumulativeTdWidth += el.offsetWidth;
  });
}

function App() {
  const headers = Object.keys(races[0]) as (keyof Race)[];

  useEffect(() => {
    window.addEventListener("resize", updateStickyRowsPositions);

    return () => {
      window.removeEventListener("resize", updateStickyRowsPositions);
    };
  }, []);

  return (
    <>
      <div>
        <table className="w-[3000px] border-collapse border border-slate-400">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  id={`th-${header}`}
                  className={`border border-slate-300 has-[:checked]:bg-blue-100`}
                >
                  <label htmlFor={`checkbox-${header}`} className="p-3">
                    <input
                      type="checkbox"
                      data-id={`checkbox-${header}`}
                      className="peer mr-2"
                      id={`checkbox-${header}`}
                      onChange={() => toggleStickyColumn(header)}
                    />
                    {header}
                  </label>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <tr
                key={race.Driver}
                id={`tr-${race.Driver}`}
                className="has-[:checked]:bg-blue-100"
              >
                {headers.map((header) => (
                  <td
                    data-id={`td-${header}`}
                    key={header}
                    className={`
                     border border-slate-300 p-2 
                    ${header === "Driver" ? "text-left" : "text-right"}
                    `}
                  >
                    {header === "Driver" && (
                      <>
                        <label htmlFor={`checkbox-${race.Driver}`}>
                          <input
                            type="checkbox"
                            id={`checkbox-${race.Driver}`}
                            onChange={() =>
                              toggleStickyRow(`tr-${race.Driver}`)
                            }
                          />{" "}
                          {race[header]}
                        </label>
                      </>
                    )}

                    {header !== "Driver" && <>{race[header]}</>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-[1000px] w-[4200px]"></div>
      </div>
    </>
  );
}

export default App;
