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
                  "I earned my Bachelor of Arts from St. Olaf College in Northfield, Minnesota, where I was a double major in Computer Science and History. People sometimes ask me how the two intersect. Paradox Interactive, if you're reading this...",
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
                  "I am currently a Software Engineer at SBG Funding, a fintech company that helps small businesses find loan providers. My main product is the Virtual Sales Assistant, an AI assistant that speaks with potential borrowers on the phone to help them find the best loan options.",
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
                description: "This is the description for Abstractive Health.",
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
                description:
                  "This is the description for Argonne National Laboratory.",
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
                description: "This is the description for Project Cicero.",
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
    </ClippyProvider>
  );
}
