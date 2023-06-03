import express, { Application } from "express";
import cors from "cors";

export function setConfigurations(app: Application): void {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  return console.info("[INFO]: All server configurations have been set.");
}
