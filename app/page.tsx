"use client";

import Image from "next/image";
import { Hero } from "./_landing/Hero";
import { NavBar } from "./_landing/NavBar";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Todo } from "./_landing/Todo";

export default function Home() {
  return (
    <main>
      <Hero />
      <NavBar />
      <Todo />
    </main>
  );
}
