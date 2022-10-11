import React from "react";
import s from "./Home.module.scss";
import Button from "@/components/Button/Button";
import CheckBox from "../Check/CheckBox";
import RadioButton from "../RadioButton/RadioButton";

const HomePage = () => {
  return (
    <main className="flex h-screen flex-col">
      <header>
        <h2 className="pt-16 text-center text-[40px] text-violet-400">
          UrFU Next JS Course
        </h2>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mt-4">
          <Button>Создать игру</Button>
        </div>
        <div className="mt-4">
          <Button disabled>Создать игру</Button>
        </div>
        <div className="mt-4">
          <CheckBox text="включить" />
          <CheckBox disabled text="disabled" />
          <CheckBox disabled checked text="disabled checked" />
        </div>
        <div className="mt-4">
          <form action="form">
            <RadioButton label="Radio button" value="Radio" />
            <RadioButton label="Radio button disabled" value="Radio" disabled />
          </form>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
