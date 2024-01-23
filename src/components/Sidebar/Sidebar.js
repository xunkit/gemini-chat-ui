"use client";

import React from "react";
import styles from "./Sidebar.module.css";
import { Box, Button, IconButton, Text } from "@radix-ui/themes";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import Settings from "@/components/Settings";

function Sidebar({
  api,
  setApi,
  isVisible,
  setIsVisible,
  temperature,
  setTemperature,
  isApiSet,
  setIsApiSet,
}) {
  return (
    <>
      <Box className={`relative ${isVisible ? "max-md:w-[100svw]" : ""}`}>
        <IconButton
          color="indigo"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className={styles.toggle}
        >
          {isVisible ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Box className={`${isVisible ? undefined : "hidden"}`}>
          <form
            className={styles.wrapper}
            onSubmit={(event) => {
              event.preventDefault();
              setIsApiSet(true);
            }}
          >
            <Text size="4">
              <label htmlFor="input">Enter your API key</label>
            </Text>
            <input
              className={styles.input}
              id="input"
              value={api}
              onChange={(event) => {
                setApi(event.target.value);
              }}
              disabled={isApiSet}
              required
            />
            <Button disabled={isApiSet} type="submit">
              Save
            </Button>
            <a
              href="https://makersuite.google.com/app/apikey"
              className="underline"
              target="_blank"
            >
              Get your API key here.
            </a>
            <Settings temperature={temperature} setTemperature={setTemperature}>
              <IconButton size="4" color="brown" className={styles.settings}>
                <GearIcon />
              </IconButton>
            </Settings>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
