import { Race, races } from "./assets/f1";
import { useState } from "react";
function App() {
  const headers = Object.keys(races[0]) as (keyof Race)[];
  const [pinnedHeader, setPinnedHeader] = useState<keyof Race | undefined>();
  const [pinnedRow, setPinnedRow] = useState<string | undefined>();

  return (
    <>
      <div>
        <table className="w-[3000px] border-collapse border border-slate-400">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`
                  border border-slate-300 
                  ${header === pinnedHeader && "sticky left-0 right-0 z-10 bg-blue-100 shadow-sm"}
                  `}
                >
                  <label htmlFor={header} className="p-3">
                    <input
                      type="checkbox"
                      className="mr-2"
                      id={header}
                      onChange={(e) => {
                        if (header !== pinnedHeader) {
                          document.getElementById(pinnedHeader || "")?.click();
                        }

                        if (e.target.checked) {
                          setPinnedHeader(header);
                          return;
                        }

                        setPinnedHeader(undefined);
                      }}
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
                className={race.Driver === pinnedRow ? "sticky top-0" : ""}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className={`
                    border border-slate-300 p-2 
                    ${header === "Driver" ? "text-left" : "text-right"}
                    ${header === pinnedHeader && "sticky left-0 right-0 z-20 bg-blue-100 shadow-sm"}
                    ${race.Driver === pinnedRow && "bg-blue-100 shadow-sm"}
                    `}
                  >
                    {header === "Driver" && (
                      <>
                        <input
                          type="checkbox"
                          id={race.Driver}
                          onChange={(e) => {
                            if (race.Driver !== pinnedRow) {
                              document.getElementById(pinnedRow || "")?.click();
                            }

                            if (e.target.checked) {
                              setPinnedRow(race.Driver);
                              return;
                            }

                            setPinnedRow(undefined);
                          }}
                        />{" "}
                      </>
                    )}
                    {race[header]}
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
