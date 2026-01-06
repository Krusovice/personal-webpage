import { useState } from "react";
import styling from "./../../styles/Homepage.module.css";
import layoutStyling from "./../../styles/LayoutStyling.module.css";

type AppSubjectProps = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export default function AppSubject(
  { title, subtitle, content }: AppSubjectProps
  ) {

  const [open, setOpen] = useState<boolean>(false);

  return(
    <div className={`${layoutStyling.subWindowDark}`}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={styling.subject}
      >
        <h3>{title}</h3>
        <h5>{subtitle}</h5>
      </div>
      
      <div className={`${styling.content} ${open ? styling.open : ""}`}>
        <h5>Stack</h5>
        {content}
      </div>
    </div>
  )
}