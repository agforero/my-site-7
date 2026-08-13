import { Box, Container } from "@mui/material";
import ResumeSection from "./components/ResumeSection";
import PageHeader from "@/components/PageHeader";

export default function ResumePage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 2,
          pb: 8,
          px: 1,
          overflowY: "auto",
        }}
      >
        <Box sx={{ ml: -1 }}>
          <PageHeader title="Resume" />
        </Box>
        <ResumeSection
          title="Education"
          items={[
            {
              title: "Cornell University",
              subtitle: "Masters of Engineering in Computer Science",
              date: "2021-2022",
            },
            {
              title: "St. Olaf College",
              subtitle: "Bachelor of Arts in Computer Science and History",
              date: "2017-2021",
            },
          ]}
        />
        <ResumeSection
          title="Software Experience"
          items={[
            {
              title: "SBG Funding",
              subtitle: "Software Engineer",
              date: "Feb 2026-Present",
            },
            {
              title: "ClearBlade",
              subtitle: "Software Engineer",
              date: "Jan 2025-Feb 2026",
            },
            {
              title: "Abstractive Health",
              subtitle: "Mid-Level Software Engineer",
              date: "Sep 2024-Jan 2025",
            },
            {
              title: "InterSystems",
              subtitle: "Release Engineer",
              date: "Jul 2022-Sep 2023",
            },
            {
              title: "UW-Madison",
              subtitle: "Research Assistant",
              date: "Dec 2020-Mar 2021",
            },
            {
              title: "Argonne National Laboratory",
              subtitle: "Research Aide",
              date: "May 2020-Aug 2020",
            },
          ]}
        />
        <ResumeSection
          title="Teaching Experience"
          items={[
            {
              title: "Inspirit AI",
              subtitle: "Tutor, Instructor and Program Manager",
              date: "Jun 2021-Present",
            },
          ]}
        />
        <ResumeSection
          title="Volunteering"
          items={[
            {
              title: "NYC Plover Project",
              date: "Jun 2026-Jul 2026",
            },
            {
              title: "Project Cicero",
              date: "Oct 2024-Nov 2024",
            },
            {
              title: "Roosevelt Island Senior Center",
              subtitle: "Tech Literacy Instructor",
              date: "Jan 2022-May 2022",
            },
          ]}
        />
      </Box>
    </Container>
  );
}
