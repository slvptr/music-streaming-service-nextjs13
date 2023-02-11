import styles from "./player-bar.module.scss";
import { Dispatch, SetStateAction } from "react";
import { ClassNameProps } from "../../../../utils/react-types";
import classNames from "classnames";

type PlayerBarProps = ClassNameProps & {
  curTime: number;
  duration: number;
  onTimeUpdate: Dispatch<SetStateAction<number | null | undefined>>;
};

export const PlayerBar = ({
  className,
  curTime,
  duration,
  onTimeUpdate,
}: PlayerBarProps) => {
  const curPercentage = (curTime / duration) * 100;

  const calcClickedTime = (e: MouseEvent) => {
    const clickPositionInPage = e.pageX;
    const bar = document.getElementById("progress-bar") as HTMLElement;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleTimeDrag = (e: any) => {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: any) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  };

  return (
    <div className={classNames(className, styles.bar)}>
      <div
        id="progress-bar"
        className={styles.progress}
        style={{
          background: `linear-gradient(to right, #00ADB5 ${curPercentage}%, white 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className={styles.knob}
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
    </div>
  );
};
