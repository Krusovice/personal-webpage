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
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>
      
      <div className={`${styling.content} ${open ? styling.open : ""}`}>
        <h3>Stack</h3>
        {content}
      </div>
    </div>
  )
}