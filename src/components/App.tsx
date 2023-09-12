import React, { useEffect } from "react";
import AppClockSection from "./App-clock-section/AppClockSection";
import AppClockMoreSection from "./App-clock-more-section/AppClockMoreSection";
import { fetchQuote } from "../redux/app/operations";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchLocation, fetchTime } from "../redux/clock/operations";
import { isDaySwitcher, selectIsDay } from "../redux/app/appSlice";
import { timeOfTheDayFunc } from "../utils/timeOfTheDayFunc";
import { selectTime } from "../redux/clock/clockSlice";

function App() {
  const dispatch = useAppDispatch();
  const { time } = useAppSelector(selectTime);
  const isDay = useAppSelector(selectIsDay);

  useEffect(() => {
    dispatch(fetchLocation())
    dispatch(
      isDaySwitcher(
        timeOfTheDayFunc(new Date(time).getHours()) === "Good morning" ||
          timeOfTheDayFunc(new Date(time).getHours()) === "Good afternoon"
      )
    );
    setInterval(() => {
      dispatch(fetchTime());
    }, 1000);

    dispatch(fetchQuote());
  }, [dispatch]);
  return (
    <div className={isDay ? "app-background-day" : "app-background-night"}>
      <div className="container">
        <AppClockSection />
      </div>
      <AppClockMoreSection />
    </div>
  );
}

export default App;
