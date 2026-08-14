"use client";

import { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import ResumeSection from "./components/ResumeSection";
import PageHeader from "@/components/PageHeader";
import ClippyGreeting from "@/components/Clippy/Greeting";
import { AGENTS, ClippyProvider, type AgentType } from "@react95/clippy";
import { Assistant, LinkedIn } from "@mui/icons-material";

const COOL_AGENT_NAMES: AgentType[] = [
  AGENTS.CLIPPY,
  AGENTS.BONZI,
  AGENTS.MERLIN,
  AGENTS.PEEDY,
  AGENTS.GENIE,
];

function nextAgent(current: AgentType): AgentType {
  const currentIndex = COOL_AGENT_NAMES.indexOf(current);
  const nextIndex = (currentIndex + 1) % COOL_AGENT_NAMES.length;
  return COOL_AGENT_NAMES[nextIndex] ?? AGENTS.CLIPPY;
}

export default function ResumePage() {
  const [agentName, setAgentName] = useState<AgentType>(AGENTS.CLIPPY);

  return (
    <ClippyProvider agentName={agentName}>
      <ClippyGreeting />
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
          <Box sx={{ display: "flex", gap: 1, color: "black" }}>
            <Button
              startIcon={<LinkedIn />}
              href="https://www.linkedin.com/in/afor/"
              target="_blank"
              variant="outlined"
              color="inherit"
            >
              LinkedIn
            </Button>
            <Button
              startIcon={<Assistant />}
              variant="outlined"
              color="inherit"
              onClick={() => setAgentName(nextAgent)}
            >
              Change assistant
            </Button>
          </Box>
          <ResumeSection
            title="Education"
            items={[
              {
                title: "Cornell University",
                subtitle: "Masters of Engineering in Computer Science",
                date: "2021-2022",
                description:
                  "I earned my Masters of Engineering from Cornell Tech, the technology-focused graduate campus of Cornell University in New York City.",
              },
              {
                title: "St. Olaf College",
                subtitle: "Bachelor of Arts in Computer Science and History",
                description:
                  "I earned my Bachelor of Arts from St. Olaf College in Northfield, Minnesota, where I was a double major in Computer Science and History. People sometimes ask me how the two intersect. Paradox, if you're reading this...",
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
                description:
                  "I am a Software Engineer at SBG Funding, a fintech company that helps small businesses find loan providers. My main product is the Virtual Sales Assistant, an AI assistant that speaks with potential borrowers on the phone to help them find the best loan options.",
              },
              {
                title: "ClearBlade",
                subtitle: "Software Engineer",
                date: "Jan 2025-Feb 2026",
                description:
                  "As a Software Engineer on the Apps Team at ClearBlade, I developed end-to-end application functionality using TypeScript across both the front- and back-end, working with React and Material UI on the UI side and services running on ClearBlade Intelligent Assets on the back-end. I was responsible for ensuring reliable communication between the user interface and edge/runtime components.",
              },
              {
                title: "Abstractive Health",
                subtitle: "Founding Mid-Level Software Engineer",
                date: "Sep 2024-Jan 2025",
                description:
                  "As a Founding Software Engineer at Abstractive Health, I played a key role in shaping both the technical direction and broader business strategy of the company as one of its first six employees. I contributed directly to foundational decisions that supported the company's early growth, including work that led to a pilot with NewYork-Presbyterian Hospital, one of the largest hospital systems in New York City. I built and maintained the core platform as one of two full-stack engineers, working across TypeScript, Python 3, and PostgreSQL to deliver production-grade front- and back-end systems. My work spanned everything from application architecture to day-to-day feature development, with a strong focus on reliability, scalability, and shipping quickly in a startup environment.",
              },
              {
                title: "InterSystems",
                subtitle: "Release Engineer",
                date: "Jul 2022-Sep 2023",
                description:
                  "As a Release Engineer at InterSystems, I developed front- and back-end tooling to streamline the rapid deployment of development environments across multiple internal teams, improving developer productivity and consistency. I also maintained FAST (Framework for Automation and Self-Service Testing), a company-wide unit testing framework that supported thousands of tests per day. Through this work, I helped ensure the stability and reliability of internal development workflows while enabling teams to move faster with greater confidence in their releases.",
              },
              {
                title: "UW-Madison",
                subtitle: "Research Assistant",
                date: "Dec 2020-Mar 2021",
                description:
                  "While studying at St. Olaf College, I worked as a Research Assistant at the University of Wisconsin-Madison under the direction of Dr. Mark Craven. Together, we developed software suites for analyzing the relationships between SARS-CoV-2 and potential binding sites on the human proteome, the goal of which was to identify potential drug targets for inhibiting the virus's ability to bind to human cells.",
              },
              {
                title: "Argonne National Laboratory",
                subtitle: "Research Aide",
                date: "May 2020-Aug 2020",
                description:
                  "While studying at St. Olaf College, I worked as a Research Aide at Argonne National Laboratory, where I built a testing framework for bleeding-edge FORTRAN compilers, which I titled the Fortran Testing Framework (FTFramework for short).",
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
                description:
                  "I've worked as a tutor, instructor, and program manager for Inspirit AI, a company that teaches middle- and high-schoolers the foundations of Python and machine learning. I've taught classes, helped students write research papers, and managed other Instructors.",
              },
            ]}
          />
          <ResumeSection
            title="Volunteering"
            items={[
              {
                title: "NYC Plover Project",
                date: "Jun 2026-Jul 2026",
                description:
                  "For the summer of 2026, I volunteered for the NYC Plover Project at Fort Tilden Beach. I sat outside their enclosures to ensure people didn't intrude on the fledglings, and worked at the booth near Jacob Riis Park to help educate beachgoers about local endangered bird species.",
              },
              {
                title: "Project Cicero",
                date: "Oct 2024-Nov 2024",
                description:
                  "I worked with Project Cicero, a non-profit operating in New York City that helps teachers get free books for their classrooms, by performing data analysis on their teachers and volunteers.",
              },
              {
                title: "Roosevelt Island Senior Center",
                subtitle: "Tech Literacy Instructor",
                date: "Jan 2022-May 2022",
                description:
                  "For eleven weeks, I taught Monday and Wednesday lectures at the Roosevelt Island Senior Center detailing how to use contemporary technologies, in combination with context on the history and development of the modern computer. This was an Independent Research (INFO 7900) project conducted for Cornell under the advisement of Dr. Tapan Parikh.",
              },
            ]}
          />
        </Box>
      </Container>
    </ClippyProvider>
  );
}
