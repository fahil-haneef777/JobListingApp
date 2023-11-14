import { createContext, useState } from "react";

const JobContext = createContext();

const Provider = ({ children }) => {
  const [jobid, setjobid] = useState("");

  const valueToShare = {
    jobid,
    setjobid
  };

  return (
    <JobContext.Provider value={valueToShare}>{children}</JobContext.Provider>
  );
};

export { Provider };
export default JobContext;
