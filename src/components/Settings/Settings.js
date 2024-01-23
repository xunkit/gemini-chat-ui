import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Settings.module.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import * as Slider from "@radix-ui/react-slider";

function Settings({ temperature, setTemperature, children }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className="text-slate-50 font-semibold text-lg mb-2">
            Settings
          </Dialog.Title>
          <Theme>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="token" className="text-sm">
                  Temperature (0 to 1): {temperature}
                </label>
                <Slider.Root
                  className={styles.SliderRoot}
                  defaultValue={[temperature]}
                  value={[temperature]}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => {
                    setTemperature(value);
                  }}
                >
                  <Slider.Track className={styles.SliderTrack}>
                    <Slider.Range className={styles.SliderRange} />
                  </Slider.Track>
                  <Slider.Thumb
                    className={styles.SliderThumb}
                    aria-label="Temperature"
                  />
                </Slider.Root>
              </div>
              <Button
                color="orange"
                variant="soft"
                onClick={() => {
                  setTemperature(0.9);
                }}
              >
                Reset to default
              </Button>
              <a
                href="https://ai.google.dev/docs/concepts#model_parameters"
                target="_blank"
                className="underline"
              >
                What do these settings do?
              </a>
            </div>
          </Theme>

          <Dialog.Close>
            <Cross2Icon className={styles.exitButton} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Settings;
