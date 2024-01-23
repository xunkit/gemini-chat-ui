"use client";

import React from "react";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@radix-ui/themes";

export default function Home() {
  const [api, setApi] = React.useState("");
  const [isApiSet, setIsApiSet] = React.useState(false);
  const [temperature, setTemperature] = React.useState(0.9);
  const [isSidebarOpened, setIsSidebarOpened] = React.useState(true);

  return (
    <Flex direction="row">
      <Sidebar
        api={api}
        setApi={setApi}
        isVisible={isSidebarOpened}
        setIsVisible={setIsSidebarOpened}
        temperature={temperature}
        setTemperature={setTemperature}
        isApiSet={isApiSet}
        setIsApiSet={setIsApiSet}
      />
      <Box className={`flex-1 ${isSidebarOpened ? "max-md:hidden" : ""}`}>
        <Chat api={api} temperature={temperature} isApiSet={isApiSet} />
      </Box>
    </Flex>
  );
}
